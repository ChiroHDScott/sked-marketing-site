---
name: adding-meta-pixel
description: Checks for and adds the Meta Pixel tracking code to the <head> of HTML files. Use when the user wants to add the Meta Pixel or Facebook Pixel to a page.
---

# Adding Meta Pixel

## When to use this skill
- When the user asks to "install meta pixel", "add facebook pixel", or "setup meta tracking".
- When you need to ensure the Meta Pixel code (ID 142763714514798) is present on a page.

## Workflow
- [ ] **Check Existence**: Search the target file for `142763714514798` or `fbq('init'` to prevent duplicate installation.
- [ ] **Read Template**: Read the exact script from `.agent/skills/adding-meta-pixel/resources/meta_pixel.html`.
- [ ] **Inject Script**: Insert the script content immediately before the closing `</head>` tag or right after the opening `<head>` tag in the target file.
- [ ] **Verify**: Confirm the script is present in the file content.

## Instructions

### 1. Check for Existing Tags
Before making any changes, check if the tag is already there using `grep_search`. Use `142763714514798` as the search term.

### 2. Inject Code
Use the `replace_file_content` tool to insert the tag.
For example, if inserting right before `</head>`:
- **TargetContent**: `</head>`
- **ReplacementContent**: `[Content of resources/meta_pixel.html]\n</head>`

### 3. Resources
This skill uses a static resource file for the tag content to ensure accuracy.
- `resources/meta_pixel.html`: Contains the exact Meta Pixel script provided by the user.

## Example Usage
If the user says "Add Meta Pixel to index.html":
1.  Read `.agent/skills/adding-meta-pixel/resources/meta_pixel.html` to get the script.
2.  Search `index.html` to check if `142763714514798` is present.
3.  If missing, read `index.html` to locate `</head>`.
4.  Call `replace_file_content` on `index.html` replacing `</head>` with the script followed by `</head>`.
