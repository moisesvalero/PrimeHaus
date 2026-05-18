---
name: Architectural Prestige
colors:
  surface: '#fff8f3'
  surface-dim: '#e0d9d2'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ec'
  surface-container: '#f4ede6'
  surface-container-high: '#eee7e0'
  surface-container-highest: '#e9e1db'
  on-surface: '#1e1b17'
  on-surface-variant: '#4e463b'
  inverse-surface: '#33302c'
  inverse-on-surface: '#f7efe9'
  outline: '#7f7669'
  outline-variant: '#d1c5b6'
  surface-tint: '#745a2e'
  primary: '#745a2e'
  on-primary: '#ffffff'
  primary-container: '#bc9c6a'
  on-primary-container: '#49340b'
  inverse-primary: '#e4c18c'
  secondary: '#4f6071'
  on-secondary: '#ffffff'
  secondary-container: '#d2e4f9'
  on-secondary-container: '#556678'
  tertiary: '#4d5f7c'
  on-tertiary: '#ffffff'
  tertiary-container: '#90a2c2'
  on-tertiary-container: '#263853'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdeac'
  primary-fixed-dim: '#e4c18c'
  on-primary-fixed: '#281900'
  on-primary-fixed-variant: '#5a4319'
  secondary-fixed: '#d2e4f9'
  secondary-fixed-dim: '#b6c8dc'
  on-secondary-fixed: '#0b1d2c'
  on-secondary-fixed-variant: '#374859'
  tertiary-fixed: '#d5e3ff'
  tertiary-fixed-dim: '#b5c7e9'
  on-tertiary-fixed: '#071c35'
  on-tertiary-fixed-variant: '#364763'
  background: '#fff8f3'
  on-background: '#1e1b17'
  surface-variant: '#e9e1db'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 84px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 60px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Work Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
spacing:
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 24px
  gutter: 24px
  stack-xl: 120px
  stack-lg: 64px
  stack-md: 32px
  stack-sm: 16px
---

## Brand & Style

This design system is anchored in the principles of the Swiss Design Movement (International Typographic Style), blending mathematical rigor with high-end editorial flair. The aesthetic is minimalist and architectural, prioritizing clarity, objective layout, and a structured hierarchy that reflects the permanence of luxury real estate.

The UI should feel like a curated gallery or a premium architectural monograph. It utilizes heavy whitespace as a functional element to frame property photography, ensuring the interface never competes with the assets. The tone is authoritative yet understated, evoking an emotional response of trust, exclusivity, and sophisticated taste.

## Colors

The palette is rooted in natural, "gallery-standard" tones. The primary gold (`#BC9C6A`) is used sparingly as a sophisticated accent for high-priority calls to action and signifiers of value. The secondary midnight navy (`#2D3E4E`) provides grounding and depth, used for footers, primary navigation, or heavy structural elements.

The background uses a warm off-white to prevent the "digital coldness" of pure white, while surfaces and cards use pure white to create subtle separation. Borders are intentional and functional, acting as structural "lines" rather than just containers.

## Typography

The typography strategy relies on the tension between a high-contrast Serif and a functional Grotesque. **Playfair Display** handles all display and headline roles, emphasizing the "Luxury" aspect through its elegant, thin hairlines and bold strokes. 

**Work Sans** provides the "Swiss" foundation—it is used for body copy, data, and navigational labels to ensure maximum legibility and a modern, utilitarian feel. Use `label-caps` for section headers and small metadata to create an architectural blueprint feel. Large display sizes should utilize negative letter-spacing to feel tight and art-directed.

## Layout & Spacing

The layout is governed by a strict 12-column grid system. However, to achieve the "Swiss Editorial" look, content should often be placed asymmetrically—for example, a headline may span columns 1-6 while the supporting body text spans columns 8-11.

Vertical rhythm is crucial. Use large increments of spacing (`stack-xl`) between major sections to allow the design to breathe. Vertical lines (1px width using `--border`) should be used to separate columns in data-heavy areas, mimicking architectural floor plans. Alignment should always be "flush left, ragged right" for body text to maintain the Swiss aesthetic.

## Elevation & Depth

In this design system, depth is achieved through layering and subtle tonal shifts rather than dramatic shadows. 

1.  **Structural Flatness:** Most elements sit flat on the grid. Separation is defined by 1px borders in `#E5E5E1`.
2.  **Subtle Lift:** The only permitted shadow is the `0 4px 20px rgba(0,0,0,0.03)` effect, applied exclusively to interactive cards or hovering menus to provide a "floated paper" feel.
3.  **Z-Axis Overlap:** Create depth by overlapping image containers with text blocks (e.g., a serif headline partially overlapping a property photo). This breaks the 2D plane without needing shadows.

## Shapes

The shape language is strictly **Sharp (0px)**. All containers, buttons, input fields, and image masks must have right-angle corners. This reinforces the architectural and structural narrative of the brand, reflecting the straight lines of modern luxury estates. Avoid any rounded corners, even in iconography—opt for linear, sharp-edged icon sets.

## Components

### Buttons
Buttons are strictly rectangular.
- **Primary:** Solid `#BC9C6A` with white text. No border.
- **Secondary:** Solid `#2D3E4E` with white text.
- **Ghost/Tertiary:** 1px border of `#1A1A1A` with obsidian text.
- **Label:** Use `label-caps` for all button text to maintain a professional, blueprint-style aesthetic.

### Input Fields
Inputs consist of a single 1px bottom border (`#E5E5E1`). On focus, the border transitions to obsidian (`#1A1A1A`). The label sits above the line in `label-caps`.

### Cards
Property cards are "frameless." The image occupies the top portion, followed by a generous whitespace area for the property title (Serif) and metadata (Sans). Use thin vertical separators between metadata points (e.g., SQ FT | BEDS | BATHS).

### Lists & Data
Real estate specifications should be presented in a clean, vertical list. Each row is separated by a 1px horizontal line. The "Label" (e.g., Price) is on the left in `label-caps`, and the "Value" (e.g., $4,250,000) is on the right in `body-md` bold.

### Navigation
The header should be oversized and airy. Use a "Breadcrumb" style or a simple "List" style with high letter-spacing. Avoid complex dropdowns; prefer full-screen "Mega-Menus" that utilize the 12-column grid for navigation categories.