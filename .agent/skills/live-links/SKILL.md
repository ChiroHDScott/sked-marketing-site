---
name: live-links
description: Generates live production URLs for pages on the SKED marketing site. Use when the user asks for a live link, shareable link, or deployed URL for any page in this project.
---

# Live Links

## Base URL

All pages in this project are deployed at:

```
https://content.sked.life/
```

## How to generate a live link

Take the HTML filename and append it to the base URL.

**Formula:** `https://content.sked.life/[filename].html`

**Examples:**

| File | Live URL |
|------|----------|
| `health-talk-system.html` | https://content.sked.life/health-talk-system.html |
| `health-talk-system-thank-you.html` | https://content.sked.life/health-talk-system-thank-you.html |
| `modern-marketing-playbook.html` | https://content.sked.life/modern-marketing-playbook.html |
| `reduce-no-shows-checklist.html` | https://content.sked.life/reduce-no-shows-checklist.html |
| `resources.html` | https://content.sked.life/resources.html |
| `why-patients-ghost.html` | https://content.sked.life/why-patients-ghost.html |

## Notes

- The repo deploys automatically to this domain when changes are pushed to `main`
- No path prefix needed — files in the project root map directly to the base URL
- Files inside subdirectories (e.g. `Images/`) are accessible at `https://content.sked.life/Images/[filename]`
