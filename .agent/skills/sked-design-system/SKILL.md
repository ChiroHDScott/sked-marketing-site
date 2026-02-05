---
name: sked-design-system
description: Provides design tokens, assets, and guidelines for the SKED marketing site. Use when creating new UI components, pages, or artifacts to ensure brand consistency.
---

# SKED Design System

## When to use this skill
- When creating new HTML pages or UI components.
- When applying styles to match the SKED brand (colors, fonts).
- When looking for the correct logo or asset paths.

## Design Tokens

### Colors
From `tailwind.config` in `demoSKED.html`:

| Name | Hex | Usage |
|------|-----|-------|
| `sked-blue` | `#009ADC` | Primary brand color, buttons, links, active states |
| `sked-dark` | `#0B1120` | Dark backgrounds, footer |
| `sked-darker` | `#020617` | Deep backgrounds |
| `sked-light` | `#E0F2FE` | Light backgrounds, accents |
| `sked-accent` | `#38BDF8` | Highlights, gradients |
| `sked-slate` | `#F8FAFC` | Page background (light mode) |

#### Gradients
- **Hero**: `linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)`
- **Glow**: `conic-gradient(from 90deg at 50% 50%, #009ADC 0%, #38BDF8 50%, #009ADC 100%)`
- **Text Gradient**: `linear-gradient(to right, #009ADC, #0284c7)`

### Typography
- **Heading Font**: `Outfit` (Weights: 400, 500, 600, 700, 800)
- **Body Font**: `Inter` (Weights: 300, 400, 500, 600, 700)

**CDN Link**:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Assets
- **Logo**: `/sked_logo.png` (Root directory)
  - *Note: `Images/` directory contains other assets, but the main logo is currently in the root.*

## CSS/Tailwind Configuration
Use this configuration in the `<head>` of any new HTML file to match the current site:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    heading: ['Outfit', 'sans-serif'],
                },
                colors: {
                    sked: {
                        blue: '#009ADC',
                        dark: '#0B1120',
                        darker: '#020617',
                        light: '#E0F2FE',
                        accent: '#38BDF8',
                        slate: '#F8FAFC'
                    }
                },
                backgroundImage: {
                    'hero-gradient': 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                    'glow': 'conic-gradient(from 90deg at 50% 50%, #009ADC 0%, #38BDF8 50%, #009ADC 100%)'
                },
                boxShadow: {
                    'soft': '0 20px 40px -15px rgba(0, 154, 220, 0.15)',
                    'glow-blue': '0 0 20px rgba(0, 154, 220, 0.3)'
                }
            }
        }
    }
</script>
<style>
    body {
        background-color: #F8FAFC;
        color: #0F172A;
    }
    .text-gradient {
        background: linear-gradient(to right, #009ADC, #0284c7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
```

## Instructions for Use
1.  **Read this skill** before generating any new UI code.
2.  **Use the Tailwind config** provided above to ensure consistency.
3.  **Reference the logo** using the absolute path or relative path from the document root.
4.  **Validate** that the output matches the visual style of `demoSKED.html`.
