# Deployment Guide - Hà Nội Dịu Dàng 🌸

This guide covers how to deploy your Hanoi Landing project to various hosting platforms.

## Table of Contents

1. [GitHub Pages](#github-pages) - Free, easy
2. [Netlify](#netlify) - Recommended
3. [Vercel](#vercel) - High performance
4. [Render](#render) - Simple static hosting
5. [Firebase Hosting](#firebase-hosting) - Google's solution
6. [AWS S3 + CloudFront](#aws-s3--cloudfront) - Scalable

---

## GitHub Pages

**Best for:** Free hosting tied to your GitHub account

### Steps:

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hanoi Landing"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hanoi-landing.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch, `/root` folder
   - Save

3. **Access your site**
   - URL: `https://YOUR_USERNAME.github.io/hanoi-landing`
   - Takes 1-2 minutes to build

### Pros ✅
- Free forever
- Auto-deploy on git push
- No configuration needed

### Cons ❌
- Slower CDN than others
- Limited to 1GB repository size

---

## Netlify

**Best for:** Modern static site hosting with continuous deployment

### Steps:

1. **Create Netlify account** at [netlify.com](https://netlify.com)

2. **Connect GitHub**
   - Click "New site from Git"
   - Authorize GitHub
   - Select `hanoi-landing` repository

3. **Configure build settings**
   - Build command: (leave empty)
   - Publish directory: `.`

4. **Deploy**
   - Click "Deploy site"
   - Netlify generates a URL

5. **(Optional) Custom domain**
   - Settings → Domain management
   - Add your custom domain

### Pros ✅
- Fast global CDN
- Free HTTPS
- Auto-deploy on git push
- Instant rollback
- Form handling available

### Cons ❌
- Paid tier for advanced features
- Account required

### Environment Variables
```bash
# netlify.toml
[build]
  command = ""
  publish = "."

[[redirects]]
  from = "/*"
  to = "index.html"
  status = 200
```

---

## Vercel

**Best for:** High-performance deployment with Vercel's infrastructure

### Steps:

1. **Create Vercel account** at [vercel.com](https://vercel.com)

2. **Import project**
   - Click "New Project"
   - Select GitHub and authorize
   - Choose `hanoi-landing` repository

3. **Configure**
   - Framework: (select "Other")
   - Root directory: (leave default)
   - Build command: (leave empty)

4. **Deploy**
   - Click "Deploy"
   - Get instant deployment

5. **(Optional) Custom domain**
   - Project Settings → Domains
   - Add your domain

### Pros ✅
- Extremely fast CDN
- Automatic HTTPS
- Analytics dashboard
- Edge functions available
- Zero-config deployment

### Cons ❌
- Paid tier for advanced features
- Account required

---

## Render

**Best for:** Simple static site hosting

### Steps:

1. **Create Render account** at [render.com](https://render.com)

2. **Create new Static Site**
   - Dashboard → New → Static Site
   - Connect GitHub repository

3. **Configure**
   - Build command: (leave empty)
   - Publish directory: `.`

4. **Deploy**
   - Click "Create Static Site"
   - Render builds and deploys

### Pros ✅
- Free tier available
- Auto-deploy from GitHub
- Global CDN
- Good documentation

### Cons ❌
- Smaller community
- Limited free tier features

---

## Firebase Hosting

**Best for:** Projects using Google Cloud ecosystem

### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase project**
   ```bash
   firebase init hosting
   ```
   - Choose "Use an existing project" or create new
   - Public directory: `.`
   - Configure as SPA: `No`

4. **Deploy**
   ```bash
   firebase deploy
   ```

### Pros ✅
- Integrates with Firebase services
- Global CDN
- Free HTTPS
- Real-time database ready

### Cons ❌
- More complex setup
- Requires Firebase account

---

## AWS S3 + CloudFront

**Best for:** Enterprise, high-scale deployments

### Steps:

1. **Create S3 bucket**
   - S3 Console → Create Bucket
   - Disable "Block Public Access"
   - Enable Static Website Hosting

2. **Upload files**
   ```bash
   aws s3 sync . s3://your-bucket-name --delete
   ```

3. **Create CloudFront distribution**
   - CloudFront → Create Distribution
   - Set S3 bucket as origin
   - Configure caching

4. **Get CDN URL**
   - Use CloudFront domain in DNS

### Pros ✅
- Highly scalable
- Enterprise-grade CDN
- Pay-as-you-go pricing
- Full AWS ecosystem

### Cons ❌
- Complex setup
- Requires AWS account
- Can be expensive for high traffic

---

## Environment-Specific Deployment

### Production
```bash
npm run build  # No-op for static site
# Deploy to production hosting
```

### Staging
```bash
# Deploy to staging server
# Usually from dev branch
```

---

## Post-Deployment Checklist

- [ ] Test on desktop, tablet, mobile
- [ ] Verify video plays automatically
- [ ] Test music toggle
- [ ] Test photo upload functionality
- [ ] Check IndexedDB storage works
- [ ] Verify navigation links work
- [ ] Test on different browsers
- [ ] Check loading performance
- [ ] Verify SEO metadata
- [ ] Set up analytics (Google Analytics, Vercel Analytics, etc.)

---

## Custom Domain Setup

### DNS Configuration

For any hosting service, update your domain DNS:

1. **Get nameservers** from your hosting provider
2. **Update domain registrar** DNS settings
3. **Wait 24-48 hours** for propagation
4. **Verify** with `nslookup yourdomain.com`

### HTTPS/SSL

All modern hosting automatically provides free HTTPS. No additional setup needed.

---

## Troubleshooting

### 404 errors after deployment
- Ensure `index.html` is in root directory
- Check `publish` directory in deployment settings

### Videos/Music not playing
- Verify file paths are relative (not absolute)
- Check CORS settings if loading from CDN

### Photos not uploading
- IndexedDB must be enabled in browser
- Private/Incognito mode may disable IndexedDB
- Check browser console for errors

### Slow performance
- Use CDN with global edge nodes (Netlify, Vercel, CloudFront)
- Optimize video file size
- Compress images

---

## CI/CD Pipeline Example

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## Monitoring & Analytics

### Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Check Page Speed Insights

---

## Support

For deployment issues:
- Check hosting platform documentation
- Review browser console for errors
- Test locally with `python -m http.server 8000`

---

Last updated: April 2026
