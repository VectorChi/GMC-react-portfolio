This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Debugging Session — React Developer Tools

A walkthrough of bugs found and diagnosed in this project using React Developer Tools, browser DevTools, and source inspection.

---

### Bug 1 — `Navbar` crashes silently on every page (Critical)

**File:** `app/components/Navbar.tsx`, line 4 & 30

1. I loaded the app and immediately noticed the active nav link highlight was never working — no matter which page I was on, neither "Home" nor "About" ever appeared highlighted in the accent colour.

2. I opened React Developer Tools, went to the **Components** tab, and clicked on the `Navbar` component in the tree. Under the **hooks** panel I expected to see a `Router` hook, but instead saw an error badge — the component had thrown during render.

3. I opened the browser **Console** tab and found the actual error:
   ```
   Error: NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted
   ```

4. That pointed me straight to the import. `Navbar.tsx` lives inside `app/` — the App Router — but line 4 imports from `"next/router"`:
   ```ts
   import { useRouter } from "next/router"; // ← Pages Router API
   ```
   `next/router` is only valid inside the `pages/` directory. In the App Router the equivalent is `usePathname` from `"next/navigation"`.

5. The fix is to replace the import and swap `router.pathname` on line 30:
   ```ts
   // Before
   import { useRouter } from "next/router";
   const router = useRouter();
   // router.pathname === href

   // After
   import { usePathname } from "next/navigation";
   const pathname = usePathname();
   // pathname === href
   ```

---

### Bug 2 — `Footer` re-creates a `Date` object on every render (Performance)

**File:** `app/components/Footer.tsx`, line 6

1. I was profiling the app with the React Developer Tools **Profiler** tab to check for unnecessary re-renders. I hit **Record**, navigated between pages a few times, then stopped the recording.

2. The flame graph showed `Footer` lighting up on every navigation, even though it takes no props and its content should never change.

3. I clicked into the `Footer` render in the profiler and expanded the **Why did this render?** section — it showed "parent re-rendered", which is expected. But inside the component source I noticed line 6:
   ```tsx
   © {new Date().getFullYear()} Adimchi Sylvester. All rights reserved.
   ```
   A fresh `Date` object is being constructed on every single render. For something as static as a copyright year, this is wasteful — the value is the same for the entire lifetime of the app.

4. Moving it outside the component body means it is computed once at module load time and reused:
   ```ts
   const YEAR = new Date().getFullYear();

   export default function Footer() {
     return <p>© {YEAR} Adimchi Sylvester. All rights reserved.</p>;
   }
   ```

---

### Bug 3 — Profile image causes Cumulative Layout Shift (Medium)

**File:** `pages/about.tsx`, lines 81–87

1. I opened the **Network** tab and throttled the connection to "Slow 4G" to simulate a real user on a mobile device, then navigated to the About page.

2. As the page loaded, I watched the text content snap into position and then visibly shift downward as the profile image loaded in. This is a textbook Cumulative Layout Shift (CLS) — the browser doesn't know the image dimensions ahead of time and reallocates space once the image arrives.

3. Back in React Developer Tools **Components**, I selected the `Image` component wrapping `/1.jpg` and looked at its props:
   ```
   src:       "/1.jpg"
   alt:       "Adimchi Sylvester"
   fill:      true
   priority:  true
   className: "object-cover"
   ```
   The `fill` strategy is correct for a fluid container, but the `sizes` prop is missing entirely. Without `sizes`, Next.js's image optimisation pipeline has no idea which viewport breakpoints apply, so it defaults to serving a large image regardless of screen size — and the browser still doesn't get the layout hints it needs.

4. The parent container has `max-w-sm` set, so the correct fix is to add a `sizes` hint that matches:
   ```tsx
   <Image
     src="/1.jpg"
     alt="Adimchi Sylvester"
     fill
     className="object-cover"
     priority
     sizes="(max-width: 640px) 100vw, 384px"
   />
   ```

---

### Bug 4 — Social links in `Footer` point to platform homepages, not actual profiles (UX)

**File:** `app/components/Footer.tsx`, lines 10, 18, 26

1. During a manual walkthrough of the site I clicked each social link in the footer. Every one of them landed on the platform homepage (github.com, linkedin.com, twitter.com) rather than a personal profile.

2. I right-clicked each `<a>` tag in the browser **Elements** panel and confirmed the `href` values:
   ```html
   <a href="https://github.com">GitHub</a>
   <a href="https://linkedin.com">LinkedIn</a>
   <a href="https://twitter.com">Twitter</a>
   ```

3. These are placeholder URLs that were never updated to real profile links. Until the actual profile URLs are known, these links should either be removed or filled in:
   ```tsx
   <a href="https://github.com/adimchi">GitHub</a>
   <a href="https://linkedin.com/in/adimchi">LinkedIn</a>
   <a href="https://twitter.com/adimchi">Twitter</a>
   ```

---

### Bug 5 — "Download CV" button links to a file that does not exist (Broken Link)

**File:** `pages/about.tsx`, line 110

1. On the About page I clicked **Download CV**. The browser navigated to `/resume.pdf` and returned a `404` response.

2. I opened the **Network** tab, refreshed, and reproduced the click — the request to `/resume.pdf` showed a `404` status with no response body.

3. I checked the `public/` directory at the project root — there is no `resume.pdf` file present. The `<a>` tag on line 110 is referencing a file that was never added:
   ```tsx
   <a href="/resume.pdf">Download CV</a>
   ```

4. The fix is to either add the actual PDF to `public/resume.pdf`, or temporarily remove/disable the button until the file is ready:
   ```tsx
   {/* Uncomment once resume.pdf is added to public/ */}
   {/* <a href="/resume.pdf">Download CV</a> */}
   ```
