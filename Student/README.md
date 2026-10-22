# Student Directory — Next.js App Router

A browsable directory of college students. List all students, filter them by
name / roll number / department / year, and open an individual student profile
with academic record, enrolled courses, contact details and achievements.

Built with the **Next.js 16 App Router**, **TypeScript** and **Tailwind CSS v4**.
All data is local dummy data — no database, no external services.

---

## Table of contents

1. [What it does](#1-what-it-does)
2. [Tech stack](#2-tech-stack)
3. [Getting started](#3-getting-started)
4. [Route map and rendering strategy](#4-route-map-and-rendering-strategy)
5. [Folder structure](#5-folder-structure)
6. [Code walkthrough — file by file](#6-code-walkthrough--file-by-file)
   - [6.1 `app/layout.tsx` — root layout](#61-applayouttsx--root-layout)
   - [6.2 `app/globals.css` — global styles](#62-appglobalscss--global-styles)
   - [6.3 `app/page.tsx` — home page](#63-apppagetsx--home-page)
   - [6.4 `app/students/page.tsx` — the directory](#64-appstudentspagetsx--the-directory)
   - [6.5 `app/students/[id]/page.tsx` — student profile](#65-appstudentsidpagetsx--student-profile)
   - [6.6 Loading, error and not-found boundaries](#66-loading-error-and-not-found-boundaries)
   - [6.7 `app/api/students/route.ts` — list API](#67-appapistudentsroutets--list-api)
   - [6.8 `app/api/students/[id]/route.ts` — single record API](#68-appapistudentsidroutets--single-record-api)
   - [6.9 `lib/types.ts` — the data model](#69-libtypests--the-data-model)
   - [6.10 `lib/students.ts` — data + query helpers](#610-libstudentsts--data--query-helpers)
   - [6.11 `lib/utils.ts` — small helpers](#611-libutilsts--small-helpers)
   - [6.12 `components/` — reusable UI](#612-components--reusable-ui)
7. [Data flow](#7-data-flow)
8. [API reference](#8-api-reference)
9. [Design decisions and trade-offs](#9-design-decisions-and-trade-offs)
10. [Testing checklist](#10-testing-checklist)
11. [What this project demonstrates](#11-what-this-project-demonstrates)
12. [Possible extensions](#12-possible-extensions)

---

## 1. What it does

| Screen | Route | What you get |
| --- | --- | --- |
| Home | `/` | Hero, live directory stats, department shortcuts, recently added students |
| Directory | `/students` | Searchable + filterable grid of every student card |
| Filtered directory | `/students?department=Electronics` | Same page, pre-filtered from a deep link |
| Student profile | `/students/[id]` | Full record for one student |
| Missing student | `/students/does-not-exist` | 404 status + "Student not found" screen |
| Unknown page | `/anything-else` | Global 404 screen |
| JSON list | `/api/students` | Read-only backend, supports filtering |
| JSON record | `/api/students/[id]` | Read-only backend, one student |

The dataset: **12 students**, **4 departments**, **45 course records**,
average GPA **8.46**.

---

## 2. Tech stack

| Package | Version | Why |
| --- | --- | --- |
| `next` | 16.4.2 | App Router, route handlers, streaming, SSG |
| `react` / `react-dom` | 19.3.0 | Server + client components |
| `typescript` | 5.x | Types for the data model and every component prop |
| `tailwindcss` | 4.x | Utility styling (v4 — configured via `@import "tailwindcss"`) |
| `@tailwindcss/turbopack` | 4.x | Tailwind integration for the Turbopack bundler |
| `eslint` + `eslint-config-next` | 9.x / 16.4.2 | Linting (includes `next/core-web-vitals`) |

No UI kit, no icon package, no `clsx`/`tailwind-merge`. Everything is hand
written so the code is small enough to explain line by line.

---

## 3. Getting started

```bash
npm install     # install dependencies
npm run dev     # start dev server on http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npx tsc --noEmit  # type check
```

The app has **no environment variables** and **no database**. Delete
`lib/students.ts` and swap in a real data source and nothing else changes.

---

## 4. Route map and rendering strategy

```
app/
├── layout.tsx                    ○  static   root layout (header + footer)
├── page.tsx                      ○  static   home
├── loading.tsx                   ○  static   root-level Suspense fallback
├── error.tsx                     ○  static   root error boundary (client)
├── not-found.tsx                 ○  static   global 404
├── students/
│   ├── page.tsx                  ○  static   directory (client filters inside Suspense)
│   ├── loading.tsx               ○  static   skeleton for the directory
│   └── [id]/
│       ├── page.tsx              ●  SSG      one page per student
│       ├── loading.tsx           ○  static   skeleton for the profile
│       ├── not-found.tsx         ○  static   "Student not found" screen
│       └── error.tsx             ○  static   scoped error boundary (client)
└── api/
    ├── students/
    │   └── route.ts              ƒ  dynamic GET /api/students
    └── students/
        └── [id]/route.ts         ƒ  dynamic GET /api/students/[id]
```

Legend: `○` static (prerendered at build time) · `●` SSG (prerendered per
`generateStaticParams`) · `ƒ` dynamic (rendered per request).

### Why each route renders the way it does

**`/` and `/students` are static.** The data is a compile-time constant, so
Next prerenders the HTML at build time. The directory's search / filter UI is
the only interactive part, so it is a Client Component isolated behind a
`<Suspense>` boundary — the static shell (heading + toolbar) still ships as
prerendered HTML.

**`/students/[id]` is SSG.** `generateStaticParams()` returns the id of every
student, so Next prerenders 12 static pages at build time:

```
● /students/aarav-sharma
● /students/diya-patel
● /students/rohan-verma
● [+9 more paths]
```

Any id that is *not* in that list is rendered on demand, hits
`notFound()` in the page, and returns a real **HTTP 404** with the
`app/students/[id]/not-found.tsx` screen.

**`/api/*` are dynamic.** Route handlers that read `request.nextUrl` are
dynamic by definition — they must run per request to read the query string.

### Route conventions used

| Convention | Where | Why |
| --- | --- | --- |
| Static segment | `/`, `/students` | Stable, no parameters |
| Dynamic segment `[id]` | `/students/[id]` | One page per student, id is a slug (`aarav-sharma`) |
| `loading.tsx` | root, `/students`, `/students/[id]` | Skeleton UI while a segment streams in |
| `error.tsx` | root, `/students/[id]` | Catches render errors of that segment and below |
| `not-found.tsx` | root, `/students/[id]` | `notFound()` output and unmatched URLs |
| `route.ts` | `/api/students`, `/api/students/[id]` | The optional simple backend |

### Route groups — deliberately not used

Route groups (`(marketing)`, `(dashboard)`) exist to share a layout between
routes *without* affecting the URL. This project has exactly one layout
(the root layout), so a group would add a folder level and buy nothing. It is
mentioned here because it is the first tool to reach for when the app grows —
e.g. `app/(public)/students/...` and `app/(admin)/...` sharing
`app/(admin)/layout.tsx` with a sidebar while keeping clean URLs.

---

## 5. Folder structure

```
.
├── app/                     # App Router: routes only, one folder = one URL
│   ├── api/                 # Route handlers (the "backend")
│   ├── students/
│   │   └── [id]/
│   └── ...layout/page/loading/error/not-found
├── components/              # Reusable React components (no data access)
├── lib/                     # Types, dummy data, query helpers, utilities
├── public/                  # Static assets served at /
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript config, `@/*` -> project root alias
└── eslint.config.mjs        # ESLint flat config
```

**Rule followed throughout:** `app/` decides *what* is rendered and *where*,
`components/` decides *how* it looks, `lib/` decides *what data* is shown.
No component reaches into another component's markup, and no page hard-codes
student data.

---

## 6. Code walkthrough — file by file

### 6.1 `app/layout.tsx` — root layout

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Student Directory", template: "%s | Student Directory" },
  description: "Browse students by department and year, and view each student's profile, courses and academic record.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

Line by line:

* **Fonts.** `next/font/google` downloads Geist at build time and self-hosts
  it. The `variable` option exposes the font as a CSS variable
  (`--font-geist-sans`) instead of a class name, which is what Tailwind v4's
  `--font-sans` theme key consumes. No runtime request to Google, no
  layout shift.
* **`LayoutProps<"/">`** is a type Next.js generates for every route. It
  guarantees `children` is typed as `React.ReactNode`.
* **`title: { default, template }`** — `default` is used on `/`; `template`
  wraps every other route's title, so `/students/diya-patel` becomes
  `"Diya Patel | Student Directory"` automatically.
* **`h-full` on `<html>`** and **`flex min-h-full flex-col` on `<body>`** —
  the classic "sticky footer" trick. `min-h-full` makes the body at least as
  tall as the viewport, `flex-col` stacks header / main / footer vertically,
  and `flex-1` on `<main>` pushes the footer to the bottom even when the
  page content is short.
* **`antialiased`** — turns on sub-pixel font smoothing.

The root layout is a **Server Component** (no `"use client"`), so the header
and footer are rendered on the server and shipped as HTML.

---

### 6.2 `app/globals.css` — global styles

```css
@import "tailwindcss";

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), system-ui, -apple-system, "Segoe UI", sans-serif;
}
```

* **`@import "tailwindcss"`** is Tailwind v4's single entry point — it
  replaces the old `@tailwind base/components/utilities` triple.
* **`:root` variables** define the two brand colours as plain CSS custom
  properties, so they can be swapped in one place.
* **`@theme inline`** registers those variables as *Tailwind theme tokens*.
  `inline` means the generated utility uses the variable's value directly
  instead of copying it, which is what makes the `next/font` variables work.
  As a result `bg-background`, `text-foreground`, `font-sans` and `font-mono`
  are all available as utilities.
* The `prefers-color-scheme: dark` block from the starter template was
  **removed deliberately**: this project ships a single, carefully tuned
  light design, and an automatic dark flip would half-break it.

---

### 6.3 `app/page.tsx` — home page

A **Server Component** (no directive needed). It reads the data module
directly on the server and renders static HTML.

```tsx
export default function HomePage() {
  const students = getAllStudents();
  const stats = getDirectoryStats();
  const departments = getDepartments();
  const featured = students.slice(0, 4);
  ...
}
```

Four sections:

1. **Hero** — eyebrow chip, `<h1>`, paragraph, two calls to action
   (`/students` and `/api/students`).
2. **Stats** — four `<StatCard />`s fed by `getDirectoryStats()`. The numbers
   are *computed from the data*, never hard-coded, so adding a student
   updates them automatically.
3. **Browse by department** — one link per department, each pointing at
   `/students?department=<encoded>`. The value is passed through
   `encodeURIComponent()` because department names contain spaces
   (`Computer Science` → `Computer%20Science`). The directory page reads
   that query parameter and pre-selects the filter, so the deep link is
   meaningful rather than decorative.
4. **Recently added students** — the first four students as compact cards
   linking to their profile.

Everything here is computed at build time, so the whole home page is static
HTML.

---

### 6.4 `app/students/page.tsx` — the directory

```tsx
export default function StudentsPage() {
  const students = getAllStudents();
  const departments = getDepartments();
  const years = getSortedYears();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      ...
      <Suspense fallback={<GridSkeleton />}>
        <StudentDirectory
          students={students}
          availableDepartments={departments}
          availableYears={years}
        />
      </Suspense>
    </div>
  );
}
```

* The page itself is a Server Component: it serialises the student array
  (plain JSON — no `Date` objects, no functions, so it is RSC-serialisable)
  and hands it to the Client Component as props.
* **Why the `<Suspense>`?** `StudentDirectory` calls `useSearchParams()` to
  read `?department=` / `?q=` / `?year=`. During static prerendering React
  cannot know those values, so the client subtree is treated as a dynamic
  hole. The `<Suspense>` boundary gives it a fallback (`<GridSkeleton />`)
  and keeps the rest of the page static. Without the boundary Next throws a
  build error telling you to add one.
* `getSortedYears()` returns only the years that actually exist in the data
  (1, 2, 3, 4) instead of a hard-coded list, so the dropdown can never offer
  an empty year.

---

### 6.5 `app/students/[id]/page.tsx` — student profile

The core dynamic route. Key parts:

**Dynamic parameter (Next 15+ style — `params` is a Promise):**

```tsx
interface StudentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = await params;
  const student = getStudentById(id);

  if (!student) {
    notFound();          // throws → renders app/students/[id]/not-found.tsx, HTTP 404
  }
  ...
}
```

`notFound()` throws a special control-flow error that Next catches. It stops
the render, renders the nearest `not-found.tsx`, and returns a **404 status
code**. It is *not* an `if/else` — the code after it never runs, which is why
TypeScript is happy to use `student` without a null check afterwards.

**Static generation:**

```tsx
export function generateStaticParams() {
  return getAllStudents().map((student) => ({ id: student.id }));
}
```

Next calls this at build time and prerenders one page per returned id. The
ids are slugs (`aarav-sharma`) so the URLs stay readable and the id can be
matched directly against the data.

**Per-student metadata:**

```tsx
export async function generateMetadata({ params }: StudentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const student = getStudentById(id);
  if (!student) return { title: "Student not found" };
  return {
    title: student.name,
    description: `${student.name} — ${student.program}, ${student.department}. Roll number ${student.studentId}.`,
  };
}
```

`generateMetadata` runs on the server for every request and produces the
document title and meta description. It has its own fallback, so an unknown
id still produces a sensible title instead of `undefined`.

**Page layout:**

* `<Breadcrumb />` — `Home / Students / Aarav Sharma`, with the last crumb
  marked `aria-current="page"`.
* A "← Back to all students" link.
* **Profile header card** — avatar, name, status badge, roll number, program,
  department / year / section, and two actions: `mailto:` and `tel:` links.
* **Academic summary** — four `<StatCard />`s (GPA, credits, course count,
  enrolment date). Credits are *summed from the course list* rather than
  stored, so the two can never disagree.
* **Two-column body** (`lg:grid-cols-3`):
  * left (2/3): About + skills + achievements, then the `<CourseTable />`.
  * right (1/3): Contact details, Guardian, Address as an `<address>` element.
* **The `min-w-0` fix.** The grid children carry `min-w-0`. By default a grid
  item has `min-width: auto`, which means it refuses to shrink below its
  content — and the course table has a `min-w-[34rem]` so it can scroll
  horizontally on small screens. Without `min-w-0` the *whole page* overflows
  sideways by ~186px on a 390px phone. With it, the table scrolls inside its
  own `overflow-x-auto` wrapper and the page stays put.

---

### 6.6 Loading, error and not-found boundaries

These are Next.js *special files*. Their names are reserved — you cannot put
them in a folder and expect them to be treated as normal routes.

**`app/loading.tsx`** — the root fallback. Next wraps the page in an implicit
`<Suspense>` and shows this while the page streams in. Renders a shimmering
placeholder block.

**`app/students/loading.tsx`** — shown while `/students` loads. A heading
skeleton, a toolbar skeleton and a 6-card skeleton grid.

**`app/students/[id]/loading.tsx`** — shown while a profile loads. A
`<DetailSkeleton />` shaped like the real page: avatar block, title blocks,
two panel blocks.

All three reuse the components in `components/skeletons.tsx`
(`CardSkeleton`, `GridSkeleton`, `DetailSkeleton`) so the loading UI is
built from the same primitives as the real UI and stays consistent.

**`app/error.tsx`** and **`app/students/[id]/error.tsx`** — error boundaries.
They **must** be Client Components (`"use client"`) because they hold state
and event handlers. Each receives `{ error, reset }`:

```tsx
"use client";
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => { console.error(error); }, [error]);
  return ( ... <button onClick={reset}>Try again</button> ... );
}
```

* `error` — the thrown error. `error.digest` is a server-side id that is safe
  to show to the user (the real message is not leaked to the client).
* `reset` — re-renders the segment without a full page reload.
* The root `error.tsx` catches failures anywhere below the root layout; the
  scoped one only catches failures in `/students/[id]` and below, and offers a
  "Back to directory" escape instead of a generic "go home".

**`app/not-found.tsx`** — the global 404 for any URL that matches no route.

**`app/students/[id]/not-found.tsx`** — the 404 for a student id that does not
exist, reachable from `notFound()` inside the profile page.

> An error boundary catches *rendering* errors. It does **not** catch errors
> in the layout above it, and it does not catch errors thrown in the root
> layout itself — that is why there are two levels.

---

### 6.7 `app/api/students/route.ts` — list API

The optional "simple backend", implemented as a Next.js Route Handler
(no Express, no separate server, no database).

```tsx
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q") ?? "";
  const department = searchParams.get("department") ?? "all";
  const year = searchParams.get("year") ?? "all";
  ...
  const students = filterStudents({ query, department, year });
  return NextResponse.json({ count, total, stats, filters, students });
}
```

* `request.nextUrl.searchParams` is the parsed query string.
* Filters are validated against the `DEPARTMENTS` and `STUDY_YEARS` constants
  from `lib/types.ts`; an unknown value returns **400** with a message naming
  the bad field, rather than silently returning an empty list.
* The response wraps the results in an envelope (`count`, `total`, `stats`,
  `filters`, `students`) so a client can render a header without a second
  request.

The pages do **not** call this endpoint over HTTP — they import the same
`lib/students.ts` functions directly. Going over the network for data the
server already has would add latency for no benefit. The API exists for
external consumers (a mobile app, a script, or a future client-side search).

---

### 6.8 `app/api/students/[id]/route.ts` — single record API

```tsx
export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const student = getStudentById(id);

  if (!student) {
    return NextResponse.json({ error: "Student not found", id }, { status: 404 });
  }

  return NextResponse.json(student);
}
```

The dynamic parameter is a `Promise` here too, so it must be awaited. A
missing record returns a JSON **404** rather than HTML, which is the correct
behaviour for an API.

---

### 6.9 `lib/types.ts` — the data model

Every shape the app uses, defined once.

```ts
export const DEPARTMENTS = ["Computer Science", "Electronics", "Mechanical", "Management"] as const;
export type Department = (typeof DEPARTMENTS)[number];

export const STUDY_YEARS = [1, 2, 3, 4] as const;
export type StudyYear = (typeof STUDY_YEARS)[number];

export const STUDENT_STATUSES = ["active", "on_leave", "graduated"] as const;
export type StudentStatus = (typeof STUDENT_STATUSES)[number];
```

`as const` makes the array **readonly and literal-typed**, so
`(typeof DEPARTMENTS)[number]` is the union
`"Computer Science" | "Electronics" | "Mechanical" | "Management"`.
The array and the type are derived from each other, so adding a department
updates both at once and TypeScript catches every place that needs handling.

The interfaces:

| Interface | Purpose |
| --- | --- |
| `Course` | One enrolment: code, title, credits, grade, gradePoint, semester |
| `StudentAddress` | line1, city, state, country, pincode |
| `Guardian` | name, relation, phone |
| `Student` | The main record (see below) |
| `DirectoryFilters` | `{ query?, department?, year? }` — the filter contract |
| `DirectoryStats` | `{ totalStudents, totalDepartments, totalCourses, averageGpa }` |

```ts
export interface Student {
  id: string;            // URL slug used by /students/[id]
  studentId: string;     // college roll number, e.g. "STU-2023-014"
  name: string;
  email: string;
  phone: string;
  department: Department;
  program: string;
  year: StudyYear;
  section: string;
  status: StudentStatus;
  gpa: number;           // on a 10 point scale
  dateOfBirth: string;   // ISO "YYYY-MM-DD"
  enrolledAt: string;    // ISO "YYYY-MM-DD"
  address: StudentAddress;
  guardian: Guardian;
  bio: string;
  skills: string[];
  courses: Course[];
  achievements: string[];
}
```

Two id fields on purpose: `id` is the **URL slug** (`aarav-sharma`), while
`studentId` is the **college roll number** (`STU-2023-014`). The URL stays
readable, and the roll number is still searchable from the directory.

---

### 6.10 `lib/students.ts` — data + query helpers

The single source of truth. It exports the raw array plus small, pure
functions. Pages and components never touch `students` directly; they call
these helpers, so filtering logic exists in one place.

| Function | Returns | Used by |
| --- | --- | --- |
| `getAllStudents()` | `Student[]` | home page, directory page, `generateStaticParams` |
| `getStudentById(id)` | `Student \| undefined` | profile page, metadata, API |
| `getDepartments()` | `Department[]` | home page, directory filters |
| `getStudentsByDepartment(d)` | `Student[]` | home page department counts |
| `filterStudents(filters)` | `Student[]` | directory (via client filter), API |
| `getDirectoryStats()` | `DirectoryStats` | home page stats, API envelope |
| `getSortedYears()` | `StudyYear[]` | directory year filter |

`filterStudents` is the interesting one:

```ts
export function filterStudents({ query = "", department = "all", year = "all" }: DirectoryFilters = {}): Student[] {
  const normalizedQuery = query.trim().toLowerCase();

  return students.filter((student) => {
    const matchesDepartment = department === "all" || student.department === department;
    const matchesYear = year === "all" || student.year === year;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      student.name.toLowerCase().includes(normalizedQuery) ||
      student.studentId.toLowerCase().includes(normalizedQuery) ||
      student.email.toLowerCase().includes(normalizedQuery) ||
      student.program.toLowerCase().includes(normalizedQuery) ||
      student.skills.some((skill) => skill.toLowerCase().includes(normalizedQuery));

    return matchesDepartment && matchesYear && matchesQuery;
  });
}
```

* The default parameter `= {}` means it can be called with no arguments.
* `trim()` + `toLowerCase()` normalise the query once, outside the filter
  callback, instead of per row.
* The search is a deliberate OR across several fields — one text box that
  matches name, roll number, email, programme or a skill.
* All three conditions must hold, so filters compose.

`getDirectoryStats` computes the totals from the data rather than storing
them, so the home page can never show a stale number:

```ts
const totalCourses = students.reduce((total, s) => total + s.courses.length, 0);
const averageGpa = students.reduce((total, s) => total + s.gpa, 0) / students.length;
```

---

### 6.11 `lib/utils.ts` — small helpers

* **`cn(...classes)`** — joins truthy class names. A 3-line stand-in for
  `clsx`, enough for this project and one less dependency.
* **`getInitials(name)`** — `"Aarav Sharma"` → `"AS"`. The directory has no
  photos, so avatars are initials.
* **`getAvatarColor(seed)`** — hashes the name and picks one of eight
  Tailwind colour pairs. The same student always gets the same colour, on
  the server and on the client, so there is no hydration mismatch.
* **`formatDate(iso)`** — `new Intl.DateTimeFormat("en-IN", …)` →
  `"14 Mar 2024"`. An invalid date returns the input unchanged instead of
  rendering `"Invalid Date"`.
* **`formatGpa(gpa)`** — `gpa.toFixed(2)` → `"8.94"`.

---

### 6.12 `components/` — reusable UI

Components are dumb, typed, and know nothing about where data comes from.

| Component | Type | Purpose |
| --- | --- | --- |
| `site-header.tsx` | **Client** | Logo + nav with an active-page highlight |
| `site-footer.tsx` | Server | Footer with the same three links |
| `student-avatar.tsx` | Server | Initials avatar in 4 sizes (`sm`/`md`/`lg`/`xl`) |
| `status-badge.tsx` | Server | Coloured pill for active / on leave / graduated |
| `student-card.tsx` | Server | The card used in the directory grid |
| `student-directory.tsx` | **Client** | Search box, department/year selects, result grid, empty state |
| `course-table.tsx` | Server | The enrolled-courses table with credits and grades |
| `stat-card.tsx` | Server | Label / value / hint tile used on home + profile |
| `breadcrumb.tsx` | Server | `Home / Students / Name` trail |
| `empty-state.tsx` | Server | Dashed-border "nothing here" panel |
| `skeletons.tsx` | Server | `CardSkeleton`, `GridSkeleton`, `DetailSkeleton` |

**`site-header.tsx`** is a Client Component because it uses `usePathname()` to
highlight the current page:

```tsx
const isActive =
  item.href === "/"
    ? pathname === "/"
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
```

The `/` case needs the exact match (`pathname === "/"`), otherwise the home
link would stay highlighted on every route. The `aria-current="page"`
attribute carries the same information to screen readers.

**`student-directory.tsx`** is the only stateful component in the app:

```tsx
const searchParams = useSearchParams();
const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
const [department, setDepartment] = useState(() => searchParams.get("department") ?? "all");
const [year, setYear] = useState(() => searchParams.get("year") ?? "all");

const filtered = useMemo(() => { /* filter the students array */ }, [students, query, department, year]);
```

* The `useState` **initialiser** reads the query string, so
  `/students?department=Electronics` arrives with the filter already applied.
* `useMemo` re-filters only when the inputs actually change — typing in the
  search box does not re-render the 12 cards if the result set is unchanged.
* `resetFilters()` clears all three fields and calls
  `router.replace(pathname, { scroll: false })` to drop the query string from
  the URL without adding a history entry or scrolling the page.
* The component renders `<EmptyState />` when `filtered.length === 0` — a
  real empty state, not a blank grid.
* `hasActiveFilters` decides whether the "Clear filters" button is shown at
  all.

`StudentCard` is rendered from inside this client component, which means it
is pulled into the client bundle as well. That is deliberate: the card is
presentational, contains no server-only API, and re-rendering 12 small cards
instantly is imperceptible.

**`course-table.tsx`** wraps the table in `overflow-x-auto` and gives the
`<table>` a `min-w-[34rem]`, so on a phone the table scrolls sideways inside
its card while the page itself stays still.

**`skeletons.tsx`** uses Tailwind's `animate-pulse` to make grey blocks fade
in and out. It is the visual language of the loading states.

---

## 7. Data flow

```
        ┌──────────────────────────────────────────────┐
        │  lib/students.ts  (dummy data + helpers)    │
        └───────────────┬──────────────────────────────┘
                        │  import (server side, no HTTP)
        ┌───────────────▼──────────────────────────────┐
        │  app/…/page.tsx   (Server Components)        │
        │  computes what the page needs                │
        └───────────────┬──────────────────────────────┘
                        │  props (RSC payload)
        ┌───────────────▼──────────────────────────────┐
        │  components/*.tsx                            │
        │  server components → HTML                    │
        │  client component  → interactive UI          │
        └──────────────────────────────────────────────┘
```

Two independent paths reach the same data:

```
        lib/students.ts ──► app/api/students/route.ts   (JSON for external clients)
                     └──► app/api/students/[id]/route.ts
```

---

## 8. API reference

### `GET /api/students`

| Query param | Type | Default | Notes |
| --- | --- | --- | --- |
| `q` | string | `""` | Matches name, roll number, email, programme or skill |
| `department` | string | `"all"` | Must be one of the four departments, else `400` |
| `year` | `1`–`4` | `"all"` | Must be a valid year, else `400` |

```bash
curl "http://localhost:3000/api/students?department=Electronics&year=2"
```

```jsonc
{
  "count": 2,
  "total": 12,
  "stats": { "totalStudents": 12, "totalDepartments": 4, "totalCourses": 45, "averageGpa": 8.46 },
  "filters": { "q": "", "department": "Electronics", "year": "2" },
  "students": [ /* … */ ]
}
```

### `GET /api/students/[id]`

| Status | Body |
| --- | --- |
| `200` | The student object |
| `404` | `{ "error": "Student not found", "id": "…" }` |

---

## 9. Design decisions and trade-offs

**Local data instead of a database.** The brief asked for dummy data, so the
data lives in a typed module. The upside is that every route is a pure
function of the data and the app builds to static HTML. The trade-off is that
the API route handlers and the pages share the same in-process module — in a
real deployment those would be two different servers hitting one database.

**`next.config.ts`: `cacheComponents` turned off.** The Next 16 starter
template enables `cacheComponents` (formerly `dynamicIO`) and
`partialPrefetching`. `partialPrefetching` *requires* `cacheComponents`, so
the two were removed together.

The reason is the 404 status code. With `cacheComponents`, a dynamic route is
prerendered as a *partial* (◐) — the static shell is flushed to the browser
with a **200** before the dynamic part resolves. `notFound()` then rendered
the correct "Student not found" screen, but the HTTP status had already been
sent as `200`. With `cacheComponents` off, the known ids are fully prerendered
(● SSG) and an unknown id is rendered on demand, so `notFound()` produces a
genuine **HTTP 404** *and* the segment-specific `not-found.tsx` screen.

Verified:

```
404  /students/does-not-exist
404  /students/123
404  /nope
404  /api/students/does-not-exist
```

**Filtering is client-side, not URL-driven.** With 12 records, filtering in
React state is instant and needs no round trip. The URL query string is
still honoured on load, so deep links work and are shareable. If the dataset
grew past a few hundred records, filtering would move to the server and the
`searchParams` would be read in a server component instead.

**No client data-fetching library.** No React Query, no SWR, no `fetch` in a
`useEffect`. The data is static and already in the server bundle, so the
"client" never needs to fetch anything. A loading spinner would be theatre.

**No UI library.** Every class is Tailwind. This keeps the bundle small and
makes the code readable without a design-system abstraction to learn.

**Search is an OR across fields.** One text box matching name, roll number,
email, programme and skills is more useful than four separate dropdowns.

**No images.** Avatars are generated initials with a deterministic colour, so
the project has zero binary assets and no broken-image states.

---

## 10. Testing checklist

Everything below was verified against the production build (`npm run build && npm run start`).

**Routes return the right status**

```
200  /                              404  /students/does-not-exist
200  /students                      404  /students/123
200  /students/aarav-sharma         404  /nope
200  /api/students                  404  /api/students/does-not-exist
200  /api/students/aarav-sharma
```

**All 12 profiles render** — `aarav-sharma`, `diya-patel`, `rohan-verma`,
`ananya-iyer`, `vivaan-mehta`, `ishita-nair`, `kabir-singh`,
`meera-krishnan`, `arjun-reddy`, `sneha-joshi`, `rahul-joshi`,
`priya-nandakumar` — each with the correct name, roll number, GPA, course
count and a populated course table.

**Navigation** — every header, footer, home-page, card and breadcrumb link
resolves; the header highlights the active section.

**Directory behaviour** — "Showing 12 of 12 students" initially; typing
`diya` → 1 result; typing `zzzznotfound` → the "No students found" empty
state with a "Clear filters" button; the department select is pre-populated
from `?department=Computer%20Science` and narrows to 3 students.

**Layout** — no horizontal page overflow at 390px (iPhone) or 1280px
(desktop); the course table scrolls inside its own container.

**Console** — no errors or warnings on any page.

**Quality gates** — `npm run lint` clean, `npx tsc --noEmit` clean,
`npm run build` clean.

---

## 11. What this project demonstrates

* Static, dynamic, and static-with-`generateStaticParams` rendering in one app
* The difference between `notFound()` and a 404 status code
* `loading.tsx`, `error.tsx` and `not-found.tsx` at two levels of nesting
* Server vs Client Components, and what that means for the bundle
* `<Suspense>` as a required boundary around `useSearchParams()`
* Async `params` in both pages and route handlers
* Route Handlers as a backend without a server
* A typed data layer with pure query helpers
* The `generateStaticParams` / `dynamicParams` interaction
* Metadata: static `metadata`, dynamic `generateMetadata`
* Responsive layout and an empty state

---

## 12. Possible extensions

* Move the filters into the URL as the source of truth so the view is
  shareable and back/forward works
* Add a catch-all route `app/students/[...filters]` for advanced URLs
* Add a `layout.tsx` inside `app/students/` with a sidebar or filter rail
* Paginate the directory and add a `/students/page/[n]` route
* Persist "recently viewed students" in `localStorage`
* Replace `lib/students.ts` with a real database and keep every other file
  unchanged
* Add unit tests for `filterStudents` and `getDirectoryStats`
* Add a `middleware.ts` that redirects `/student/*` (singular) to
  `/students/*`
