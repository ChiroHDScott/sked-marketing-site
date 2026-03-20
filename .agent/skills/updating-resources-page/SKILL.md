---
name: updating-resources-page
description: Updates resources.html whenever a new landing page is deployed. Promotes the new piece to the featured slot, demotes the previous featured resource to the grid, and commits the change to GitHub.
---

# Updating the Resources Page

## When to use this skill
- After building and deploying any new landing page (guide, checklist, webinar, report, etc.)
- The newest piece always becomes the **featured resource**
- The previously featured resource moves into the resource **grid**

## File to edit
`resources.html` — The resources hub at the root of the project.

## Step-by-Step Process

### 1. Read the current featured resource block

Locate the featured resource `<a>` tag inside `resources.html`. It starts after the comment `<!-- Featured Resource -->` and ends before `<!-- Resource Grid -->`.

Note the following from the current featured resource:
- **URL** (`href`)
- **Image path** (`src` on the `<img>` tag)
- **Image alt text**
- **Type badge** (e.g., Guide, Checklist, Webinar, Report)
- **Title** (inside `<h2>`)
- **Description** (inside `<p>`)
- **CTA label** (e.g., "Get the guide", "Get the checklist", "Watch the replay")

### 2. Convert the current featured resource to a grid card

Replace the featured `<a>` block with a new grid card. Choose a color scheme from the options below based on the resource type or to avoid repeating the same palette as adjacent cards.

**Grid card template:**
```html
<!-- [Short resource title] -->
<a href="URL" target="_blank" rel="noopener"
    class="card-hover flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
    <div class="bg-gradient-to-br from-COLOR-50 to-COLOR-100 h-48 flex items-center justify-center p-8">
        <div class="text-center">
            <div class="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-3">
                <!-- Choose an appropriate SVG icon (see icon options below) -->
                <svg class="w-7 h-7 text-COLOR-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="ICON_PATH"></path>
                </svg>
            </div>
            <p class="text-COLOR-700 font-heading font-bold text-lg leading-tight">SHORT TITLE</p>
        </div>
    </div>
    <div class="p-6 flex flex-col flex-grow">
        <div class="mb-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-COLOR-50 text-COLOR-700 text-xs font-bold uppercase tracking-wide">TYPE</span>
        </div>
        <h3 class="font-heading font-bold text-slate-900 text-lg mb-2 group-hover:text-sked-blue transition-colors">
            FULL TITLE
        </h3>
        <p class="text-slate-600 text-sm leading-relaxed flex-grow">
            DESCRIPTION
        </p>
        <div class="flex items-center text-sked-blue font-semibold text-sm mt-4 gap-2 group-hover:gap-3 transition-all">
            CTA LABEL
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
        </div>
    </div>
</a>
```

**Color palette options for grid cards:**

| Color | Tailwind prefix | Badge bg / text |
|-------|----------------|-----------------|
| SKED Blue | `sked-light` / `blue-100` | `bg-sked-light text-sked-blue` |
| Violet / Purple | `violet-50` / `purple-100` | `bg-violet-50 text-violet-700` |
| Slate / Gray | `slate-100` / `slate-200` | `bg-slate-100 text-slate-700` |
| Green | `green-50` / `green-100` | `bg-green-50 text-green-700` |
| Amber / Orange | `amber-50` / `orange-100` | `bg-amber-50 text-amber-700` |

**SVG icon options by content type:**

- **Checklist / tasks**: `M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4`
- **Guide / document**: `M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z`
- **Growth / trends**: `M13 7h8m0 0v8m0-8l-8 8-4-4-6 6`
- **Industry report / data**: `M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z`
- **Webinar / video**: `M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z`
- **Reviews / stars**: `M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z`

Add the new grid card as the **first item** in the `<!-- Resource Grid -->` div (before the existing grid cards), so the previously featured resource appears first in the grid.

### 3. Build the new featured resource card

Replace the old featured `<a>` block with the new resource using this template:

```html
<a href="URL" target="_blank" rel="noopener"
    class="block card-hover mb-16 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-soft group">
    <div class="flex items-center gap-6 p-6 lg:p-8">
        <!-- Cover Image (use if a preview image exists in ./Images/) -->
        <div class="flex-shrink-0">
            <img src="./Images/IMAGE_FILENAME" alt="ALT TEXT"
                class="w-24 lg:w-32 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
        </div>
        <!-- Content -->
        <div class="flex flex-col justify-center min-w-0">
            <div class="flex items-center gap-2 mb-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-sked-light text-sked-blue text-xs font-bold uppercase tracking-wide">TYPE</span>
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide">New</span>
            </div>
            <h2 class="text-lg lg:text-2xl font-heading font-bold text-slate-900 mb-2 leading-tight group-hover:text-sked-blue transition-colors">
                TITLE
            </h2>
            <p class="text-slate-600 leading-relaxed mb-4 text-sm hidden sm:block">
                DESCRIPTION
            </p>
            <div class="flex items-center text-sked-blue font-semibold text-sm gap-2 group-hover:gap-3 transition-all">
                CTA LABEL
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </div>
        </div>
    </div>
</a>
```

**Notes on the featured card:**
- If a preview image exists in `./Images/`, include the cover image div. If not, omit the image div entirely.
- Always include the green **"New"** badge on the featured resource.
- Remove the "New" badge from any previous featured resource when it moves to the grid.
- The CTA label should match the content type: "Get the guide", "Get the checklist", "Watch the replay", "Read the report", etc.

### 4. Commit to GitHub

After updating `resources.html`, commit the file:

```bash
git add resources.html
git commit -m "feat: add [resource title] to resources page"
git push origin main
```

## Example: What the full resources section looks like

```
<!-- Featured Resource -->
  <a href="[newest resource URL]"> ... featured card ... </a>

<!-- Resource Grid -->
  <a href="[previously featured URL]"> ... grid card (first) ... </a>
  <a href="[older resource]"> ... grid card ... </a>
  <a href="[older resource]"> ... grid card ... </a>
```

The grid grows by one card each time a new resource is added. There is no maximum — just ensure the grid columns stay consistent (`grid md:grid-cols-2 lg:grid-cols-3 gap-6`).
