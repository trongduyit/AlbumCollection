
    /* ===== DATASET IMAGES LIST ===== */
    const datasetImages = [
      "assets/images/z7739133483170_04b05f6229351f95ebfcddc5c1c462a8.jpg",
      "assets/images/z7739133483444_8f534ecd9abf4343906e4c34f963e2d4.jpg",
      "assets/images/z7739133525830_eea205f8ccb9acf0c59cc9ea6f7397b1.jpg",
      "assets/images/z7740997035078_3cb3016ca5f1b9cb24e1fba445887317.jpg",
      "assets/images/z7740997046388_ddc144aa526b8a8b5a233cec5d880e20.jpg",
      "assets/images/z7740997049292_863e0637e6fd36f1d9d24f75c8a74c6c.jpg",
      "assets/images/z7740997061202_e3f0f7b8012a0bc60f9a47fc5c638c60.jpg",
      "assets/images/z7740997120090_ef3acda525426245b296676ee51c9f83.jpg",
      "assets/images/z7740997122635_fdc70903f21e10e0c97e4398aeda22fb.jpg",
      "assets/images/z7740997134717_e0d5d7293cf1d40108419d1ec988560a.jpg",
      "assets/images/z7740997134978_7fe67e3ba592259f846ec9653b87d611.jpg",
      "assets/images/z7740997141423_28436f4eb44d5869f47e58e7c1a44ea0.jpg",
      "assets/images/z7740997141653_06b224836161606ffbd416a37c3d61a2.jpg",
      "assets/images/z7740997149876_0fb62099f2cf5227b1668dad4e322c6.jpg",
      "assets/images/z7740997150473_9e8b4e62888c11181430b5bd70e53645.jpg",
      "assets/images/z7740997159523_686c61831382cbd96194e931fae64f23.jpg",
      "assets/images/z7740997162265_d7a5dfffb5c19c0b53b8ec11e750baa7.jpg",
      "assets/images/z7740997165288_3c9a688260e0a7919538d5770850eec7.jpg",
      "assets/images/z7740997165452_c4761caeac627387c52d6e2fc2aaac80.jpg",
      "assets/images/z7740997175344_eb64c5ceec3419f9b149c9c99dda3dc7e.jpg",
      "assets/images/z7740997180113_98c46db97f1b0d6b05cf32dfbc701a2c.jpg",
      "assets/images/z7740997180446_ed1169227c345e5a1ac8168c01f2b113.jpg",
      "assets/images/z7740997188623_97abbade42420040b34d9f0c51896e39.jpg",
      "assets/images/z7740997192976_31e0936673ebe032121d1fa524355db3.jpg",
      "assets/images/z7740997194928_78b1f7073326a74b9fe839bf6772e729.jpg",
      "assets/images/z7740997198082_4d10073181ca9c7a5a1e614b0b6d9bd1.jpg",
      "assets/images/z7740997202132_9a8d0cdf97e1bf46eef0ba25c2dd7276.jpg",
      "assets/images/z7740997208035_7a8ee6818748d4bbbb0055f4a5c9bf3.jpg",
      "assets/images/z7740997215321_7bd6527a509ec6631236ee1eb1a0feac.jpg",
      "assets/images/z7740997215551_eb58271d799959522c7e62ab477bc328.jpg",
      "assets/images/z7740997221704_a3ca5a846e179649493f0e123eb9804b.jpg",
      "assets/images/z7740997230899_1d77e022a5857bba25c40e1b34766605.jpg",
      "assets/images/z7740997241358_dedaac5af223568d40b594a4488a9b2f.jpg",
      "assets/images/z7740997247280_c8f306e589999d1a7ed075b46da11d88.jpg",
      "assets/images/z7740997313982_06b72f8593197e2333558ed9be418d94.jpg",
      "assets/images/z7740997327093_7c91fa3d5e4377c0065d135620f3a501.jpg",
      "assets/images/z7740997359304_c34980ba168e764517037485cb2363ac.jpg",
      "assets/images/z7740997381761_bbb0dea3087ac1e7acad664ff953a993.jpg",
      "assets/images/z7740997390628_4ae4ba84ceb861c3cf3c6655d1a0415a.jpg",
      "assets/images/z7740997422142_99388f521bcbf4ba42d4d1087b0e57d8.jpg",
      "assets/images/z7741007733637_00aa2e9e6a918c57446fd2bd41837745.jpg",
      "assets/images/z7741137314427_0429cffe6202f5d366ac3f7c56ecdd6c.jpg"
    ];

    /* ===== INDEXEDDB ===== */
    const DB_NAME = 'hanoi_album_db';
    const DB_VERSION = 2;
    const STORE_NAME = 'images';
    let db = null;

    function initDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => { db = request.result; resolve(db); };
        request.onupgradeneeded = (e) => {
          const database = e.target.result;
          if (!database.objectStoreNames.contains(STORE_NAME)) {
            database.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        };
      });
    }

    async function saveImages(images) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        images.forEach(img => store.put(img));
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }

    async function getAllImages() {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }

    async function deleteImage(id) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }

    async function clearAllImages() {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }

    /* ===== PETALS ANIMATION ===== */
    function createPetals() {
      const petals = ['🌸', '🌺', '🍃', '✨'];
      const hero = document.getElementById('hero');
      for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.className = 'hero-petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (8 + Math.random() * 8) + 's';
        petal.style.animationDelay = Math.random() * 8 + 's';
        petal.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
        hero.appendChild(petal);
      }
    }

    /* ===== NAV MENU ===== */
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

    window.addEventListener('scroll', () => {
      navMenu.classList.toggle('scrolled', window.scrollY > 50);
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // Dropdown: Quản Lý
    const manageDropdown = document.querySelector('.nav-dropdown');
    const manageToggle = document.getElementById('navManageToggle');
    manageToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = manageDropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      if (!isOpen) manageDropdown.classList.add('open');
    });

    document.getElementById('navOpenManager').addEventListener('click', () => {
      manageDropdown.classList.remove('open');
      openPhotoManager();
    });

    document.getElementById('navOpenUpload').addEventListener('click', () => {
      manageDropdown.classList.remove('open');
      document.getElementById('upload').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('navClearAll').addEventListener('click', async () => {
      manageDropdown.classList.remove('open');
      if (confirm('Xóa toàn bộ album riêng?')) {
        await clearAllImages();
        await renderPersonal();
      }
    });

    document.getElementById('navShuffle').addEventListener('click', async () => {
      manageDropdown.classList.remove('open');
      const images = await getAllImages();
      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }
      for (const img of images) await saveImages([img]);
      await renderPersonal();
    });

    document.getElementById('navExport').addEventListener('click', () => {
      manageDropdown.classList.remove('open');
      alert('Tính năng tải ZIP sẽ sớm ra mắt!');
    });

    // Dropdown: Cài Đặt
    const settingsDropdown = document.querySelector('.nav-dropdown:last-of-type');
    const settingsToggle = document.getElementById('navSettingsToggle');
    settingsToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = settingsDropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      if (!isOpen) settingsDropdown.classList.add('open');
    });

    // Color swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const color = swatch.dataset.color;
        const palettes = {
          pink: { '--pink-accent': '#C9869A', '--pink-light': '#EBC8D8', '--pink-bg': '#F2DCE8' },
          blue: { '--pink-accent': '#8AACC8', '--pink-light': '#B5C7D3', '--pink-bg': '#DCE8F0' },
          gold: { '--pink-accent': '#D4AF7A', '--pink-light': '#E8D4B8', '--pink-bg': '#F5EFE0' },
          green: { '--pink-accent': '#A8BFA0', '--pink-light': '#C8D8BC', '--pink-bg': '#E8F0E4' },
        };
        const p = palettes[color];
        if (p) Object.entries(p).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
        localStorage.setItem('hanoi_color', color);
      });
    });

    // Load saved color
    const savedColor = localStorage.getItem('hanoi_color');
    if (savedColor) {
      const swatch = document.querySelector(`.color-swatch[data-color="${savedColor}"]`);
      if (swatch) swatch.click();
    }

    // View swatches
    document.querySelectorAll('.nav-view-picker .view-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('.nav-view-picker .view-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const view = swatch.dataset.view;
        document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
        renderDataset(view);
        localStorage.setItem('hanoi_view', view);
      });
    });

    // Load saved view
    const savedView = localStorage.getItem('hanoi_view');
    if (savedView) {
      const swatch = document.querySelector(`.nav-view-picker .view-swatch[data-view="${savedView}"]`);
      if (swatch) swatch.click();
    }

    // Slide speed
    const slideSpeedSlider = document.getElementById('navSlideSpeed');
    const slideSpeedVal = document.getElementById('navSlideSpeedVal');
    slideSpeedSlider.addEventListener('input', () => {
      slideSpeedVal.textContent = slideSpeedSlider.value + 's / ảnh';
      localStorage.setItem('hanoi_slide_speed', slideSpeedSlider.value);
    });

    const savedSpeed = localStorage.getItem('hanoi_slide_speed');
    if (savedSpeed) {
      slideSpeedSlider.value = savedSpeed;
      slideSpeedVal.textContent = savedSpeed + 's / ảnh';
    }

    // Toggles
    const petalsToggle = document.getElementById('navPetals');
    petalsToggle.addEventListener('change', () => {
      document.querySelectorAll('.hero-petal').forEach(p => {
        p.style.display = petalsToggle.checked ? '' : 'none';
      });
      localStorage.setItem('hanoi_petals', petalsToggle.checked);
    });

    const soundToggle = document.getElementById('navSound');
    soundToggle.addEventListener('change', () => {
      if (!soundToggle.checked) {
        bgMusic.pause();
        musicPlaying = false;
      }
      localStorage.setItem('hanoi_sound', soundToggle.checked);
    });

    // Load settings
    if (localStorage.getItem('hanoi_petals') === 'false') {
      petalsToggle.checked = false;
      document.querySelectorAll('.hero-petal').forEach(p => p.style.display = 'none');
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
      }
    });

    /* ===== MUSIC PLAYER ===== */
    const musicBtn = document.getElementById('musicBtn');
    const musicPanel = document.getElementById('musicPanel');
    const musicWave = document.getElementById('musicWave');
    const volumeSlider = document.getElementById('volumeSlider');
    const bgMusic = document.getElementById('bgMusic');

    let musicPlaying = false;
    let webAudioCtx = null;
    let webAudioTimeout = null;
    const NOTE_FREQS = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 784, 880];

    // Web Audio API — piano ambient tự tạo
    function playWebAudioPiano() {
      if (!musicPlaying || !webAudioCtx) return;
      const vol = parseFloat(volumeSlider.value) / 100 * 0.06;
      const note = NOTE_FREQS[Math.floor(Math.random() * NOTE_FREQS.length)];
      const osc = webAudioCtx.createOscillator();
      const g = webAudioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = note;
      g.gain.setValueAtTime(0, webAudioCtx.currentTime);
      g.gain.linearRampToValueAtTime(vol, webAudioCtx.currentTime + 0.5);
      g.gain.exponentialRampToValueAtTime(0.001, webAudioCtx.currentTime + 4);
      osc.connect(g);
      g.connect(webAudioCtx.destination);
      osc.start();
      osc.stop(webAudioCtx.currentTime + 4);

      // Next note after 3-7 giây
      webAudioTimeout = setTimeout(() => playWebAudioPiano(), 3000 + Math.random() * 4000);
    }

    function startWebAudio() {
      if (webAudioCtx) return;
      webAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
      playWebAudioPiano();
    }

    function stopWebAudio() {
      musicPlaying = false;
      clearTimeout(webAudioTimeout);
      if (webAudioCtx) {
        webAudioCtx.close();
        webAudioCtx = null;
      }
    }

    // Lấy volume từ slider (0-100 → 0-1)
    function getVolume() { return volumeSlider.value / 100; }

    async function toggleMusic() {
      if (musicPlaying) {
        // STOP
        bgMusic.pause();
        bgMusic.currentTime = 0;
        stopWebAudio();
        musicBtn.classList.remove('playing');
        musicBtn.textContent = '🎵';
        musicWave.classList.add('paused');
        musicWave.querySelectorAll('span').forEach(s => { s.style.height = '4px'; s.style.animationPlayState = 'paused'; });
        musicPlaying = false;
      } else {
        // PLAY
        musicPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.textContent = '🔊';
        musicWave.classList.remove('paused');
        musicWave.querySelectorAll('span').forEach(s => s.style.animationPlayState = 'running');

        // Wave animation
        musicWave.querySelectorAll('span').forEach((s, i) => {
          s.style.height = (8 + Math.sin(i * 1.2) * 12) + 'px';
        });

        // 1️⃣ Thử phát file MP3
        bgMusic.volume = getVolume();
        bgMusic.currentTime = 0;
        const playPromise = bgMusic.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('✅ MP3 phát thành công!');
          }).catch(async (err) => {
            console.warn('⚠️ MP3 lỗi:', err, '→ chuyển Web Audio');
            bgMusic.pause();
            // 2️⃣ Fallback: Web Audio API piano
            startWebAudio();
          });
        }
      }
    }

    // Nút 🎵 click
    musicBtn.addEventListener('click', () => {
      musicPanel.classList.toggle('open');
      toggleMusic();
    });

    // Volume slider
    volumeSlider.addEventListener('input', () => {
      bgMusic.volume = getVolume();
    });

    // Pre-load audio
    bgMusic.load();

    /* ===== SLIDESHOW ===== */
    const slideshowTrack = document.getElementById('slideshowTrack');
    const slideshowDots = document.getElementById('slideshowDots');
    const ssPlay = document.getElementById('ssPlay');
    const ssPrev = document.getElementById('ssPrev');
    const ssNext = document.getElementById('ssNext');
    let ssIndex = 0;
    let ssPlaying = false;
    let ssTimer = null;
    let ssImages = [];
    let ssEffectIdx = 0;
    const ssEffects = ['active', 'zoom-in', 'slide-in'];

    function renderSlideshow(imgs) {
      ssImages = imgs;
      slideshowTrack.innerHTML = '';
      imgs.forEach((src, i) => {
        const slide = document.createElement('div');
        slide.className = 'slideshow-slide' + (i === 0 ? ' active' : '');
        slide.innerHTML = `<img class="slideshow-img-anim" src="${src}" alt="Slide ${i + 1}" loading="${i < 3 ? 'eager' : 'lazy'}">
          <div class="slideshow-overlay"></div>
          <div class="slideshow-caption">Hà Nội ${i + 1}</div>`;
        slideshowTrack.appendChild(slide);
      });
      slideshowDots.innerHTML = '';
      imgs.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slideshow-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        slideshowDots.appendChild(dot);
      });
    }

    function setSlide(index, effect) {
      const slides = slideshowTrack.querySelectorAll('.slideshow-slide');
      const dots = slideshowDots.querySelectorAll('.slideshow-dot');
      ssIndex = ((index % ssImages.length) + ssImages.length) % ssImages.length;

      // Remove all effect classes
      slides.forEach(s => {
        s.classList.remove('active', 'zoom-in', 'slide-in', 'zoom', 'slide-left');
      });

      // Set the new active slide with effect
      slides[ssIndex].className = 'slideshow-slide active ' + effect;
      dots.forEach((d, i) => d.classList.toggle('active', i === ssIndex));
    }

    function startSlideshow() {
      ssPlaying = true;
      ssEffectIdx = 0;
      ssPlay.textContent = '⏸';
      ssTimer = setInterval(() => {
        ssEffectIdx = (ssEffectIdx + 1) % ssEffects.length;
        setSlide(ssIndex + 1, ssEffects[ssEffectIdx]);
      }, 4000);
    }

    function stopSlideshow() {
      ssPlaying = false;
      ssPlay.textContent = '▶';
      clearInterval(ssTimer);
    }

    ssPlay.addEventListener('click', () => {
      if (ssPlaying) stopSlideshow();
      else startSlideshow();
    });
    ssPrev.addEventListener('click', () => { stopSlideshow(); setSlide(ssIndex - 1, 'active'); });
    ssNext.addEventListener('click', () => { stopSlideshow(); setSlide(ssIndex + 1, ssEffects[(ssEffectIdx + 1) % ssEffects.length]); });
    slideshowDots.addEventListener('click', (e) => {
      if (e.target.classList.contains('slideshow-dot')) {
        stopSlideshow();
        setSlide(parseInt(e.target.dataset.index), 'active');
      }
    });

    /* ===== RENDER DATASET GRID ===== */
    function renderDataset(view = 'grid') {
      const grid = document.getElementById('datasetGrid');
      grid.className = 'photo-grid ' + view;
      grid.innerHTML = datasetImages.map((src, i) => `
        <div class="photo-item" data-index="${i}" style="animation-delay: ${(i % 12) * 0.05}s">
          <img src="${src}" alt="Hà Nội ${i + 1}" loading="lazy">
          <div class="photo-item-overlay"><span>Góc Hà Nội #${i + 1}</span></div>
        </div>
      `).join('');
    }

    /* ===== PHOTO MANAGER ===== */
    const pmModal = document.getElementById('pmModal');
    const pmGrid = document.getElementById('pmGrid');
    const pmEmpty = document.getElementById('pmEmpty');
    const pmSelectBar = document.getElementById('pmSelectBar');
    const pmSelectCount = document.getElementById('pmSelectCount');
    const pmContentEdit = document.getElementById('pmContentEdit');
    const pmContentUpload = document.getElementById('pmContentUpload');
    const pmUploadZone = document.getElementById('pmUploadZone');
    const pmFileInput = document.getElementById('pmFileInput');
    const pmPreviewArea = document.getElementById('pmPreviewArea');
    const pmPreviewGrid = document.getElementById('pmPreviewGrid');
    const pmPreviewCount = document.getElementById('pmPreviewCount');
    const pmBtnSave = document.getElementById('pmBtnSave');
    const pmBtnCancel = document.getElementById('pmBtnCancel');
    const pmImgModal = document.getElementById('pmImgModal');
    const pmImgView = document.getElementById('pmImgView');
    const pmImgDel = document.getElementById('pmImgDel');

    let pmImages = [];      // all images from IndexedDB
    let pmSelected = new Set(); // selected IDs
    let pmPendingFiles = [];    // files waiting to be saved
    let pmViewIndex = 0;        // current view in preview modal

    function openPhotoManager() {
      pmModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      switchTab('edit');
      loadPmGrid();
    }

    function closePhotoManager() {
      pmModal.classList.remove('active');
      document.body.style.overflow = '';
      pmSelected.clear();
      pmPendingFiles = [];
    }

    function switchTab(tab) {
      document.querySelectorAll('.pm-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
      pmContentEdit.style.display = tab === 'edit' ? '' : 'none';
      pmContentUpload.style.display = tab === 'upload' ? '' : 'none';
      if (tab === 'upload') {
        pmPendingFiles = [];
        pmPreviewArea.classList.remove('active');
        pmFileInput.value = '';
      }
    }

    async function loadPmGrid() {
      pmImages = await getAllImages();
      pmSelected.clear();
      updatePmSelectBar();
      renderPmGrid();
    }

    function renderPmGrid() {
      if (pmImages.length === 0) {
        pmGrid.innerHTML = '';
        pmEmpty.style.display = 'block';
        return;
      }
      pmEmpty.style.display = 'none';
      pmGrid.innerHTML = '';
      pmImages.forEach((img, i) => {
        const item = document.createElement('div');
        item.className = 'pm-item' + (pmSelected.has(img.id) ? ' selected' : '');
        item.dataset.id = img.id;
        item.dataset.index = i;
        item.style.animationDelay = (i * 0.04) + 's';
        item.innerHTML = `
          <img src="${img.dataUrl}" alt="Ảnh ${i + 1}" loading="lazy">
          <div class="pm-item-overlay">${pmSelected.has(img.id) ? '✓' : 'Chọn'}</div>
          <div class="pm-item-badge">${pmSelected.has(img.id) ? '✓' : ''}</div>`;
        pmGrid.appendChild(item);
      });
    }

    function updatePmSelectBar() {
      const n = pmSelected.size;
      pmSelectBar.style.display = n > 0 ? 'flex' : 'none';
      pmSelectCount.textContent = `${n} ảnh đã chọn`;
    }

    // Grid click: select or preview
    pmGrid.addEventListener('click', async (e) => {
      const item = e.target.closest('.pm-item');
      if (!item) return;

      const id = item.dataset.id;
      const index = parseInt(item.dataset.index);

      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        // Toggle select
        if (pmSelected.has(id)) pmSelected.delete(id);
        else pmSelected.add(id);
        updatePmSelectBar();
        renderPmGrid();
      } else {
        // Open preview
        pmViewIndex = index;
        openPmImg(index);
      }
    });

    function openPmImg(index) {
      pmViewIndex = index;
      const img = pmImages[index];
      pmImgView.src = img.dataUrl;
      pmImgModal.classList.add('active');
    }

    function closePmImg() {
      pmImgModal.classList.remove('active');
    }

    function pmImgNav(dir) {
      pmViewIndex = ((pmViewIndex + dir + pmImages.length) % pmImages.length);
      pmImgView.src = pmImages[pmViewIndex].dataUrl;
    }

    // Delete current viewed image
    pmImgDel.addEventListener('click', async () => {
      const id = pmImages[pmViewIndex].id;
      await deleteImage(id);
      await loadPmGrid();
      closePmImg();
    });

    // Delete selected images
    document.getElementById('pmDeleteSelected').addEventListener('click', async () => {
      if (pmSelected.size === 0) return;
      const confirmed = confirm(`Xóa ${pmSelected.size} ảnh đã chọn?`);
      if (!confirmed) return;
      for (const id of pmSelected) {
        await deleteImage(id);
      }
      pmSelected.clear();
      await loadPmGrid();
    });

    document.getElementById('pmClearSelection').addEventListener('click', () => {
      pmSelected.clear();
      updatePmSelectBar();
      renderPmGrid();
    });

    // PM tab switching
    document.querySelectorAll('.pm-tab').forEach(t => {
      t.addEventListener('click', () => switchTab(t.dataset.tab));
    });

    // Close PM modal
    document.getElementById('pmClose').addEventListener('click', closePhotoManager);
    pmImgModal.addEventListener('click', (e) => {
      if (e.target === pmImgModal) closePmImg();
    });

    // PM image nav
    document.getElementById('pmImgPrev').addEventListener('click', () => pmImgNav(-1));
    document.getElementById('pmImgNext').addEventListener('click', () => pmImgNav(1));
    document.getElementById('pmImgClose').addEventListener('click', closePmImg);

    // PM upload zone
    pmUploadZone.addEventListener('dragover', (e) => { e.preventDefault(); pmUploadZone.classList.add('drag-over'); });
    pmUploadZone.addEventListener('dragleave', () => pmUploadZone.classList.remove('drag-over'));
    pmUploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      pmUploadZone.classList.remove('drag-over');
      handlePmFiles(e.dataTransfer.files);
    });
    pmFileInput.addEventListener('change', () => handlePmFiles(pmFileInput.files));

    function handlePmFiles(files) {
      pmPendingFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
      if (!pmPendingFiles.length) return;
      pmPreviewArea.classList.add('active');
      pmPreviewCount.textContent = pmPendingFiles.length;
      pmPreviewGrid.innerHTML = '';
      pmPendingFiles.forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const div = document.createElement('div');
          div.className = 'pm-preview-item';
          div.innerHTML = `<img src="${e.target.result}" alt="">
            <button class="pm-preview-remove" data-idx="${i}">×</button>`;
          pmPreviewGrid.appendChild(div);
        };
        reader.readAsDataURL(file);
      });
    }

    pmPreviewGrid.addEventListener('click', (e) => {
      if (!e.target.classList.contains('pm-preview-remove')) return;
      const idx = parseInt(e.target.dataset.idx);
      pmPendingFiles.splice(idx, 1);
      pmPreviewCount.textContent = pmPendingFiles.length;
      if (!pmPendingFiles.length) pmPreviewArea.classList.remove('active');
      else handlePmFiles(Object.assign([], pmPendingFiles));
    });

    pmBtnCancel.addEventListener('click', () => {
      pmPendingFiles = [];
      pmPreviewArea.classList.remove('active');
      pmFileInput.value = '';
    });

    pmBtnSave.addEventListener('click', async () => {
      if (!pmPendingFiles.length) return;
      pmBtnSave.textContent = '⏳ Đang lưu...';
      pmBtnSave.disabled = true;
      const toSave = [];
      for (const file of pmPendingFiles) {
        const dataUrl = await new Promise(r => {
          const reader = new FileReader();
          reader.onload = e => r(e.target.result);
          reader.readAsDataURL(file);
        });
        toSave.push({ id: Date.now() + Math.random(), dataUrl, addedAt: Date.now(), name: file.name });
      }
      await saveImages(toSave);
      pmPendingFiles = [];
      pmPreviewArea.classList.remove('active');
      pmFileInput.value = '';
      pmBtnSave.textContent = '💾 Đã lưu!';
      setTimeout(() => { pmBtnSave.textContent = '💾 Lưu Vào Album'; pmBtnSave.disabled = false; }, 2000);
      await loadPmGrid();
      await renderPersonal();
    });

    // PM keyboard
    document.addEventListener('keydown', (e) => {
      if (!pmImgModal.classList.contains('active')) return;
      if (e.key === 'Escape') closePmImg();
      if (e.key === 'ArrowLeft') pmImgNav(-1);
      if (e.key === 'ArrowRight') pmImgNav(1);
    });

    // Open manager button
    document.getElementById('btnManager').addEventListener('click', openPhotoManager);
    document.getElementById('btnEdit').addEventListener('click', openPhotoManager);

    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDataset(btn.dataset.view);
      });
    });

    /* ===== RENDER PERSONAL ALBUM ===== */
    async function renderPersonal() {
      const grid = document.getElementById('personalGrid');
      const empty = document.getElementById('emptyState');
      const actions = document.getElementById('personalActions');
      const count = document.getElementById('personalCount');
      try {
        const images = await getAllImages();
        count.textContent = `${images.length} khoảnh khắc đã lưu`;
        if (images.length === 0) {
          grid.innerHTML = '';
          empty.style.display = 'block';
          actions.style.display = 'none';
        } else {
          empty.style.display = 'none';
          actions.style.display = 'flex';
          grid.innerHTML = images.map((img, i) => `
            <div class="personal-item" data-id="${img.id}" style="animation-delay: ${i * 0.05}s">
              <img src="${img.dataUrl}" alt="Ảnh ${i + 1}" loading="lazy">
              <div class="personal-item-actions">
                <button class="personal-action-btn view-btn" title="Xem lớn">🔍</button>
                <button class="personal-action-btn delete-btn" title="Xóa">×</button>
              </div>
            </div>
          `).join('');
        }
      } catch (e) {
        console.error('Error loading personal album:', e);
      }
    }

    /* ===== LIGHTBOX ===== */
    let currentIndex = 0;
    let allImages = [];
    let lightboxSource = 'dataset';

    function openLightbox(index, images, source) {
      allImages = images;
      currentIndex = index;
      lightboxSource = source;
      showLightboxImg();
      document.getElementById('lightbox').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function showLightboxImg() {
      const el = document.getElementById('lightboxImg');
      const src = allImages[currentIndex].src || allImages[currentIndex];
      el.src = src;
    }

    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('active');
      document.body.style.overflow = '';
    }

    function lightboxNav(dir) {
      currentIndex = ((currentIndex + dir + allImages.length) % allImages.length);
      showLightboxImg();
    }

    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => lightboxNav(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => lightboxNav(1));
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('lightbox').classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
    });

    // Dataset grid click
    document.getElementById('datasetGrid').addEventListener('click', (e) => {
      const item = e.target.closest('.photo-item');
      if (!item) return;
      const index = parseInt(item.dataset.index);
      openLightbox(index, datasetImages.map(src => ({ src })), 'dataset');
    });

    // Personal album click
    document.getElementById('personalGrid').addEventListener('click', async (e) => {
      const item = e.target.closest('.personal-item');
      if (!item) return;

      if (e.target.classList.contains('delete-btn')) {
        e.stopPropagation();
        if (confirm('Xóa ảnh này?')) {
          await deleteImage(item.dataset.id);
          await renderPersonal();
        }
        return;
      }

      if (e.target.classList.contains('view-btn')) {
        e.stopPropagation();
        const id = item.dataset.id;
        const images = await getAllImages();
        const index = images.findIndex(img => img.id === id);
        openLightbox(index, images.map(img => ({ src: img.dataUrl })), 'personal');
        return;
      }

      const id = item.dataset.id;
      const images = await getAllImages();
      const index = images.findIndex(img => img.id === id);
      openLightbox(index, images.map(img => ({ src: img.dataUrl })), 'personal');
    });

    /* ===== PERSONAL SLIDESHOW ===== */
    let psImages = [];
    let psIndex = 0;
    let psTimer = null;

    const personalSlideshow = document.getElementById('personalSlideshow');
    const psSlide = document.getElementById('psSlide');
    const psCounter = document.getElementById('psCounter');
    const psClose = document.getElementById('psClose');
    const psPrev = document.getElementById('psPrev');
    const psNext = document.getElementById('psNext');
    const psSlideWrap = personalSlideshow ? personalSlideshow.querySelector('.ps-track') : null;

    async function openPersonalSlideshow() {
      const images = await getAllImages();
      console.log('Personal slideshow images:', images.length);
      if (images.length === 0) {
        alert('Chưa có ảnh nào trong album riêng! Hãy upload ảnh trước.');
        return;
      }
      psImages = images;
      psIndex = 0;
      // Force show first slide
      psSlide.classList.remove('active');
      psSlide.src = psImages[0].dataUrl;
      psSlide.onload = () => psSlide.classList.add('active');
      if (psImages[0].dataUrl) psSlide.src = psImages[0].dataUrl;
      psSlide.classList.add('active');
      psCounter.textContent = `1 / ${psImages.length}`;
      if (personalSlideshow) personalSlideshow.classList.add('active');
      document.body.style.overflow = 'hidden';
      clearInterval(psTimer);
      psTimer = setInterval(() => {
        const nextIdx = (psIndex + 1) % psImages.length;
        psIndex = nextIdx;
        animatePsSlide(psImages[psIndex].dataUrl, psIndex);
      }, 4000);
    }

    function animatePsSlide(src, index) {
      // Fade out
      psSlide.style.opacity = '0';
      psSlide.style.transform = 'scale(0.9)';
      setTimeout(() => {
        psSlide.src = src;
        psCounter.textContent = `${index + 1} / ${psImages.length}`;
        // Fade in
        psSlide.onload = () => {
          psSlide.style.opacity = '1';
          psSlide.style.transform = 'scale(1)';
        };
        if (psSlide.complete) {
          psSlide.style.opacity = '1';
          psSlide.style.transform = 'scale(1)';
        }
      }, 400);
    }

    function psNavigate(dir) {
      clearInterval(psTimer);
      psIndex = ((psIndex + dir + psImages.length) % psImages.length);
      animatePsSlide(psImages[psIndex].dataUrl, psIndex);
      psTimer = setInterval(() => {
        const nextIdx = (psIndex + 1) % psImages.length;
        psIndex = nextIdx;
        animatePsSlide(psImages[psIndex].dataUrl, psIndex);
      }, 4000);
    }

    if (psClose) psClose.addEventListener('click', () => {
      if (personalSlideshow) personalSlideshow.classList.remove('active');
      document.body.style.overflow = '';
      clearInterval(psTimer);
    });

    if (psPrev) psPrev.addEventListener('click', () => psNavigate(-1));
    if (psNext) psNext.addEventListener('click', () => psNavigate(1));

    // Keyboard for personal slideshow
    document.addEventListener('keydown', (e) => {
      if (!personalSlideshow || !personalSlideshow.classList.contains('active')) return;
      if (e.key === 'Escape') { psClose.click(); }
      if (e.key === 'ArrowLeft') psNavigate(-1);
      if (e.key === 'ArrowRight') psNavigate(1);
    });

    /* ===== UPLOAD ===== */
    let pendingFiles = [];

    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const previewArea = document.getElementById('previewArea');
    const previewGrid = document.getElementById('previewGrid');
    const previewCount = document.getElementById('previewCount');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const btnSave = document.getElementById('btnSave');
    const btnCancel = document.getElementById('btnCancel');

    uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => handleFiles(fileInput.files));

    function handleFiles(files) {
      pendingFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
      if (pendingFiles.length === 0) return;
      renderPreviews();
    }

    function renderPreviews() {
      previewArea.classList.add('active');
      previewCount.textContent = pendingFiles.length;
      previewGrid.innerHTML = '';
      let completed = 0;
      pendingFiles.forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const div = document.createElement('div');
          div.className = 'preview-item';
          div.style.animationDelay = (i * 0.05) + 's';
          div.innerHTML = `
            <img src="${e.target.result}" alt="Preview ${i}">
            <button class="preview-remove" data-idx="${i}">×</button>
          `;
          previewGrid.appendChild(div);
          completed++;
          progressText.textContent = `Đọc ${completed}/${pendingFiles.length} ảnh...`;
        };
        reader.readAsDataURL(file);
      });
      progressText.textContent = `Sẵn sàng lưu ${pendingFiles.length} ảnh`;
    }

    previewGrid.addEventListener('click', (e) => {
      if (!e.target.classList.contains('preview-remove')) return;
      const idx = parseInt(e.target.dataset.idx);
      pendingFiles.splice(idx, 1);
      previewCount.textContent = pendingFiles.length;
      if (pendingFiles.length === 0) {
        previewArea.classList.remove('active');
      } else {
        renderPreviews();
      }
    });

    btnCancel.addEventListener('click', () => {
      pendingFiles = [];
      previewArea.classList.remove('active');
      fileInput.value = '';
    });

    btnSave.addEventListener('click', async () => {
      if (pendingFiles.length === 0) return;
      uploadProgress.classList.add('active');
      btnSave.disabled = true;
      btnSave.textContent = '⏳ Đang lưu...';

      const imagesToSave = [];
      for (let i = 0; i < pendingFiles.length; i++) {
        const file = pendingFiles[i];
        const dataUrl = await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
        imagesToSave.push({
          id: Date.now() + Math.random(),
          dataUrl,
          addedAt: Date.now(),
          name: file.name
        });
        progressBar.style.width = ((i + 1) / pendingFiles.length * 100) + '%';
        progressText.textContent = `Đang lưu ${i + 1}/${pendingFiles.length} ảnh...`;
      }

      try {
        await saveImages(imagesToSave);
        pendingFiles = [];
        previewArea.classList.remove('active');
        uploadProgress.classList.remove('active');
        progressBar.style.width = '0%';
        fileInput.value = '';
        await renderPersonal();
        btnSave.textContent = '💾 Đã lưu!';
        btnSave.style.background = '#A8BFA0';
        setTimeout(() => {
          btnSave.textContent = '💾 Lưu Album Riêng';
          btnSave.style.background = '';
          btnSave.disabled = false;
        }, 2000);
        document.getElementById('personal').scrollIntoView({ behavior: 'smooth' });
      } catch (e) {
        console.error(e);
        btnSave.textContent = '❌ Lỗi! Thử lại';
        btnSave.disabled = false;
      }
    });

    /* ===== PERSONAL ACTIONS ===== */
    document.getElementById('btnSlideshow').addEventListener('click', openPersonalSlideshow);

    document.getElementById('btnShuffle').addEventListener('click', async () => {
      const images = await getAllImages();
      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }
      // Re-save in new order
      for (const img of images) {
        await saveImages([img]);
      }
      await renderPersonal();
    });

    document.getElementById('btnClearAll').addEventListener('click', async () => {
      const images = await getAllImages();
      if (images.length === 0) return;
      if (confirm(`Xóa tất cả ${images.length} ảnh trong album riêng?`)) {
        await clearAllImages();
        await renderPersonal();
      }
    });

    /* ===== SCROLL REVEAL ===== */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(el => revealObserver.observe(el));

    /* ===== INIT ===== */
    (async () => {
      try {
        await initDB();
        createPetals();
        renderSlideshow(datasetImages.slice(0, 12));
        renderDataset('grid');
        await renderPersonal();
      } catch (e) {
        console.error('Init error:', e);
      }
    })();
  
