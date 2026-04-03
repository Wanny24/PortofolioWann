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
    // No theme toggle needed
});

// ===== FUTURISTIC LOADING SCREEN =====
function initFuturisticLoader() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingProgress = document.getElementById('loadingProgress');
  const loadingPercentage = document.getElementById('loadingPercentage');
  const loadingStatus = document.getElementById('loadingStatus');
  
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
  
  createLoadingParticles();
  createBinaryRain();
  
  const interval = setInterval(() => {
    progress += Math.random() * 3 + 1;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (loadingStatus) loadingStatus.textContent = 'SYSTEM READY';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
      }, 1000);
    }
    
    if (loadingProgress) loadingProgress.style.width = progress + '%';
    if (loadingPercentage) loadingPercentage.textContent = Math.floor(progress) + '%';
    
    if (progress > (messageIndex + 1) * 12.5) {
      messageIndex++;
      if (messageIndex < statusMessages.length && loadingStatus) {
        loadingStatus.textContent = statusMessages[messageIndex];
        loadingStatus.style.animation = 'none';
        loadingStatus.offsetHeight;
        loadingStatus.style.animation = 'statusGlitch 0.3s';
        setTimeout(() => {
          loadingStatus.style.animation = 'statusGlitch 3s infinite';
        }, 300);
      }
    }
  }, 100);
  
  document.body.style.overflow = 'hidden';
}

function createLoadingParticles() {
  const container = document.getElementById('loadingParticles');
  if (!container) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'loading-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
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

function createBinaryRain() {
  const container = document.getElementById('binaryRain');
  if (!container) return;
  container.innerHTML = '';
  const columnCount = Math.floor(window.innerWidth / 30);
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement('div');
    column.className = 'binary-column';
    column.style.left = (i * 30) + 'px';
    column.style.animationDuration = (Math.random() * 5 + 3) + 's';
    column.style.animationDelay = Math.random() * 5 + 's';
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

// ===== 3D HOLOGRAM EFFECT =====
function initHologramEffect() {
  if (typeof THREE === 'undefined') return;
  const hologramContainer = document.querySelector('.hologram-container');
  if (!hologramContainer) return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(400, 400);
  renderer.setClearColor(0x000000, 0);
  
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  for (let i = 0; i < 20; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0x6c5ce7 : 0xa463f5,
      transparent: true, opacity: 0.3, wireframe: true
    });
    const cube = new THREE.Mesh(geometry, material);
    const radius = 3;
    const angle = (i / 20) * Math.PI * 2;
    cube.position.x = Math.cos(angle) * radius;
    cube.position.z = Math.sin(angle) * radius;
    cube.position.y = (Math.random() - 0.5) * 2;
    cube.userData = { speed: 0.01 + Math.random() * 0.02, angle, radius, yOffset: cube.position.y };
    scene.add(cube);
  }
  camera.position.z = 5;
  
  function animate() {
    requestAnimationFrame(animate);
    scene.children.forEach(cube => {
      if (cube.isMesh) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.02;
        cube.userData.angle += cube.userData.speed;
        cube.position.x = Math.cos(cube.userData.angle) * cube.userData.radius;
        cube.position.z = Math.sin(cube.userData.angle) * cube.userData.radius;
        cube.position.y = cube.userData.yOffset + Math.sin(Date.now() * 0.001) * 0.5;
      }
    });
    renderer.render(scene, camera);
  }
  animate();
  
  const canvas = renderer.domElement;
  canvas.style.position = 'absolute';
  canvas.style.top = '50%'; canvas.style.left = '50%';
  canvas.style.transform = 'translate(-50%, -50%)';
  canvas.style.width = '400px'; canvas.style.height = '400px';
  canvas.style.pointerEvents = 'none';
  hologramContainer.appendChild(canvas);
}

function glitchText(element, text) {
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let interval = setInterval(() => {
    let newText = '';
    for (let i = 0; i < text.length; i++) {
      newText += Math.random() < 0.1 ? chars[Math.floor(Math.random() * chars.length)] : text[i];
    }
    element.textContent = newText;
  }, 50);
  setTimeout(() => { clearInterval(interval); element.textContent = text; }, 500);
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
    
    document.querySelectorAll('a, button, .project-card, .skill-icon-item, .exp-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorDot.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorDot.classList.remove('hover'));
    });
}

// ===== 3D PARTICLES =====
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas || typeof THREE === 'undefined') return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
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
        colors[i] = 0.4 + Math.random() * 0.4;
        colors[i + 1] = 0.2 + Math.random() * 0.3;
        colors[i + 2] = 0.8 + Math.random() * 0.2;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.1, vertexColors: true, transparent: true, opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 30;
    
    let mouseX = 0, mouseY = 0;
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
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
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
    // Theme toggle removed
}

// ===== TYPEWRITER =====
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;
    
    const words = ['Web Developer', 'UI/UX Designer', 'Creative Technologist', 'Problem Solver', 'Graphic Designer', 'Bot Automation'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        typewriter.textContent = isDeleting ?
            currentWord.substring(0, charIndex - 1) :
            currentWord.substring(0, charIndex + 1);
        isDeleting ? charIndex-- : charIndex++;
        
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
    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length > 0) {
        setInterval(() => {
            codeLines.forEach(line => {
                line.style.animation = 'none';
                line.offsetHeight;
                line.style.animation = null;
            });
        }, 3000);
    }
    
    const computer = document.querySelector('.floating-computer');
    if (computer && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            computer.style.transform = `translate(-50%, -50%) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
        });
        document.addEventListener('mouseleave', () => {
            computer.style.transform = 'translate(-50%, -50%) rotateY(0) rotateX(0)';
        });
    }
}

// ===== COUNTERS =====
function initCounters() {
    const elements = {
        yearsExp: { el: document.getElementById('yearsExp'), target: 4 },
        projectsDone: { el: document.getElementById('projectsDone'), target: 15 },
        clientsServed: { el: document.getElementById('clientsServed'), target: 8 }
    };
    
    if (!elements.yearsExp.el) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Object.values(elements).forEach(({ el, target }) => {
                    animateCounter(el, target, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.image-stats');
    if (statsSection) observer.observe(statsSection);
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

// ===== SKILLS - REVAMPED =====
function initSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    // Updated skill data
    const programmingSkills = [
        { icon: 'fab fa-html5', label: 'HTML5', color: '#E34F26' },
        { icon: 'fab fa-css3-alt', label: 'CSS / Tailwind', color: '#1572B6' },
        { icon: 'fab fa-js', label: 'JavaScript', color: '#F7DF1E' },
        { icon: 'fab fa-laravel', label: 'Laravel', color: '#FF2D20' },
        { icon: 'fab fa-php', label: 'PHP', color: '#777BB4' },
        { icon: 'fab fa-python', label: 'Python', color: '#3776AB' },
        { icon: 'fas fa-database', label: 'MySQL', color: '#4479A1' },
        { icon: 'fab fa-android', label: 'Kotlin', color: '#7F52FF' }
    ];

    const designSkills = [
        { svgIcon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 7.377C0 3.303 3.28 0 7.377 0h9.246C20.72 0 24 3.303 24 7.377v9.246C24 20.72 20.697 24 16.623 24H7.377C3.303 24 0 20.72 0 16.623V7.377zm14.768 2.045c.678 0 1.228-.55 1.228-1.228S15.446 7 14.768 7c-.677 0-1.227.55-1.227 1.228s.55 1.194 1.227 1.194zm-5.59 0c.677 0 1.227-.55 1.227-1.228S9.855 7 9.178 7C8.5 7 7.95 7.55 7.95 8.228s.55 1.194 1.228 1.194zm2.795 8.954c2.626 0 4.617-1.472 5.16-3.63H6.81c.543 2.158 2.534 3.63 5.163 3.63z"/></svg>`, label: 'Photoshop', color: '#31A8FF' },
        { svgIcon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.169 0H4.645A4.645 4.645 0 0 0 0 4.645v14.71A4.645 4.645 0 0 0 4.645 24h7.006l-2.275-3.64V0H9.169zm5.662 0h-2.207v20.36L14.831 24H19.355A4.645 4.645 0 0 0 24 19.355V9.169L13.693 0h1.138z"/></svg>`, label: 'Premiere Pro', color: '#9999FF' },
        { svgIcon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 4.5h1v7.5H12v-7.5zm0 9h1v1h-1v-1zM8 12c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z"/></svg>`, label: 'CapCut', color: '#00D4AA' },
        { svgIcon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 3.002C24 1.346 22.654 0 21 0H3C1.346 0 0 1.346 0 3.002v17.996C0 22.654 1.346 24 3 24h18c1.654 0 3-1.346 3-2.002V3.002zM11.453 15.8H7.46V7.71h2.325v6.358h1.668v1.732zm1.095-8.09a1.322 1.322 0 1 1 0 2.644 1.322 1.322 0 0 1 0-2.644zm-.963 8.09V9.713h1.926V15.8h-1.926zm4.155 0h-1.925V7.41h1.925V15.8z"/></svg>`, label: 'Canva', color: '#00C4CC' },
        { icon: 'fab fa-figma', label: 'Figma', color: '#F24E1E' },
        { svgIcon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.992.006 2.008 2.99 0 4.997v14.006l2.008 2.008L4.992 24l4.996-4.997H4.992V4.997h4.996L4.992.006zm14.016 0-4.996 4.991h4.996v14.006h-4.996L19.008 24l2.984-2.989L24 19.003V4.997l-2.008-2.008L19.008.006z"/></svg>`, label: 'Illustrator', color: '#FF9A00' },
        { svgIcon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.063 0C2.261 0 0 2.261 0 5.063v13.874C0 21.738 2.261 24 5.063 24h13.874C21.738 24 24 21.739 24 18.937V5.063C24 2.262 21.738 0 18.937 0H5.063zm1.9 4.782h1.8v7.85h2.194v1.832H6.963V4.782zm9.274 0h2.19l-2.746 5.044 2.84 4.638h-2.243L14.2 10.62l-1.887 3.844h-2.195l2.888-4.638L10.4 4.782h2.243l1.7 3.514 1.894-3.514z"/></svg>`, label: 'After Effects', color: '#9999FF' }
    ];

    // Build HTML
    skillsContainer.innerHTML = `
        <div class="skill-category">
            <h4>Pemrograman</h4>
            <div class="skill-icons" id="programmingIcons"></div>
        </div>
        <div class="skill-category">
            <h4>Desain</h4>
            <div class="skill-icons" id="designIcons"></div>
        </div>
    `;

    function buildSkillIcons(skills, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        skills.forEach((skill, i) => {
            const item = document.createElement('div');
            item.className = 'skill-icon-item';
            item.style.animationDelay = (i * 0.05) + 's';

            let iconHTML = '';
            if (skill.svgIcon) {
                iconHTML = `<span class="skill-svg" style="color:${skill.color}">${skill.svgIcon}</span>`;
            } else {
                iconHTML = `<i class="${skill.icon}" style="color:${skill.color}"></i>`;
            }

            item.innerHTML = `${iconHTML}<span class="skill-label">${skill.label}</span>`;

            // Hover color effect
            item.addEventListener('mouseenter', () => {
                item.style.borderColor = skill.color;
                item.style.boxShadow = `0 10px 30px ${skill.color}40, 0 0 0 1px ${skill.color}60`;
            });
            item.addEventListener('mouseleave', () => {
                item.style.borderColor = '';
                item.style.boxShadow = '';
            });

            container.appendChild(item);
        });
    }

    buildSkillIcons(programmingSkills, 'programmingIcons');
    buildSkillIcons(designSkills, 'designIcons');

    // Animate skill icons on scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-icon-item').forEach((item, i) => {
                    item.style.animationDelay = (i * 0.06) + 's';
                    item.style.animation = `skillAppear 0.5s ease ${i * 0.06}s backwards`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-icons').forEach(el => observer.observe(el));
}

// ===== EXPERIENCE MODAL =====
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

function openExpModal(companyId) {
  const modal = document.getElementById('expModal');
  const data = experienceData[companyId];
  if (!modal || !data) return;
  
  document.getElementById('modalIcon').innerHTML = `<i class="fas ${data.icon}"></i>`;
  document.getElementById('modalCompany').textContent = data.company;
  document.getElementById('modalPeriod').textContent = data.period;
  document.getElementById('modalJobdesc').innerHTML = data.jobdesc.map(d => `<li>${d}</li>`).join('');
  document.getElementById('modalAchievements').innerHTML = data.achievements.map(a => `<li>${a}</li>`).join('');
  document.getElementById('modalSkills').innerHTML = data.skills.map(s => `<span>${s}</span>`).join('');
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  const modalContent = modal.querySelector('.exp-modal-content');
  if (modalContent) {
    modalContent.style.animation = 'none';
    modalContent.offsetHeight;
    modalContent.style.animation = 'modalFadeIn 0.3s ease forwards';
  }
}

function closeExpModal() {
  const modal = document.getElementById('expModal');
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('expModal');
  if (modal && e.target === modal) closeExpModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeExpModal();
});

function toggleExpView(view) {
  const cardsView = document.querySelector('.experience-cards');
  const timelineView = document.querySelector('.experience-timeline');
  const viewBtns = document.querySelectorAll('.view-btn');
  if (!cardsView || !timelineView) return;
  
  if (view === 'cards') {
    cardsView.style.display = 'grid';
    timelineView.classList.remove('active');
    viewBtns[0]?.classList.add('active');
    viewBtns[1]?.classList.remove('active');
  } else {
    cardsView.style.display = 'none';
    timelineView.classList.add('active');
    viewBtns[0]?.classList.remove('active');
    viewBtns[1]?.classList.add('active');
  }
}

document.querySelectorAll('.exp-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return;
    const rect = card.getBoundingClientRect();
    const angleX = (e.clientY - rect.top - rect.height / 2) / 20;
    const angleY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-15px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// ===== PROJECTS - with web screenshots =====
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const showAllBtn = document.getElementById('showAllProjectsBtn');
    if (!projectsGrid) return;
    
    // Helper: get screenshot URL for a website
    function siteScreenshot(url) {
        // Use a public screenshot API
        return `https://api.screenshotmachine.com?key=demo&url=${encodeURIComponent(url)}&dimension=1024x576&format=jpg&cacheLimit=0`;
    }

    const allProjects = [
        // Web Dev Projects - with real screenshots
        {
            category: 'web',
            title: 'Brainsidea Store',
            description: 'Website toko online brainsidea.store — platform e-commerce modern dengan desain clean dan pengalaman belanja yang nyaman.',
            image: `https://image.thum.io/get/width/800/crop/450/https://brainsidea.store`,
            link: 'https://brainsidea.store'
        },
        {
            category: 'web',
            title: 'Kala Creative',
            description: 'Website kreatif kalacreative.my.id — portofolio dan layanan desain kreatif dengan tampilan futuristik.',
            image: `https://image.thum.io/get/width/800/crop/450/https://kalacreative.my.id`,
            link: 'https://kalacreative.my.id'
        },
        {
            category: 'web',
            title: 'Portfolio Website',
            description: 'Personal portfolio dengan desain futuristik, animasi 3D, dan UI modern.',
            image: 'https://picsum.photos/800/450?random=1',
            link: '#'
        },
        {
            category: 'web',
            title: 'Task Management App',
            description: 'Collaborative task management dengan real-time updates dan UI yang intuitif.',
            image: 'https://picsum.photos/800/450?random=2',
            link: '#'
        },
        {
            category: 'web',
            title: 'Social Media Analytics',
            description: 'Dashboard analitik social media dengan visualisasi data yang interaktif.',
            image: 'https://picsum.photos/800/450?random=3',
            link: '#'
        },
        
        // UI/UX Design Projects
        {
            category: 'design',
            title: 'Neon Brand Identity',
            description: 'Complete brand identity dengan futuristic neon aesthetics untuk startup teknologi.',
            image: 'https://picsum.photos/800/450?random=10',
            link: '#'
        },
        {
            category: 'design',
            title: 'Mobile App UI',
            description: 'Futuristic mobile app interface design — UX research sampai hi-fi prototype.',
            image: 'https://picsum.photos/800/450?random=11',
            link: '#'
        },
        {
            category: 'design',
            title: '3D Product Mockups',
            description: 'Photorealistic product presentations untuk kampanye marketing e-commerce.',
            image: 'https://picsum.photos/800/450?random=12',
            link: '#'
        },
        {
            category: 'design',
            title: 'Dashboard UI Kit',
            description: 'Complete UI kit untuk modern dashboards dengan dark mode dan komponen lengkap.',
            image: 'https://picsum.photos/800/450?random=13',
            link: '#'
        },
        {
            category: 'design',
            title: 'Landing Page Design',
            description: 'High-converting landing page design dengan conversion rate optimization.',
            image: 'https://picsum.photos/800/450?random=14',
            link: '#'
        },
        
        // Video Production Projects
        {
            category: 'video',
            title: '6 Rekomendasi Kamera Mirrorless Pemula Terbaik 2024',
            description: 'Review dan rekomendasi Mirrorless terbaik untuk pemula di tahun 2024',
            image: 'https://img.youtube.com/vi/PY02Pq44VGE/maxresdefault.jpg',
            link: 'https://youtu.be/PY02Pq44VGE'
        },
        {
            category: 'video',
            title: 'INI KAMERA 360 PALING MURAH?! | Review Lengkap Akaso 360 Indonesia',
            description: 'Review Paling Lengkap Akaso 360 Indonesia',
            image: 'https://img.youtube.com/vi/U40ANiDEoK4/maxresdefault.jpg',
            link: 'https://youtu.be/U40ANiDEoK4'
        },
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
            description: '7 perbandingan utama antara Canon EOS R100 & Canon EOS R50',
            image: 'https://img.youtube.com/vi/N6sdkTQsQNA/maxresdefault.jpg',
            link: 'https://youtu.be/N6sdkTQsQNA'
        },
        {
            category: 'video',
            title: 'UPGRADE NYA BANYAK BANGET NIH KAMERA?! | Review Fujifilm X T30 III Indonesia',
            description: 'Review Paling Lengkap Fujifilm X T30 III Indonesia',
            image: 'https://img.youtube.com/vi/cv6qCxO2k4w/maxresdefault.jpg',
            link: 'https://youtu.be/cv6qCxO2k4w'
        },
        {
            category: 'video',
            title: 'KAMERA TERBAIK STREET FOTOGRAFI SAAT INI?! | Review Ricoh GR IV HDF Indonesia',
            description: 'Review Lengkap Ricoh GR IV HDF Indonesia',
            image: 'https://img.youtube.com/vi/EMyPysLqvUs/maxresdefault.jpg',
            link: 'https://youtu.be/EMyPysLqvUs'
        },
        {
            category: 'video',
            title: '8 Rekomendasi Kamera Mirrorless Terbaik 2026',
            description: 'Review dan rekomendasi Mirrorless terbaik untuk pemula di tahun 2026',
            image: 'https://img.youtube.com/vi/cXuw_dljE-I/maxresdefault.jpg',
            link: 'https://youtu.be/cXuw_dljE-I'
        },
        {
            category: 'video',
            title: 'KAMERA INSTAX TERBARU INI BISA REKAM VIDEO?! | Review Instax Mini Evo Cinema Indonesia',
            description: 'Review Instax Mini Evo Cinema Indonesia',
            image: 'https://img.youtube.com/vi/EG-jmQ36A6o/maxresdefault.jpg',
            link: 'https://youtu.be/EG-jmQ36A6o'
        },
        {
            category: 'video',
            title: 'INI KAMERA FUJIFILM YANG LAGI BANYAK DICARI?! | Review Lengkap Fujifilm X-E5 Indonesia',
            description: 'Review Lengkap Fujifilm X-E5 Indonesia',
            image: 'https://img.youtube.com/vi/_t6mbPBlmvw/maxresdefault.jpg',
            link: 'https://youtu.be/_t6mbPBlmvw'
        },
        
        // Bot Automation Projects
        {
            category: 'bot',
            title: 'WhatsApp Bot Assistant',
            description: 'Automated WhatsApp bot untuk customer service dengan AI response.',
            image: 'https://picsum.photos/800/450?random=20',
            link: '#'
        },
        {
            category: 'bot',
            title: 'Telegram Crypto Trader',
            description: 'Telegram bot untuk sinyal trading cryptocurrency real-time.',
            image: 'https://picsum.photos/800/450?random=21',
            link: '#'
        },
        {
            category: 'bot',
            title: 'Discord Moderation Bot',
            description: 'Advanced moderation bot untuk Discord servers dengan auto-filter.',
            image: 'https://picsum.photos/800/450?random=22',
            link: '#'
        },
        {
            category: 'bot',
            title: 'Instagram Auto-Comment Bot',
            description: 'Automated engagement bot untuk Instagram dengan smart targeting.',
            image: 'https://picsum.photos/800/450?random=23',
            link: '#'
        },
        {
            category: 'bot',
            title: 'Twitter Sentiment Analyzer',
            description: 'Bot analisis sentimen Twitter secara real-time dengan ML.',
            image: 'https://picsum.photos/800/450?random=24',
            link: '#'
        },
        {
            category: 'bot',
            title: 'Slack Notification Bot',
            description: 'Automated Slack notifications untuk update tim secara otomatis.',
            image: 'https://picsum.photos/800/450?random=25',
            link: '#'
        }
    ];
    
    function getBestProjectsByCategory(category) {
        return allProjects.filter(p => p.category === category).slice(0, 3);
    }
    
    function getBestAllProjects() {
        const categories = ['web', 'design', 'video', 'bot'];
        const result = [];
        let index = 0;
        while (result.length < 3 && index < 20) {
            const cat = categories[index % categories.length];
            const available = allProjects.filter(p => p.category === cat && !result.includes(p))[0];
            if (available) result.push(available);
            index++;
        }
        return result;
    }
    
    let currentFilter = 'all';
    
    function getCategoryName(category) {
        return { web: 'Web Development', design: 'UI/UX Design', video: 'Video Production', bot: 'Bot Automation' }[category] || category;
    }
    
    function displayProjects() {
        const projectsToShow = currentFilter === 'all' ? getBestAllProjects() : getBestProjectsByCategory(currentFilter);
        
        if (projectsToShow.length === 0) {
            projectsGrid.innerHTML = `<div class="no-projects"><i class="fas fa-folder-open"></i><p>No projects found.</p></div>`;
            return;
        }
        
        projectsGrid.innerHTML = projectsToShow.map(project => `
            <div class="project-card" data-category="${project.category}" onclick="window.open('${project.link}', '_blank')">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy"
                         onerror="this.src='https://picsum.photos/800/450?random=${Math.floor(Math.random()*100)}'">
                    <div class="project-overlay-hover">
                        <div class="project-play-btn">
                            <i class="fas ${project.category === 'video' ? 'fa-play' : 'fa-external-link-alt'}"></i>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <span class="project-category">${getCategoryName(project.category)}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation()">
                        ${project.category === 'video' ? 'Watch Video' : 'View Project'} <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `).join('');

        // Update slider dots on mobile
        updateSliderDots(projectsToShow.length);
    }

    // Slider dots for mobile
    function updateSliderDots(count) {
        let dotsContainer = document.querySelector('.slider-dots');
        if (!dotsContainer) {
            dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            projectsGrid.parentElement.insertBefore(dotsContainer, projectsGrid.nextSibling);
        }
        dotsContainer.innerHTML = Array.from({length: count}, (_, i) =>
            `<div class="slider-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`
        ).join('');

        // Scroll sync
        let scrollTimer;
        projectsGrid.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                const cards = projectsGrid.querySelectorAll('.project-card');
                const scrollLeft = projectsGrid.scrollLeft;
                let closest = 0;
                let minDist = Infinity;
                cards.forEach((card, i) => {
                    const dist = Math.abs(card.offsetLeft - scrollLeft);
                    if (dist < minDist) { minDist = dist; closest = i; }
                });
                dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === closest);
                });
            }, 50);
        });

        // Dot click to scroll
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const cards = projectsGrid.querySelectorAll('.project-card');
                if (cards[i]) {
                    projectsGrid.scrollTo({ left: cards[i].offsetLeft - 20, behavior: 'smooth' });
                }
            });
        });
    }
    
    // Swipe hint
    const swipeHint = document.createElement('div');
    swipeHint.className = 'swipe-hint';
    swipeHint.innerHTML = `Swipe <i class="fas fa-chevron-right"></i>`;
    projectsGrid.parentElement.insertBefore(swipeHint, projectsGrid);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            displayProjects();
            // Reset scroll
            projectsGrid.scrollLeft = 0;
        });
    });
    
    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            const orig = showAllBtn.innerHTML;
            showAllBtn.innerHTML = '<span>Loading...</span> <i class="fas fa-spinner fa-spin"></i>';
            showAllBtn.disabled = true;
            setTimeout(() => {
                window.open('projects.html', '_blank');
                showAllBtn.innerHTML = orig;
                showAllBtn.disabled = false;
            }, 500);
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
    window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 500));
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
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

// ===== HERO PARTICLES =====
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position:absolute; border-radius:50%;
            width:${Math.random() * 5}px; height:${Math.random() * 5}px;
            background:rgba(108,92,231,${Math.random() * 0.3 + 0.1});
            left:${Math.random() * 100}%; top:${Math.random() * 100}%;
            animation:float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay:${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}
createHeroParticles();

// ===== RESPONSIVE HANDLING =====
function handleResponsive() {
    function adjustForMobile() {
        const duration = window.innerWidth <= 768 ? '15s' : '20s';
        document.querySelectorAll('.tech-icon').forEach(icon => {
            icon.style.animationDuration = duration;
        });
    }
    window.addEventListener('resize', adjustForMobile);
    adjustForMobile();
}

// ===== TOUCH OPTIMIZATION =====
function optimizeForTouch() {
    if (!('ontouchstart' in window)) return;
    
    const computer = document.querySelector('.floating-computer');
    if (computer) computer.style.transform = 'translate(-50%, -50%)';
    
    document.querySelectorAll('.tech-icon').forEach(icon => {
        icon.style.animationDuration = '15s';
    });
    
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('touchstart', function() { this.style.transform = 'scale(0.98)'; }, { passive: true });
        card.addEventListener('touchend', function() { this.style.transform = ''; });
    });
}

// ===== RESIZE =====
window.addEventListener('resize', () => {
    const binaryRain = document.getElementById('binaryRain');
    if (binaryRain) { binaryRain.innerHTML = ''; createBinaryRain(); }
});

// ===== FLOAT ANIMATION =====
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

// Default experience view
document.addEventListener('DOMContentLoaded', () => {
    const timelineView = document.querySelector('.experience-timeline');
    if (timelineView) timelineView.classList.remove('active');
});

// Glitch periodic
setInterval(() => {
    const status = document.getElementById('loadingStatus');
    const loadingScreen = document.getElementById('loadingScreen');
    if (status && loadingScreen && !loadingScreen.classList.contains('hidden')) {
        glitchText(status, status.textContent);
    }
}, 3000);
