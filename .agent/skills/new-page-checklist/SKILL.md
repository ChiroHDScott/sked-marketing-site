---
name: new-page-checklist
description: Required boilerplate for every new page on the SKED marketing site — favicon, UTM retention, meta description, Open Graph tags, noindex (thank you pages), and JSON-LD schema. Apply before committing any new HTML file.
---

# New Page Checklist

Apply every item below to every new HTML page before committing. The order matters — place head elements in the sequence shown.

---

## 1. Favicon

Add immediately after `<meta name="viewport">`:

```html
<link rel="icon" type="image/png" href="https://skedlife.b-cdn.net/wp-content/uploads/2023/08/cropped-SKED-Square-S-Icon-32x32.png">
```

---

## 2. Meta Description

Add after the `<title>` tag. Write a unique 140–160 character description for every page.

```html
<meta name="description" content="DESCRIPTION">
```

---

## 3. Open Graph Tags

Add after `<meta name="description">`. Use page-specific values.

```html
<meta property="og:title" content="PAGE TITLE">
<meta property="og:description" content="SAME AS META DESCRIPTION">
<meta property="og:type" content="website">
<meta property="og:url" content="https://content.sked.life/FILENAME.html">
```

For **blog posts**, use `og:type` of `article` and add an image:
```html
<meta property="og:type" content="article">
<meta property="og:image" content="https://content.sked.life/Images/IMAGE.png">
```

---

## 4. Noindex (thank you pages and preview pages only)

Add as the **first tag** inside `<head>` on any thank you page or internal preview page:

```html
<meta name="robots" content="noindex, nofollow">
```

Pages this applies to: any file named `*-thank-you.html`, `*-preview.html`, or any page not intended for public search indexing.

---

## 5. JSON-LD Schema

Add before `</head>`. Choose the schema type that matches the page:

### Webinar / Online Training (Event)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "EVENT TITLE",
  "description": "EVENT DESCRIPTION",
  "startDate": "YYYY-MM-DDTHH:MM:SS-04:00",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": "https://content.sked.life/FILENAME.html",
  "organizer": {
    "@type": "Organization",
    "name": "SKED",
    "url": "https://sked.life"
  },
  "performer": { "@type": "Person", "name": "SPEAKER NAME" },
  "isAccessibleForFree": true
}
</script>
```

### Blog Post (Article + FAQPage)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "TITLE",
  "description": "DESCRIPTION",
  "image": "https://content.sked.life/Images/IMAGE.png",
  "url": "https://content.sked.life/FILENAME.html",
  "publisher": {
    "@type": "Organization",
    "name": "SKED",
    "url": "https://sked.life"
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "QUESTION 1?",
      "acceptedAnswer": { "@type": "Answer", "text": "ANSWER 1." }
    },
    {
      "@type": "Question",
      "name": "QUESTION 2?",
      "acceptedAnswer": { "@type": "Answer", "text": "ANSWER 2." }
    },
    {
      "@type": "Question",
      "name": "QUESTION 3?",
      "acceptedAnswer": { "@type": "Answer", "text": "ANSWER 3." }
    },
    {
      "@type": "Question",
      "name": "QUESTION 4?",
      "acceptedAnswer": { "@type": "Answer", "text": "ANSWER 4." }
    }
  ]
}
</script>
```

### Content Download / Checklist (FAQPage only)
Use the FAQPage schema block from above (no Article wrapper needed).

### Thank you pages / Simple pages
No schema needed.

---

## 6. Visible FAQ Section (blog posts and content downloads only)

For any page with FAQPage schema, add a matching visible FAQ section immediately before the final CTA section. This ensures Google sees both machine-readable and human-readable FAQ content.

```html
<!-- FAQ Section -->
<section class="py-12 lg:py-16 border-t border-slate-100">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-heading font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
        <div class="space-y-6">
            <div>
                <h3 class="font-heading font-semibold text-slate-900 mb-2">QUESTION 1?</h3>
                <p class="text-slate-600 text-sm leading-relaxed">ANSWER 1.</p>
            </div>
            <div>
                <h3 class="font-heading font-semibold text-slate-900 mb-2">QUESTION 2?</h3>
                <p class="text-slate-600 text-sm leading-relaxed">ANSWER 2.</p>
            </div>
            <div>
                <h3 class="font-heading font-semibold text-slate-900 mb-2">QUESTION 3?</h3>
                <p class="text-slate-600 text-sm leading-relaxed">ANSWER 3.</p>
            </div>
            <div>
                <h3 class="font-heading font-semibold text-slate-900 mb-2">QUESTION 4?</h3>
                <p class="text-slate-600 text-sm leading-relaxed">ANSWER 4.</p>
            </div>
        </div>
    </div>
</section>
```

Write 4 questions that reflect real search intent around the page's topic. Questions should address the "why," "how much," "how to," and "what is [product/solution]" angles.

---

## 7. UTM Retention Script

Add immediately before `</body>` on every page. This carries UTM parameters from ad/email traffic through to any `sked.life` CTA link on the page.

```html
<!-- UTM parameter retention -->
<script>
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  const utmParams = new URLSearchParams();
  utmKeys.forEach(key => { if (params.get(key)) utmParams.set(key, params.get(key)); });
  if ([...utmParams].length) {
    document.querySelectorAll('a[href*="sked.life"]').forEach(a => {
      const url = new URL(a.href);
      utmParams.forEach((v, k) => url.searchParams.set(k, v));
      a.href = url.toString();
    });
  }
</script>
```

---

## Quick Checklist

Before committing any new page, verify:

- [ ] Favicon link in `<head>`
- [ ] `<meta name="description">` with unique copy
- [ ] Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`)
- [ ] `og:image` if blog post or page has a preview image
- [ ] `noindex, nofollow` if thank you page or preview page
- [ ] JSON-LD schema matching page type
- [ ] Visible FAQ section if FAQPage schema was added
- [ ] UTM retention script before `</body>`
