// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initFuturisticLoader();
    initHologramEffect();
    initCursor();
    initParticles();
    initNavbar();
    initTypewriter();
    initHeroAnimations();
    initCounters();
    initSkills();
    initProjects();
    initContactForm();
    initBackToTop();
    initAOS();
    handleResponsive();
    optimizeForTouch();
});

// ===== FUTURISTIC LOADING SCREEN =====
function initFuturisticLoader() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingProgress = document.getElementById('loadingProgress');
  const loadingPercentage = document.getElementById('loadingPercentage');
  const loadingStatus = document.getElementById('loadingStatus');
  
  // Status messages
  const statusMessages = [
    'INITIALIZING SYSTEM',
    'ESTABLISHING CONNECTION',
    'LOADING ASSETS',
    'CALIBRATING INTERFACE',
    'RENDERING GRAPHICS',
    'SYNCING DATA',
    'OPTIMIZING PERFORMANCE',
    'LAUNCHING PORTFOLIO'
  ];
  
  let progress = 0;
  let messageIndex = 0;
  
  // Create particles
  createLoadingParticles();
  
  // Create binary rain
  createBinaryRain();
  
  // Simulate loading progress
  const interval = setInterval(() => {
    progress += Math.random() * 3 + 1;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Change status message
      loadingStatus.textContent = 'SYSTEM READY';
      
      // Hide loading screen after delay
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
      }, 1000);
    }
    
    // Update progress bar
    loadingProgress.style.width = progress + '%';
    loadingPercentage.textContent = Math.floor(progress) + '%';
    
    // Update status message every 10-15%
    if (progress > (messageIndex + 1) * 12.5) {
      messageIndex++;
      if (messageIndex < statusMessages.length) {
        loadingStatus.textContent = statusMessages[messageIndex];
        
        // Glitch effect on status change
        loadingStatus.style.animation = 'none';
        loadingStatus.offsetHeight;
        loadingStatus.style.animation = 'statusGlitch 0.3s';
        setTimeout(() => {
          loadingStatus.style.animation = 'statusGlitch 3s infinite';
        }, 300);
      }
    }
  }, 100);
  
  // Disable scrolling while loading
  document.body.style.overflow = 'hidden';
}

// Create floating particles
function createLoadingParticles() {
  const container = document.getElementById('loadingParticles');
  if (!container) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'loading-particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random color - purple theme
    if (Math.random() > 0.5) {
      particle.style.background = '#a463f5';
      particle.style.boxShadow = '0 0 10px #a463f5, 0 0 20px #a463f5';
    } else {
      particle.style.background = '#6c5ce7';
      particle.style.boxShadow = '0 0 10px #6c5ce7, 0 0 20px #6c5ce7';
    }
    
    container.appendChild(particle);
  }
}

// Create binary rain effect
function createBinaryRain() {
  const container = document.getElementById('binaryRain');
  if (!container) return;
  
  // Clear existing
  container.innerHTML = '';
  
  const columnCount = Math.floor(window.innerWidth / 30);
  
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement('div');
    column.className = 'binary-column';
    
    // Random position
    column.style.left = (i * 30) + 'px';
    column.style.animationDuration = (Math.random() * 5 + 3) + 's';
    column.style.animationDelay = Math.random() * 5 + 's';
    
    // Generate random binary string
    let binaryString = '';
    const length = Math.floor(Math.random() * 10 + 5);
    for (let j = 0; j < length; j++) {
      binaryString += Math.random() > 0.5 ? '1' : '0';
      binaryString += '<br>';
    }
    
    column.innerHTML = binaryString;
    column.style.color = 'rgba(108, 92, 231, 0.3)';
    container.appendChild(column);
  }
}

// ===== 3D HOLOGRAM EFFECT WITH THREE.JS =====
function initHologramEffect() {
  // Check if THREE is available
  if (typeof THREE === 'undefined') return;
  
  const hologramContainer = document.querySelector('.hologram-container');
  if (!hologramContainer) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  
  hologramContainer.style.position = 'relative';
  hologramContainer.style.zIndex = '10';
  
  // Create floating cubes
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  
  for (let i = 0; i < 20; i++) {
    const material = new THREE.MeshBasicMaterial({ 
      color: Math.random() > 0.5 ? 0x6c5ce7 : 0xa463f5,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    
    const cube = new THREE.Mesh(geometry, material);
    
    // Random position around the hologram
    const radius = 3;
    const angle = (i / 20) * Math.PI * 2;
    cube.position.x = Math.cos(angle) * radius;
    cube.position.z = Math.sin(angle) * radius;
    cube.position.y = (Math.random() - 0.5) * 2;
    
    // Animation properties
    cube.userData = {
      speed: 0.01 + Math.random() * 0.02,
      angle: angle,
      radius: radius,
      yOffset: cube.position.y
    };
    
    scene.add(cube);
  }
  
  camera.position.z = 5;
  
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate cubes
    scene.children.forEach(cube => {
      if (cube.isMesh) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.02;
        
        // Orbit animation
        cube.userData.angle += cube.userData.speed;
        cube.position.x = Math.cos(cube.userData.angle) * cube.userData.radius;
        cube.position.z = Math.sin(cube.userData.angle) * cube.userData.radius;
        cube.position.y = cube.userData.yOffset + Math.sin(Date.now() * 0.001) * 0.5;
      }
    });
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Add canvas to hologram container
  const canvas = renderer.domElement;
  canvas.style.position = 'absolute';
  canvas.style.top = '50%';
  canvas.style.left = '50%';
  canvas.style.transform = 'translate(-50%, -50%)';
  canvas.style.width = '400px';
  canvas.style.height = '400px';
  canvas.style.pointerEvents = 'none';
  
  hologramContainer.appendChild(canvas);
}

// ===== GLITCH TEXT EFFECT =====
function glitchText(element, text) {
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  let interval = setInterval(() => {
    let newText = '';
    for (let i = 0; i < text.length; i++) {
      if (Math.random() < 0.1) {
        newText += chars[Math.floor(Math.random() * chars.length)];
      } else {
        newText += text[i];
      }
    }
    element.textContent = newText;
  }, 50);
  
  setTimeout(() => {
    clearInterval(interval);
    element.textContent = text;
  }, 500);
}

// ===== CUSTOM CURSOR =====
function initCursor() {
    const cursorGlow = document.getElementById('cursorGlow');
    const cursorDot = document.getElementById('cursorDot');
    
    if (!cursorGlow || !cursorDot) return;
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .project-card, .skill-tag, .exp-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
        });
    });
}

// ===== 3D PARTICLES =====
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas || typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
        
        // Purple/blue color scheme
        colors[i] = 0.4 + Math.random() * 0.4; // R
        colors[i + 1] = 0.2 + Math.random() * 0.3; // G (low for purple)
        colors[i + 2] = 0.8 + Math.random() * 0.2; // B (high for purple)
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 30;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
        
        particles.rotation.y += mouseX * 0.0005;
        particles.rotation.x += mouseY * 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar || !menuToggle || !navMenu) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }
}

// ===== TYPEWRITER =====
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;
    
    const words = ['Web Developer', 'UI/UX Designer', 'Creative Technologist', 'Problem Solver', 'Designer Graphic', 'Bot Automation'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    type();
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    // Continuous code typing effect on computer screen
    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length > 0) {
        let currentLine = 0;
        
        function animateCode() {
            codeLines.forEach(line => {
                line.style.animation = 'none';
                line.offsetHeight;
                line.style.animation = null;
            });
            
            currentLine = (currentLine + 1) % codeLines.length;
        }
        
        setInterval(animateCode, 3000);
    }
    
    // Mouse move parallax effect for computer (only on desktop)
    const computer = document.querySelector('.floating-computer');
    if (computer && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            
            computer.style.transform = `translate(-50%, -50%) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            computer.style.transform = 'translate(-50%, -50%) rotateY(0) rotateX(0)';
        });
    }
}

// ===== COUNTERS =====
function initCounters() {
    const yearsExp = document.getElementById('yearsExp');
    const projectsDone = document.getElementById('projectsDone');
    const clientsServed = document.getElementById('clientsServed');
    
    if (!yearsExp || !projectsDone || !clientsServed) return;
    
    const counters = [
        { element: yearsExp, target: 4, duration: 2000 },
        { element: projectsDone, target: 15, duration: 2000 },
        { element: clientsServed, target: 8, duration: 2000 }
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter.element, counter.target, counter.duration);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.image-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ===== SKILLS ANIMATION =====
function initSkills() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== EXPERIENCE MODAL =====
// Data untuk modal
const experienceData = {
  galaxy: {
    company: 'PT. Galaxy Digital Niaga',
    period: 'Feb 2024 - Now',
    icon: 'fa-video',
    jobdesc: [
      'Membuat dan mengedit konten video untuk social media dan marketplace',
      'Mengatur jadwal posting konten di berbagai platform',
      'Mendesain asset visual untuk campaign marketing',
      'Meningkatkan engagement melalui strategi visual yang konsisten',
      'Berkolaborasi dengan tim marketing untuk konsep konten'
    ],
    achievements: [
      'Meningkatkan engagement rate sebesar 45% dalam 6 bulan',
      'Mencapai 1 juta views untuk video campaign product launch',
      'Memenangkan award internal untuk best creative content'
    ],
    skills: ['Adobe Premiere', 'After Effects', 'Photoshop', 'Content Strategy', 'Analytics']
  },
  
  wijaya: {
    company: 'Wijaya Group',
    period: 'July 2023 - Feb 2024',
    icon: 'fa-chart-line',
    jobdesc: [
      'Mengelola campaign digital marketing di berbagai platform',
      'Membuat konsep konten yang engaging untuk social media',
      'Menganalisis performa campaign dan memberikan rekomendasi',
      'Berkolaborasi dengan tim creative untuk produksi konten',
      'Mengelola budget iklan dan optimasi ROAS'
    ],
    achievements: [
      'Meningkatkan followers Instagram sebesar 200% dalam 6 bulan',
      'Menurunkan cost per lead hingga 35%',
      'Memenangkan 3 proyek klien besar berkat strategi marketing'
    ],
    skills: ['Meta Ads', 'Google Analytics', 'Content Strategy', 'Copywriting', 'SEO']
  },
  
  beanbag: {
    company: 'Beanbagkit',
    period: 'May 2022 - June 2023',
    icon: 'fa-shopping-cart',
    jobdesc: [
      'Mendesain visual produk untuk e-commerce',
      'Mengelola listing produk di Shopee, Tokopedia, dan TikTok Shop',
      'Mengoptimalkan deskripsi dan foto produk untuk konversi',
      'Menangani operasional e-commerce termasuk packing dan pengiriman',
      'Merespon chat dan pertanyaan customer'
    ],
    achievements: [
      'Meningkatkan rating toko dari 4.2 menjadi 4.8',
      'Mencapai penjualan tertinggi di bulan pertama launch',
      'Mengurangi waktu respon customer dari 2 jam menjadi 30 menit'
    ],
    skills: ['Photoshop', 'Illustrator', 'Shopee', 'Tokopedia', 'Customer Service', 'Copywriting']
  }
};

// Fungsi untuk membuka modal
function openExpModal(companyId) {
  const modal = document.getElementById('expModal');
  const data = experienceData[companyId];
  
  if (!modal || !data) return;
  
  // Set icon
  const modalIcon = document.getElementById('modalIcon');
  if (modalIcon) {
    modalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
  }
  
  // Set header
  const modalCompany = document.getElementById('modalCompany');
  const modalPeriod = document.getElementById('modalPeriod');
  if (modalCompany) modalCompany.textContent = data.company;
  if (modalPeriod) modalPeriod.textContent = data.period;
  
  // Set jobdesc
  const jobdescList = document.getElementById('modalJobdesc');
  if (jobdescList) {
    jobdescList.innerHTML = data.jobdesc.map(desc => `<li>${desc}</li>`).join('');
  }
  
  // Set achievements
  const achievementsList = document.getElementById('modalAchievements');
  if (achievementsList) {
    achievementsList.innerHTML = data.achievements.map(achievement => `<li>${achievement}</li>`).join('');
  }
  
  // Set skills
  const skillsContainer = document.getElementById('modalSkills');
  if (skillsContainer) {
    skillsContainer.innerHTML = data.skills.map(skill => `<span>${skill}</span>`).join('');
  }
  
  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  
  // Add animation to modal content
  const modalContent = modal.querySelector('.exp-modal-content');
  if (modalContent) {
    modalContent.style.animation = 'none';
    modalContent.offsetHeight; // Trigger reflow
    modalContent.style.animation = 'modalFadeIn 0.3s ease forwards';
  }
}

// Fungsi untuk menutup modal
function closeExpModal() {
  const modal = document.getElementById('expModal');
  if (!modal) return;
  
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling
}

// Tutup modal jika klik di luar content
window.addEventListener('click', (e) => {
  const modal = document.getElementById('expModal');
  if (modal && e.target === modal) {
    closeExpModal();
  }
});

// Tutup modal dengan tombol ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeExpModal();
  }
});

// ===== TOGGLE EXPERIENCE VIEW =====
function toggleExpView(view) {
  const cardsView = document.querySelector('.experience-cards');
  const timelineView = document.querySelector('.experience-timeline');
  const viewBtns = document.querySelectorAll('.view-btn');
  
  if (!cardsView || !timelineView || viewBtns.length < 2) return;
  
  if (view === 'cards') {
    cardsView.style.display = 'grid';
    timelineView.classList.remove('active');
    viewBtns[0].classList.add('active');
    viewBtns[1].classList.remove('active');
  } else {
    cardsView.style.display = 'none';
    timelineView.classList.add('active');
    viewBtns[0].classList.remove('active');
    viewBtns[1].classList.add('active');
  }
}

// ===== HOVER EFFECT UNTUK CARDS =====
document.querySelectorAll('.exp-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-15px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// ===== PROJECTS - AUTO SLIDE =====
function initProjects() {
    const projectsSliderWrapper = document.getElementById('projectsSliderWrapper');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sliderContainer = document.getElementById('projectsSliderContainer');
    
    if (!projectsSliderWrapper) return;
    
    const projects = [
        {
            category: 'web',
            title: 'AI-Powered Dashboard',
            description: 'Real-time analytics dashboard with machine learning predictions',
            image: 'https://picsum.photos/800/600?1',
            link: '#'
        },
        {
            category: 'design',
            title: 'Neon Brand Identity',
            description: 'Complete brand identity with futuristic neon aesthetics',
            image: 'https://picsum.photos/800/600?2',
            link: '#'
        },
        {
            category: 'web',
            title: 'E-commerce Platform',
            description: 'Modern e-commerce with AR product preview',
            image: 'https://picsum.photos/800/600?4',
            link: '#'
        },
        {
            category: 'design',
            title: 'Mobile App UI',
            description: 'Futuristic mobile app interface design',
            image: 'https://picsum.photos/800/600?5',
            link: '#'
        },
        {
            category: 'web',
            title: 'Portfolio Website',
            description: 'Personal portfolio with futuristic design',
            image: 'https://picsum.photos/800/600?7',
            link: '#'
        },
        {
            category: 'design',
            title: '3D Product Mockups',
            description: 'Photorealistic product presentations',
            image: 'https://picsum.photos/800/600?8',
            link: '#'
        },
        // Added YouTube video projects
        {
            category: 'video',
            title: '5 Rekomendasi Drone DJI Pemula 2025',
            description: 'Review dan rekomendasi drone DJI terbaik untuk pemula di tahun 2025',
            image: 'https://img.youtube.com/vi/4XvvYWIQuvs/maxresdefault.jpg',
            link: 'https://youtu.be/4XvvYWIQuvs'
        },
        {
            category: 'video',
            title: 'Canon EOS R100 vs R50 Perbandingan',
            description: '7 perbandingan utama antara Canon EOS R100 & Canon EOS R50, mana yang lebih worth it?',
            image: 'https://img.youtube.com/vi/N6sdkTQsQNA/maxresdefault.jpg',
            link: 'https://youtu.be/N6sdkTQsQNA'
        },
        {
            category: 'video',
            title: 'Rekomendasi Drone DJI Pemula',
            description: 'Video review drone DJI untuk pemula',
            image: 'https://img.youtube.com/vi/cv6qCxO2k4w/maxresdefault.jpg',
            link: 'https://youtu.be/cv6qCxO2k4w'
        },
        {
            category: 'video',
            title: 'Tips Fotografi dengan Drone',
            description: 'Tips dan trik fotografi menggunakan drone untuk pemula',
            image: 'https://img.youtube.com/vi/EMyPysLqvUs/maxresdefault.jpg',
            link: 'https://youtu.be/EMyPysLqvUs'
        },
        {
            category: 'video',
            title: 'Review Kamera Mirrorless',
            description: 'Review lengkap kamera mirrorless untuk content creator',
            image: 'https://img.youtube.com/vi/cXuw_dljE-I/maxresdefault.jpg',
            link: 'https://youtu.be/cXuw_dljE-I'
        },
        {
            category: 'video',
            title: 'Tutorial Editing Video',
            description: 'Tutorial editing video untuk pemula menggunakan software gratis',
            image: 'https://img.youtube.com/vi/EG-jmQ36A6o/maxresdefault.jpg',
            link: 'https://youtu.be/EG-jmQ36A6o'
        },
        {
            category: 'video',
            title: 'Tips Cinematic dengan Smartphone',
            description: 'Cara membuat video cinematic hanya dengan smartphone',
            image: 'https://img.youtube.com/vi/iXfu7qWlduo/maxresdefault.jpg',
            link: 'https://youtu.be/iXfu7qWlduo'
        },
        {
            category: 'video',
            title: 'Review Lensa Terbaik',
            description: 'Rekomendasi lensa terbaik untuk berbagai kebutuhan fotografi',
            image: 'https://img.youtube.com/vi/_t6mbPBlmvw/maxresdefault.jpg',
            link: 'https://youtu.be/_t6mbPBlmvw'
        },
        {
            category: 'video',
            title: 'Tips Lighting untuk Video',
            description: 'Tips lighting sederhana untuk hasil video profesional',
            image: 'https://img.youtube.com/vi/U40ANiDEoK4/maxresdefault.jpg',
            link: 'https://youtu.be/U40ANiDEoK4'
        },
        {
            category: 'video',
            title: 'Review Gimbal Stabilizer',
            description: 'Review gimbal stabilizer terbaik untuk smartphone dan kamera',
            image: 'https://img.youtube.com/vi/Sk9j9vtNYic/maxresdefault.jpg',
            link: 'https://youtu.be/Sk9j9vtNYic'
        },
        {
            category: 'video',
            title: 'Tutorial Color Grading',
            description: 'Tutorial color grading untuk video cinematic',
            image: 'https://img.youtube.com/vi/0K50fZFxFPI/maxresdefault.jpg',
            link: 'https://youtu.be/0K50fZFxFPI'
        },
        {
            category: 'video',
            title: 'Tips Vlogging untuk Pemula',
            description: 'Tips dan trik vlogging untuk pemula agar konten menarik',
            image: 'https://img.youtube.com/vi/YahgzXkpmbQ/maxresdefault.jpg',
            link: 'https://youtu.be/YahgzXkpmbQ'
        },
        {
            category: 'video',
            title: 'Review Action Camera',
            description: 'Perbandingan action camera terbaik untuk olahraga dan petualangan',
            image: 'https://img.youtube.com/vi/DjffdJMq1CE/maxresdefault.jpg',
            link: 'https://youtu.be/DjffdJMq1CE'
        },
        {
            category: 'video',
            title: 'Tutorial Audio untuk Video',
            description: 'Tips merekam audio berkualitas untuk video',
            image: 'https://img.youtube.com/vi/17Jwk-vIArs/maxresdefault.jpg',
            link: 'https://youtu.be/17Jwk-vIArs'
        },
        {
            category: 'video',
            title: 'Review Software Editing',
            description: 'Perbandingan software editing video terbaik 2025',
            image: 'https://img.youtube.com/vi/2TYPHdR2btE/maxresdefault.jpg',
            link: 'https://youtu.be/2TYPHdR2btE'
        },
        {
            category: 'video',
            title: 'Tips Fotografi Produk',
            description: 'Tips fotografi produk untuk e-commerce dengan budget terbatas',
            image: 'https://img.youtube.com/vi/PY02Pq44VGE/maxresdefault.jpg',
            link: 'https://youtu.be/PY02Pq44VGE'
        }
    ];
    
    let currentFilter = 'all';
    
    function displayProjects() {
        const filtered = currentFilter === 'all' 
            ? projects 
            : projects.filter(p => p.category === currentFilter);
        
        // Double the projects for seamless loop
        const doubledProjects = [...filtered, ...filtered];
        
        projectsSliderWrapper.innerHTML = doubledProjects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" 
                     onerror="this.src='https://picsum.photos/800/600?${Math.random()}'">
                <div class="project-overlay">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                        Watch Video <i class="fas fa-play"></i>
                    </a>
                </div>
            </div>
        `).join('');
        
        // Reset animation after filter change
        const wrapper = projectsSliderWrapper;
        wrapper.style.animation = 'none';
        wrapper.offsetHeight; // Trigger reflow
        wrapper.style.animation = 'slideAnimation 40s linear infinite';
        
        // Adjust animation duration based on number of items
        const itemCount = filtered.length;
        if (itemCount <= 3) {
            wrapper.style.animationDuration = '30s';
        } else if (itemCount <= 5) {
            wrapper.style.animationDuration = '40s';
        } else if (itemCount <= 10) {
            wrapper.style.animationDuration = '50s';
        } else {
            wrapper.style.animationDuration = '60s';
        }
    }
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                displayProjects();
            });
        });
    }
    
    // DRAG TO SLIDE functionality (for manual control)
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            sliderContainer.classList.add('dragging');
            startX = e.pageX - sliderContainer.offsetLeft;
            scrollLeft = sliderContainer.scrollLeft;
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            sliderContainer.classList.remove('dragging');
        });
        
        sliderContainer.addEventListener('mouseup', () => {
            isDragging = false;
            sliderContainer.classList.remove('dragging');
        });
        
        sliderContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - sliderContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            sliderContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        sliderContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            sliderContainer.classList.add('dragging');
            startX = e.touches[0].pageX - sliderContainer.offsetLeft;
            scrollLeft = sliderContainer.scrollLeft;
        });
        
        sliderContainer.addEventListener('touchend', () => {
            isDragging = false;
            sliderContainer.classList.remove('dragging');
        });
        
        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].pageX - sliderContainer.offsetLeft;
            const walk = (x - startX) * 2;
            sliderContainer.scrollLeft = scrollLeft - walk;
        });
    }
    
    displayProjects();
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        submitBtn.innerHTML = '<span>Sent!</span> <i class="fas fa-check"></i>';
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            form.reset();
        }, 2000);
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== AOS-LIKE ANIMATIONS =====
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease';
        observer.observe(el);
    });
}

// ===== HERO PARTICLES (Additional) =====
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(108, 92, 231, ${Math.random() * 0.3 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
}

createHeroParticles();

// ===== RESPONSIVE HANDLING =====
function handleResponsive() {
    function adjustForMobile() {
        if (window.innerWidth <= 768) {
            // Adjust animation speed for mobile
            document.querySelectorAll('.tech-icon').forEach(icon => {
                icon.style.animationDuration = '15s'; // Faster orbit on mobile
            });
        } else {
            document.querySelectorAll('.tech-icon').forEach(icon => {
                icon.style.animationDuration = '20s';
            });
        }
    }
    
    window.addEventListener('resize', adjustForMobile);
    adjustForMobile(); // Initial check
}

// ===== TOUCH DEVICE OPTIMIZATION =====
function optimizeForTouch() {
    if ('ontouchstart' in window) {
        // Disable parallax effects on touch devices
        const computer = document.querySelector('.floating-computer');
        if (computer) {
            computer.style.transform = 'translate(-50%, -50%)';
        }
        
        // Simplify animations
        document.querySelectorAll('.tech-icon').forEach(icon => {
            icon.style.animationDuration = '15s';
        });
    }
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    const binaryRain = document.getElementById('binaryRain');
    if (binaryRain) {
        binaryRain.innerHTML = '';
        createBinaryRain();
    }
});

// Add float animation to style if not exists
if (!document.querySelector('style[data-float]')) {
    const style = document.createElement('style');
    style.setAttribute('data-float', 'true');
    style.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(120deg); }
            66% { transform: translate(-30px, 30px) rotate(240deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Set default view untuk experience timeline
document.addEventListener('DOMContentLoaded', () => {
    const timelineView = document.querySelector('.experience-timeline');
    if (timelineView) {
        timelineView.classList.remove('active');
    }
});

// Glitch effect on status text periodically
setInterval(() => {
    const status = document.getElementById('loadingStatus');
    const loadingScreen = document.getElementById('loadingScreen');
    if (status && loadingScreen && !loadingScreen.classList.contains('hidden')) {
        glitchText(status, status.textContent);
    }
}, 3000);