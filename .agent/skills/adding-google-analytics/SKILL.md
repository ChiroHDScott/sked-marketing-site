---
name: adding-google-analytics
description: Checks for and adds the specific Google Analytics tracking code to the <head> of HTML files. Use when the user wants to add analytics or tracking to a page.
---

# Adding Google Analytics

## When to use this skill
- When the user asks to "install google analytics", "add the google tag", or "setup tracking".
- When you need to insure the AW-10947408779 tag is present on a page.

## Workflow
- [ ] **Check Existence**: Search the target file for `AW-10947408779` or `googletagmanager` to prevent duplicate installation.
- [ ] **Read Template**: Read the exact script from `resources/google_tag.html`.
- [ ] **Inject Script**: Insert the script content immediately after the opening `<head>` tag in the target file.
- [ ] **Verify**: Confirm the script is present in the file content.

## Instructions

### 1. Check for Existing Tags
Before making any changes, check if the tag is already there.

```bash
grep -q "AW-10947408779" [target_file] && echo "Tag already present" || echo "Tag missing, proceeding..."
```

### 2. Inject Code
Use the `replace_file_content` tool to insert the tag.
- **TargetContent**: `<head>`
- **ReplacementContent**: `<head>\n[Content of resources/google_tag.html]`

### 3. Resources
This skill uses a static resource file for the tag content to ensure accuracy.
- `resources/google_tag.html`: Contains the exact gtag.js script.

## Example Usage
If the user says "Add GA to index.html":
1.  Read `resources/google_tag.html` to get the script.
2.  Read `index.html` to check for `<head>`.
3.  Call `replace_file_content` on `index.html` replacing `<head>` with `<head>` + the script.
