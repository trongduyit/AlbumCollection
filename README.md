# Hà Nội Dịu Dàng 🌸

**Hanoi Landing** - A gentle landing page showcasing Hanoi's artistic beauty with an interactive photo album.

> An artistic corner of Hanoi in autumn light — A curated photo album experience

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

### ✨ Features

- 🎬 **Animated Hero Video** - Auto-playing background video (muted, looping)
- 📸 **Photo Dataset** - 42 curated images of Hanoi displayed in an elegant album
- 📷 **Personal Photo Upload** - Upload and manage your own photos (stored locally with IndexedDB)
- 🎵 **Background Music** - Toggle on/off with customizable audio track
- 🖼️ **Lightbox Gallery** - Full-screen image viewer with navigation controls
- 📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop devices

### 🚀 Quick Start

**Option 1: Direct (No setup needed)**
```bash
# Just double-click index.html or:
start index.html
```

**Option 2: Local Server (Recommended)**
```bash
# Using Python 3
python -m http.server 8080
# Then visit http://localhost:8080

# OR using Node.js
npm install
npm start
```

### 📁 Project Structure

```
hanoi-landing/
├── index.html           # Main page
├── assets/
│   ├── images/          # 42+ Photos
│   ├── video/           # background.mp4
│   └── music/           # Music files
├── package.json
└── README.md
```

### 🌐 Deploy

- **GitHub Pages** - Free & easy
- **Netlify** - Free tier
- **Vercel** - High performance
- **Render** - Static site hosting

### 📄 License

MIT License

---

## Tiếng Việt

### ✨ Tính năng

- 🎬 Video nền hero tự động phát (muted, loop)
- 📸 42 ảnh dataset Hà Nội hiển thị trong album
- 📷 Upload ảnh cá nhân — lưu trong trình duyệt (IndexedDB)
- 🎵 Nhạc nền toggle bật/tắt (tùy chỉnh file nhạc)
- 🖼️ Lightbox xem ảnh lớn — có prev/next
- 📱 Responsive — đẹp trên mobile, tablet, desktop

### 🎨 Design

- Màu sắc: hồng phấn (#EBC8D8) + xanh lavender (#B5C7D3) + trắng ngà (#FAF7F4)
- Font: Playfair Display (heading) + Nunito (body)
- Animation: scroll reveal, hover zoom, lightbox fade

### 🚀 Chạy local

**Cách 1 — Mở trực tiếp:**
```bash
# Windows: double-click index.html hoặc
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

**Cách 2 — Local server (khuyên dùng):**
```bash
# Python 3
python -m http.server 8080

# Sau đó mở: http://localhost:8080
```

### 🌐 Deploy

1. Tạo repo GitHub
2. Chọn hosting: Netlify, Vercel, GitHub Pages, hoặc Render
3. Kết nối repo → Deploy
4. Done! 🎉

### 🎵 Tùy chỉnh nhạc nền

Thay thế file: `assets/music/music.mp3`

### 💾 Lưu trữ

Ảnh upload được lưu trong **IndexedDB** của trình duyệt — riêng tư, không cần server.

---

*Một góc Hà Nội dịu dàng* 🌸