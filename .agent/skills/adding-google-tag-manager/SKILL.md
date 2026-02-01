---
name: adding-google-tag-manager
description: Adds Google Tag Manager scripts to valid HTML pages. Use when the user asks to add Google Tag Manager or GTM.
---

# Adding Google Tag Manager

## When to use this skill
- The user wants to add Google Tag Manager (GTM) to a website.
- The user mentions "GTM" or "Google Tag Manager".

## Workflow
- [ ] Identify the target HTML file(s).
- [ ] Insert the Head Script immediately after the opening `<head>` tag (or as close to the top of `<head>` as possible).
- [ ] Insert the Body Script immediately after the opening `<body>` tag.

## Instructions
Use the `replace_file_content` tool to insert the following scripts.

### 1. Head Script
Target the opening `<head>` tag or the top of the head section.
Insert this EXACT content:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KSZRMH2T');</script>
<!-- End Google Tag Manager -->
```

### 2. Body Script
Target the opening `<body>` tag.
Insert this EXACT content immediately after `<body>`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KSZRMH2T"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### Important Notes
- Do not modify other content in the file.
- Ensure the scripts are placed correctly according to GTM best practices (Head script in `<head>`, Body script immediately after `<body>`).
