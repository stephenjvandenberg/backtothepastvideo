# Back to the Past Video (Static Website)

A lightweight, high-performance HTML, CSS, and Vanilla JavaScript conversion of **[Back to the Past Video](https://backtothepastvideo.com/)**, preserving all original content, branding, media services, pricing, customer reviews, and local High Desert service areas.

---

## 🚀 Key Improvements Over Original `bttpv` Site

| Feature | Original `bttpv` Site | Static Site |
| :--- | :--- | :--- |
| **Dependencies** | Heavy server & database runtime requirements | **Zero dependencies** (pure HTML5, CSS3, Vanilla JS) |
| **Page Weight & Overhead** | Heavy nested `<div>` wrappers, bulky inline stylesheets | **Clean, semantic markup** with minimal DOM depth |
| **Load Speed** | Slower dynamic server processing | **Sub-second instant load**; perfect for CDN hosting |
| **Hosting Costs** | Requires server runtime and database hosting | **Free hosting ready** (GitHub Pages, Cloudflare Pages, Netlify) |
| **Assets & Media** | Remote `bttpv` media uploads | **Locally packaged images** in `assets/images/` |
| **Interactive Estimator** | None | **Live Cost Calculator** for tapes, film reels, photos & repairs |
| **Mobile Experience** | Generic mobile view | **Tailored mobile-first layout** with responsive navigation |

---

## 📁 Project Structure

```text
backtothepastvideo/
├── index.html              # Main semantic HTML5 single-page application
├── css/
│   └── style.css           # Modern CSS3 design system with CSS custom properties
├── js/
│   └── main.js             # Vanilla JS (nav toggle, scroll observer, calculator, lightbox, form)
├── assets/
│   └── images/             # Digitized original photography, logo, and format samples
│       ├── logo.png
│       ├── hero-banner.jpg
│       ├── vhs-formats.jpg
│       ├── audio-cassettes.jpg
│       ├── film-negatives.jpg
│       ├── tape-repair.jpg
│       ├── usb-copies.jpg
│       ├── about-equipment.jpg
│       ├── intro-tapes.jpg
│       ├── services-overview.jpg
│       ├── photo-scan-1.jpg
│       ├── photo-scan-2.jpg
│       └── photo-scan-3.jpg
├── LICENSE                 # Repository license
└── README.md               # Documentation
```

---

## ⚡ Features Included

1. **Brand & Hero Section**:
   - Header with sticky glassmorphism navigation, logo, and direct contact buttons.
   - Key value propositions: Free Victor Valley pick-up/drop-off, 1-year backup included, full tape review & event labeling, quick turnaround.
2. **Local Coverage Banner**:
   - Highlighting free local service in Victorville, Apple Valley, Hesperia, Lucerne Valley, Oak Hills, Phelan, Piñon Hills, Adelanto & Helendale, plus extended travel rates for Barstow and Cajon Pass.
3. **About Us**:
   - The origin story of Stephen founding the company in 2022 to give High Desert residents a trustworthy, in-person alternative to mail-in digitization.
4. **Transparent Services & Pricing**:
   - VHS, VHS-C, Hi8/Digital8 & miniDV ($10/hr footage).
   - CD & DVD to Flash Drive ($5–$10).
   - Additional Duplicate Drives & Storage ($10 service + drive cost).
   - Audio Cassettes ($20/tape) & Audio Reels ($30/reel).
   - 35mm Film Negatives & Slides ($0.50/photo, $0.45 for 250+).
   - Broken Tape Repair & Mold Cleaning ($20 "No Fix, No Fee").
   - 8mm & Super 8 Silent Movie Film Reels ($15 for 3", $40 for 5", $80 for 7").
   - High-Resolution Printed Photo Scans (600 DPI & 1200 DPI).
5. **Interactive Project Cost Calculator**:
   - Allows prospective customers to input quantities for any combination of tapes, reels, photos, albums, repairs, or drives.
   - Real-time price breakdown and $20 minimum fee notice.
   - One-click **"Send Estimate to Stephen"** button that transfers their itemized breakdown into the contact form message.
6. **Photo Scanning Showcase**:
   - Displays sample before-and-after photo enhancements with an accessible full-screen Lightbox viewer.
7. **Customer Reviews**:
   - Authentic 5-star testimonials from Donna, Kathy, and Nicole, with direct links to review on Google Reviews and Facebook.
8. **Contact & Quote Request**:
   - Contact card with Stephen's email (`Stephen@backtothepastvideo.com`), local pickup guidelines, and social links.
   - Smart form with email generator and a "Copy Message Details" clipboard utility.

---

## 💻 How to View & Run Locally

Because this project uses standard HTML, CSS, and JavaScript with no build steps or bundlers required:

### Option 1: Direct File
Simply open `index.html` in any web browser (Chrome, Safari, Edge, Firefox).

### Option 2: Using Any Local Web Server
You can launch a lightweight static server using any of the following:

- **Python**:
  ```bash
  python -m http.server 8080
  ```
- **Node (npx)**:
  ```bash
  npx serve .
  ```
- **VS Code**:
  Install the **Live Server** extension and click **"Go Live"**.

---

## 🌐 Deployment Options

This static codebase can be hosted for free or near-zero cost on:
- **GitHub Pages**: Push this repository to GitHub, go to **Settings > Pages**, and choose the `main` branch root.
- **Cloudflare Pages**: Connect your GitHub repository with build command left blank and output directory set to `/`.
- **Netlify / Vercel**: Drag and drop the folder or connect via Git.
- **Traditional Apache/Nginx Web Server**: Upload the files directly to `public_html` or `/var/www/html`.
