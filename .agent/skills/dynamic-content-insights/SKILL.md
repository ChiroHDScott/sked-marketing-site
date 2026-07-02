---
name: dynamic-content-insights
description: Captures the computed result of an interactive tool (quiz, scorecard, assessment) as a plain-text summary and pipes it into a HubSpot form field named `dynamic_content_insights` for use in dynamic email content, sales context, and list segmentation. Use when building or wiring up any quiz/scorecard/assessment page that ends in a HubSpot form, or when a page needs to pass a personalized result into HubSpot per-lead.
---

# Dynamic Content Insights

## When to use this skill
- You are building an interactive tool (quiz, scorecard, assessment) whose result should follow the lead into HubSpot.
- An existing tool ends in a HubSpot form and needs to pass a personalized, computed summary per submission.
- Marketing wants a single HubSpot field they can drop into dynamic email content or use for segmentation, populated from the tool's outcome.

This pattern originated on the ChiroHD marketing site (`sorting-hat-quiz.html`, `star-wars-quiz.html`, `front-desk-scorecard.html`). SKED shares the same HubSpot portal (`7120555`), so the field and forms can be set up the same way.

## The four moving parts

### 1. A per-outcome content lookup
A JS object mapping each possible result to the raw material for the summary — typically `traits` (what this profile looks like) and `features` (matching SKED features to surface):
```js
const OUTCOME_DETAIL = {
  outcomeA: { traits: ["...", "..."], features: ["...", "..."] },
  // one entry per possible outcome
};
```

### 2. A `buildInsightsText(outcomeKey)` function
Assembles a **plain-text** block (never HTML) from the lookup plus the user's live scores. Use `\n` line breaks and `•` bullets so it survives being stuffed into a form field and rendered inside an email:
```js
function buildInsightsText(key) {
  const d = OUTCOME_DETAIL[key];
  let text = "QUIZ RESULT\nOutcome: " + key + "\n\n";
  text += "SCORES:\n" + /* scores joined */ "\n\n";
  text += "TRAITS:\n";  d.traits.forEach(t => text += "• " + t + "\n");
  text += "\nSKED OPPORTUNITY:\n"; d.features.forEach(f => text += "• " + f + "\n");
  return text;
}
```

### 3. Two independent delivery paths into HubSpot (keep BOTH)
Belt-and-suspenders. The `onFormReady` injection is the reliable path; the query param is the fallback for HubSpot's native pre-population.

```js
function showForm() {
  const outcome = getWinner();
  const insightsText = buildInsightsText(outcome);

  // Path A — URL query param (native pre-pop fallback)
  const prepopUrl = window.location.pathname + '?dynamic_content_insights=' + encodeURIComponent(insightsText);
  window.history.replaceState({}, document.title, prepopUrl);

  setTimeout(function () {
    hbspt.forms.create({
      portalId: "7120555",
      formId: "REPLACE-WITH-SKED-FORM-ID",   // ← per-page SKED form
      region: "na1",
      target: "#hubspot-embed",
      // Path B — direct field injection (reliable)
      onFormReady: function ($form) {
        try {
          window.history.replaceState({}, document.title, window.location.pathname); // clean the URL back up
          const input = $form.find('input[name="dynamic_content_insights"], textarea[name="dynamic_content_insights"]')[0];
          if (input && !input.value) {              // only if empty — don't clobber real pre-pop
            input.value = insightsText;
            input.dispatchEvent(new Event('input',  { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        } catch (e) {}
      }
    });
  }, 100);
}
```

### 4. The HubSpot side (easy to forget)
- The form **must contain a hidden field whose internal name is exactly `dynamic_content_insights`**. No field → nothing lands. Create it as a contact/form property in the HubSpot portal.
- Redirect on submit via the form callback, passing the outcome forward:
```js
window.addEventListener("message", function (event) {
  if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
    window.location.href = "your-thank-you.html?outcome=" + outcome;
  }
});
```

## Flow end to end
User answers → scores tallied → winning outcome determined → `buildInsightsText()` → both delivery paths fire → user submits the embedded HubSpot form → `onFormSubmitted` redirects to a thank-you page carrying the outcome.

## Gotchas
- Keep the summary **plain text**, not HTML.
- Set the value only if empty (`!input.value`) so you don't overwrite a genuine pre-population.
- The `replaceState` back to a clean path stops the long encoded summary from lingering in the visible URL/history.
- The two paths are redundant on purpose — do not drop one.
- **Portal is shared (`7120555`), but form IDs are per-page.** Use the SKED form ID for the specific page; never reuse a ChiroHD form ID.

## Related skills
- `adding-hubspot-tracking` — ensures the HubSpot loader is present on the page.
- `new-page-checklist` — boilerplate for any new page hosting the tool.
- `live-links` — production URL is `https://content.sked.life/<slug>`.
