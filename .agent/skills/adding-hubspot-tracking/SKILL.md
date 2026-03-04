---
name: adding-hubspot-tracking
description: Checks for and adds the HubSpot tracking code to the <head> of HTML files. Use when the user wants to add HubSpot tracking to a page.
---

# Adding HubSpot Tracking

## When to use this skill
- When the user asks to "install hubspot", "add hubspot tracking", or "setup hubspot pixel".
- When you need to ensure the HubSpot tracking code (ID 7120555) is present on a page.

## Workflow
- [ ] **Check Existence**: Search the target file for `7120555` or `hs-script-loader` to prevent duplicate installation.
- [ ] **Read Template**: Read the exact script from `.agent/skills/adding-hubspot-tracking/resources/hubspot_tracking.html`.
- [ ] **Inject Script**: Insert the script content immediately before the closing `</head>` tag or right after the opening `<head>` tag in the target file.
- [ ] **Verify**: Confirm the script is present in the file content.

## Instructions

### 1. Check for Existing Tags
Before making any changes, check if the tag is already there using `grep_search`. Use `hs-script-loader` as the search term.

### 2. Inject Code
Use the `replace_file_content` tool to insert the tag.
For example, if inserting right before `</head>`:
- **TargetContent**: `</head>`
- **ReplacementContent**: `[Content of resources/hubspot_tracking.html]\n</head>`

### 3. Resources
This skill uses a static resource file for the tag content to ensure accuracy.
- `resources/hubspot_tracking.html`: Contains the exact HubSpot script provided by the user.

## Example Usage
If the user says "Add HubSpot to index.html":
1.  Read `.agent/skills/adding-hubspot-tracking/resources/hubspot_tracking.html` to get the script.
2.  Search `index.html` to check if `hs-script-loader` is present.
3.  If missing, read `index.html` to locate `</head>`.
4.  Call `replace_file_content` on `index.html` replacing `</head>` with the script followed by `</head>`.
