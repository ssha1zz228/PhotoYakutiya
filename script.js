// ========== ПЕРЕВОД ЯЗЫКОВ ==========
const translations = { ru: {}, en: {}, sah: {} };
let currentLanguage = 'ru';

function changeLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-lang-ru], [data-lang-en], [data-lang-sah]').forEach(element => {
        const ruText = element.getAttribute('data-lang-ru');
        const enText = element.getAttribute('data-lang-en');
        const sahText = element.getAttribute('data-lang-sah');
        if (lang === 'ru' && ruText) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                if (element.placeholder !== undefined) element.placeholder = ruText;
            } else element.textContent = ruText;
        } else if (lang === 'en' && enText) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                if (element.placeholder !== undefined) element.placeholder = enText;
            } else element.textContent = enText;
        } else if (lang === 'sah' && sahText) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                if (element.placeholder !== undefined) element.placeholder = sahText;
            } else element.textContent = sahText;
        }
    });
    const langNames = { ru: 'Русский', en: 'English', sah: 'Саха тыла' };
    document.getElementById('currentLanguage').textContent = langNames[lang];
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) option.classList.add('active');
    });
    document.documentElement.lang = lang === 'sah' ? 'sah' : lang;
}

// ========== ЧАСТИЦЫ ==========
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            width: ${Math.random() * 20 + 5}px;
            height: ${Math.random() * 20 + 5}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${Math.random() * 3 + 3}s;
            background: rgba(255, 107, 107, ${Math.random() * 0.3 + 0.1});
        `;
        container.appendChild(particle);
    }
}

function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = `${(scrollTop / scrollHeight) * 100}%`;
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + target / 200);
            setTimeout(() => animateCounters(), 1);
        } else counter.innerText = target;
    });
}

function handleScrollAnimations() {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            section.querySelectorAll('.section-header h2, .section-subtitle').forEach(el => el.classList.add('animated'));
            if (section.classList.contains('stats')) animateCounters();
        }
    });
}

function handleBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.pageYOffset > 300));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========== ПОРТФОЛИО С ФОТОГРАФИЯМИ (ОБНОВЛЕНО) ==========
const portfolioItems = [
    { category: 'wedding', titleRu: 'Свадьба Анны и Дмитрия', titleEn: 'Anna and Dmitry Wedding', titleSah: 'Анна уонна Дмитрий кэргэнниир', descRu: 'Анна и Дмитрий', descEn: 'Anna and Dmitry', descSah: 'Анна уонна Дмитрий', img: 'img/AnnaDmitriy.jpg' },
    { category: 'portrait', titleRu: 'Портрет Елены', titleEn: 'Portrait of Elena', titleSah: 'Елена портрета', descRu: 'Елена', descEn: 'Elena', descSah: 'Елена', img: 'img/PortElena.jpg' },
    { category: 'family', titleRu: 'Семья Петровых', titleEn: 'Petrov Family', titleSah: 'Петровтар дьиэ кэргэннэрэ', descRu: 'Семья Петровых', descEn: 'Petrov Family', descSah: 'Петровтар дьиэ кэргэннэрэ', img: 'img/FamilyPetrov.jpg' },
    { category: 'wedding', titleRu: 'Свадебный портрет Марии и Алексея', titleEn: 'Wedding Portrait Maria and Alexey', titleSah: 'Мария уонна Алексей кэргэнниир портрета', descRu: 'Мария и Алексей', descEn: 'Maria and Alexey', descSah: 'Мария уонна Алексей', img: 'img/WeddingMaria.jpg' },
    { category: 'portrait', titleRu: 'Мужской портрет Андрея', titleEn: 'Male Portrait Andrey', titleSah: 'Андрей эр киһи портрета', descRu: 'Андрей', descEn: 'Andrey', descSah: 'Андрей', img: 'img/PortraitAndrey.jpg' },
    { category: 'commercial', titleRu: 'Коммерческая съемка для бренда', titleEn: 'Commercial Shoot for Brand', titleSah: 'Брэндээххэ эргиэн уруһуйдааһын', descRu: 'Для бренда одежды', descEn: 'For clothing brand', descSah: 'Таҥас брэндээххэ', img: 'img/CommercialBrand.jpg' }
];

const portfolioGrid = document.querySelector('.portfolio-grid');
if (portfolioGrid) {
    portfolioGrid.innerHTML = '';
    portfolioItems.forEach(item => {
        const el = document.createElement('div');
        el.className = 'portfolio-item';
        el.setAttribute('data-category', item.category);
        el.setAttribute('data-title-ru', item.titleRu);
        el.setAttribute('data-title-en', item.titleEn);
        el.setAttribute('data-title-sah', item.titleSah);
        el.setAttribute('data-desc-ru', item.descRu);
        el.setAttribute('data-desc-en', item.descEn);
        el.setAttribute('data-desc-sah', item.descSah);
        el.innerHTML = `
            <img src="${item.img}" alt="${item.titleRu}">
            <div class="portfolio-overlay">
                <h3 class="portfolio-title">${item.titleRu}</h3>
                <p class="portfolio-desc">${item.descRu}</p>
            </div>
        `;
        portfolioGrid.appendChild(el);
    });
}

function updatePortfolioLanguage(lang) {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const title = item.getAttribute(`data-title-${lang}`);
        const desc = item.getAttribute(`data-desc-${lang}`);
        if (title) item.querySelector('.portfolio-title').textContent = title;
        if (desc) item.querySelector('.portfolio-desc').textContent = desc;
    });
}

// ========== ФИЛЬТРАЦИЯ ПОРТФОЛИО ==========
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.style.display = (filter === 'all' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
        });
    });
});

// ========== ПЛАВНАЯ НАВИГАЦИЯ ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 100);
    updateScrollProgress();
    handleScrollAnimations();
});

// ========== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА ==========
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        changeLanguage(lang);
        updatePortfolioLanguage(lang);
        languageDropdown.classList.remove('show');
    });
});
languageBtn.addEventListener('click', () => languageDropdown.classList.toggle('show'));
document.addEventListener('click', (e) => {
    if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) languageDropdown.classList.remove('show');
});

// ========== ПАНЕЛЬ ДОСТУПНОСТИ ==========
const accessibilityPanel = document.getElementById('accessibilityPanel');
document.getElementById('accessibilityToggle').addEventListener('click', () => accessibilityPanel.classList.toggle('open'));

document.getElementById('normalText').addEventListener('click', () => {
    document.body.classList.remove('large-text', 'extra-large-text');
    updateActiveButton(document.getElementById('normalText'));
});
document.getElementById('largeText').addEventListener('click', () => {
    document.body.classList.remove('extra-large-text');
    document.body.classList.add('large-text');
    updateActiveButton(document.getElementById('largeText'));
});
document.getElementById('extraLargeText').addEventListener('click', () => {
    document.body.classList.remove('large-text');
    document.body.classList.add('extra-large-text');
    updateActiveButton(document.getElementById('extraLargeText'));
});
document.getElementById('highContrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    updateActiveButton(document.getElementById('highContrast'));
});
document.getElementById('resetAccessibility').addEventListener('click', () => {
    document.body.classList.remove('large-text', 'extra-large-text', 'high-contrast');
    document.querySelectorAll('.accessibility-btn').forEach(btn => btn.classList.remove('active'));
});

function updateActiveButton(activeBtn) {
    document.querySelectorAll('.accessibility-btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    handleBackToTop();
    handleScrollAnimations();
});
