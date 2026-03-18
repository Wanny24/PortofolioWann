// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initParticles();
    initNavbar();
    initTypewriter();
    initCounters();
    initSkills();
    initProjects();
    initContactForm();
    initBackToTop();
    initAOS();
});

// ===== LOADER =====
function initLoader() {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
}

// ===== CUSTOM CURSOR =====
function initCursor() {
    const cursorGlow = document.getElementById('cursorGlow');
    const cursorDot = document.getElementById('cursorDot');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('particleCanvas'), alpha: true });
    
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
        
        colors[i] = Math.random() * 0.5 + 0.5;
        colors[i + 1] = Math.random() * 0.5 + 0.5;
        colors[i + 2] = Math.random();
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

// ===== TYPEWRITER =====
function initTypewriter() {
    const words = ['Web Developer', 'UI/UX Designer', 'Creative Technologist', 'Problem Solver'];
    const typewriter = document.getElementById('typewriter');
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

// ===== COUNTERS =====
function initCounters() {
    const yearsExp = document.getElementById('yearsExp');
    const projectsDone = document.getElementById('projectsDone');
    const clientsServed = document.getElementById('clientsServed');
    
    const counters = [
        { element: yearsExp, target: 2, duration: 2000 },
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
    
    observer.observe(document.querySelector('.image-stats'));
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
  
  if (!data) return;
  
  // Set icon
  const modalIcon = document.getElementById('modalIcon');
  modalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
  
  // Set header
  document.getElementById('modalCompany').textContent = data.company;
  document.getElementById('modalPeriod').textContent = data.period;
  
  // Set jobdesc
  const jobdescList = document.getElementById('modalJobdesc');
  jobdescList.innerHTML = data.jobdesc.map(desc => `<li>${desc}</li>`).join('');
  
  // Set achievements
  const achievementsList = document.getElementById('modalAchievements');
  achievementsList.innerHTML = data.achievements.map(achievement => `<li>${achievement}</li>`).join('');
  
  // Set skills
  const skillsContainer = document.getElementById('modalSkills');
  skillsContainer.innerHTML = data.skills.map(skill => `<span>${skill}</span>`).join('');
  
  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  
  // Add animation to modal content
  const modalContent = modal.querySelector('.exp-modal-content');
  modalContent.style.animation = 'none';
  modalContent.offsetHeight; // Trigger reflow
  modalContent.style.animation = 'modalFadeIn 0.3s ease forwards';
}

// Fungsi untuk menutup modal
function closeExpModal() {
  const modal = document.getElementById('expModal');
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling
}

// Tutup modal jika klik di luar content
window.addEventListener('click', (e) => {
  const modal = document.getElementById('expModal');
  if (e.target === modal) {
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

// ===== INITIALIZE =====
// Set default view
document.addEventListener('DOMContentLoaded', () => {
  // Timeline view dimulai sebagai hidden
  document.querySelector('.experience-timeline').classList.remove('active');
});

// ===== PROJECTS =====
function initProjects() {
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
            category: 'video',
            title: 'Product Animation Reel',
            description: '3D product animation with cinematic effects',
            image: 'https://picsum.photos/800/600?3',
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
            category: 'video',
            title: 'Motion Graphics Pack',
            description: 'Collection of futuristic motion graphics',
            image: 'https://picsum.photos/800/600?6',
            link: '#'
        }
    ];
    
    const projectsGrid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentFilter = 'all';
    let visibleProjects = 3;
    
    function displayProjects() {
        const filtered = currentFilter === 'all' 
            ? projects 
            : projects.filter(p => p.category === currentFilter);
        
        const toShow = filtered.slice(0, visibleProjects);
        
        projectsGrid.innerHTML = toShow.map(project => `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <a href="${project.link}" class="project-link">
                        View Project <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `).join('');
        
        loadMoreBtn.style.display = filtered.length > visibleProjects ? 'inline-flex' : 'none';
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            visibleProjects = 3;
            displayProjects();
        });
    });
    
    loadMoreBtn.addEventListener('click', () => {
        visibleProjects += 3;
        displayProjects();
    });
    
    displayProjects();
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
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
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 255, 255, ${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
}

createHeroParticles();

// Add float animation to style
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(30px, -30px) rotate(120deg); }
        66% { transform: translate(-30px, 30px) rotate(240deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
    }
`;
document.head.appendChild(style);