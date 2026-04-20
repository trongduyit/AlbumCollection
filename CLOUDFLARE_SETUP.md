# 🚀 DEPLOY GUIDE: GitHub Pages + Cloudflare

## Step 1: Create GitHub Repository

1. Vào https://github.com/new
2. Điền:
   - **Repository name:** `hanoi-landing`
   - **Description:** `Hà Nội Dịu Dàng - Landing page with photo album`
   - **Public** ✓
   - **Initialize:** KHÔNG check gì
3. Click **Create repository**
4. Copy HTTPS URL: `https://github.com/trongduyit/hanoi-landing.git`

## Step 2: Push Code to GitHub

### Option A: Using HTTPS + Personal Access Token

```bash
# Tạo Personal Access Token:
# 1. GitHub Settings → Developer Settings → Personal Access Tokens
# 2. Generate new token (classic)
# 3. Scopes: repo, workflow
# 4. Copy token

cd d:\hanoi-landing
git push -u origin main
# When prompted:
# Username: trongduyit
# Password: [Paste your Personal Access Token]
```

### Option B: Using SSH (Recommended)

```bash
# Setup SSH key:
# 1. Run: ssh-keygen -t rsa -b 4096 -C "your@email.com"
# 2. Add to GitHub: Settings → SSH Keys
# 3. Change remote:

cd d:\hanoi-landing
git remote set-url origin git@github.com:trongduyit/hanoi-landing.git
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Vào: https://github.com/trongduyit/hanoi-landing
2. **Settings** → **Pages**
3. **Source:** Deploy from a branch
4. **Branch:** main
5. **Folder:** / (root)
6. **Save**

GitHub Pages sẽ live tại:
```
https://trongduyit.github.io/hanoi-landing
```

## Step 4: Setup Custom Domain with Cloudflare

### 4a. Update DNS at Domain Registrar

1. Tại registrar của bạn (GoDaddy, NameCheap, v.v.):
   - Update Nameservers to Cloudflare's:
     - `nina.ns.cloudflare.com`
     - `otto.ns.cloudflare.com`
   - (Cloudflare sẽ cung cấp các NS này)

### 4b. Add Domain to Cloudflare

1. Vào https://dash.cloudflare.com
2. **Add a site**
3. Enter domain: `yourdomain.com`
4. Chọn **Free plan**
5. Confirm nameservers (đã update ở bước trên)
6. **Continue**

### 4c. Create CNAME Record

1. Vào Cloudflare dashboard
2. **DNS** → **Records**
3. **Add record:**
   - **Type:** CNAME
   - **Name:** @ (for root) or subdomain
   - **Target:** `trongduyit.github.io`
   - **TTL:** Auto
   - **Proxy status:** Proxied (orange cloud)
   - **Save**

### 4d. Update GitHub Pages Settings

1. GitHub repo → **Settings** → **Pages**
2. **Custom domain:** Enter your domain
3. **Save**
4. GitHub sẽ tạo file `CNAME` tự động

---

## Step 5: Setup SSL/TLS Certificate

Cloudflare tự động setup Let's Encrypt SSL:
1. **SSL/TLS** → **Overview**
2. Select **Full** (Recommended)
3. Done! 🎉

---

## Step 6: Cloudflare Tunnel (Optional - For Local Server)

Nếu muốn expose local server qua Cloudflare Tunnel:

```bash
# 1. Download cloudflared:
# https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

# 2. Authenticate
cloudflared tunnel login

# 3. Create tunnel
cloudflared tunnel create hanoi-landing

# 4. Create config: ~/.cloudflared/config.yml
cat > config.yml << EOF
tunnel: hanoi-landing
credentials-file: /path/to/credentials
ingress:
  - hostname: yourdomain.com
    service: http://localhost:8000
  - service: http_status:404
EOF

# 5. Run tunnel
cloudflared tunnel run hanoi-landing
```

---

## Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled (URL working)
- [ ] Domain added to Cloudflare
- [ ] CNAME record created
- [ ] SSL certificate active
- [ ] Custom domain resolving
- [ ] Website accessible via custom domain

---

## Troubleshooting

### DNS not resolving
- Wait 24-48 hours for propagation
- Check: `nslookup yourdomain.com`

### GitHub Pages not updating
- Push new commit
- Check: Actions tab in GitHub

### Cloudflare showing 404
- Verify CNAME target is correct
- Check GitHub Pages URL directly first
- Wait for DNS propagation

### SSL certificate issues
- Use Flexible SSL in Cloudflare if needed
- Wait up to 30 minutes for cert

---

## Support Links

- GitHub Pages: https://docs.github.com/pages
- Cloudflare DNS: https://developers.cloudflare.com/dns/zone-setups/full-setup/
- Cloudflare Tunnel: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/

---

**Ready to deploy!** 🚀
