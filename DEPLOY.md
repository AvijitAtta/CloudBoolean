# CloudBoolean Technology — Deployment Guide

This is a 100% static site (HTML + CSS + Bootstrap 5 + vanilla JS). It can be
deployed to **any** static host — Hostinger, Netlify, Vercel, Cloudflare Pages,
GitHub Pages, AWS S3 + CloudFront, etc.

## 1. Folder contents

```
cloudboolean-site/
├── index.html
├── 404.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── DEPLOY.md
└── assets/
    ├── images/   (hero.jpg, logo.png)
    └── icons/    (favicon.svg)
```

## 2. EmailJS setup (required for the contact form)

1. Create a free account at https://www.emailjs.com/.
2. **Add an Email Service** (Gmail, Outlook, SMTP, etc.) → copy the `Service ID`.
3. **Create an Email Template** with these variables:
   `{{subject}} {{name}} {{company}} {{email}} {{phone}} {{service}} {{budget}} {{message}}`
   - Set "To Email" to `info@cloudboolean.com`
   - Set "Subject" to `{{subject}}`
   - Sample body:
     ```
     New inquiry from the CloudBoolean website

     Name:    {{name}}
     Company: {{company}}
     Email:   {{email}}
     Phone:   {{phone}}
     Service: {{service}}
     Budget:  {{budget}}

     Message:
     {{message}}
     ```
   - Copy the `Template ID`.
4. In **Account → API Keys**, copy your **Public Key**.
5. Open `script.js` and replace:
   ```js
   const EMAILJS_PUBLIC_KEY  = "YOUR_EMAILJS_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID  = "YOUR_EMAILJS_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
   ```

## 3. Deploy to Hostinger (recommended for this site)

1. Log in to Hostinger → **Websites** → your domain → **File Manager**.
2. Open `public_html/`. Delete its default contents (`default.php`, etc.).
3. Upload every file/folder from `cloudboolean-site/` into `public_html/`
   so the structure becomes:
   ```
   public_html/
     index.html
     styles.css
     script.js
     ...
     assets/...
   ```
4. Visit `https://cloudboolean.com` — done.
5. In Hostinger → **SSL** → enable Let's Encrypt (free).
6. Optional: **Advanced → Redirects** → add `www → non-www`.

## 4. Deploy to Netlify

1. https://app.netlify.com → **Add new site → Deploy manually**.
2. Drag the entire `cloudboolean-site/` folder onto the upload area.
3. Add your custom domain under **Domain settings**.

## 5. Deploy to Vercel

1. https://vercel.com → **Add New → Project → Other**.
2. Upload or import this folder as the project root.
3. Framework preset: **Other**. Build command: *(empty)*. Output dir: `./`.

## 6. After deployment — submit to Google

1. Verify the domain in **Google Search Console**.
2. Submit `https://cloudboolean.com/sitemap.xml`.
3. Create / claim **Google Business Profile** for local SEO.

## 7. Replace placeholder images (optional)

`assets/images/hero.jpg` and `assets/images/logo.png` are royalty-free generated
artwork. Replace them with your final brand assets at the same filenames to
update the site instantly.
