// ========== ЛОКАЛЬНЫЙ AI (НЕ НУЖЕН API КЛЮЧ) ==========
async function askDeepSeek(prompt) {
    const p = prompt.toLowerCase();
    
    if (p.includes('свадьб') || p.includes('wedding')) {
        return "💍 Свадебная фотосъемка — от 25 000 ₽. Полный день, 300+ фото, фотоальбом в подарок!";
    }
    if (p.includes('портрет') || p.includes('portrait')) {
        return "✨ Портретная съемка — от 8 000 ₽. В студии или на природе, профессиональный грим.";
    }
    if (p.includes('семейн') || p.includes('family')) {
        return "👨‍👩‍👧‍👦 Семейная съемка — от 12 000 ₽. Теплые и естественные фото.";
    }
    if (p.includes('цен') || p.includes('price') || p.includes('сколько стоит')) {
        return "💰 Цены: Свадебная — от 25 000 ₽, Портретная — от 8 000 ₽, Семейная — от 12 000 ₽.";
    }
    if (p.includes('контакт') || p.includes('телефон')) {
        return "📞 Связаться: +7 (914) 123-45-67, Telegram, WhatsApp, или форма на сайте.";
    }
    if (p.includes('адрес') || p.includes('студия')) {
        return "📍 Студия: г. Якутск, ул. Ленина, 25, БЦ 'Северный', 3 этаж.";
    }
    if (p.includes('привет') || p.includes('здравствуй')) {
        return "👋 Привет! Я AI-помощник. Что тебя интересует? Свадебная, портретная или семейная съемка?";
    }
    
    return "📸 Спасибо за вопрос! Посмотри раздел 'Услуги' или заполни форму в 'Контактах' — я отвечу!";
}

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

// ========== ПОРТФОЛИО ==========
const portfolioItems = [
    { category: 'wedding', titleRu: 'Свадебная съемка', titleEn: 'Wedding shoot', titleSah: 'Кэргэнниир уруһуйдааһын', descRu: 'Анна и Дмитрий', descEn: 'Anna and Dmitry', descSah: 'Анна уонна Дмитрий' },
    { category: 'portrait', titleRu: 'Портретная съемка', titleEn: 'Portrait shoot', titleSah: 'Портрет уруһуйдааһын', descRu: 'Елена', descEn: 'Elena', descSah: 'Елена' },
    { category: 'family', titleRu: 'Семейная съемка', titleEn: 'Family shoot', titleSah: 'Дьиэ кэргэн уруһуйдааһын', descRu: 'Семья Петровых', descEn: 'Petrov Family', descSah: 'Петровтар дьиэ кэргэннэрэ' },
    { category: 'commercial', titleRu: 'Коммерческая съемка', titleEn: 'Commercial shoot', titleSah: 'Эргиэн уруһуйдааһын', descRu: 'Для бренда одежды', descEn: 'For clothing brand', descSah: 'Таҥас брэндээххэ' },
    { category: 'wedding', titleRu: 'Свадебный портрет', titleEn: 'Wedding portrait', titleSah: 'Кэргэнниир портрет', descRu: 'Мария и Алексей', descEn: 'Maria and Alexey', descSah: 'Мария уонна Алексей' },
    { category: 'portrait', titleRu: 'Мужской портрет', titleEn: 'Male portrait', titleSah: 'Эр киһи портрета', descRu: 'Андрей', descEn: 'Andrey', descSah: 'Андрей' }
];

const portfolioGrid = document.querySelector('.portfolio-grid');
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
    el.innerHTML = `Тут будет фото<div class="portfolio-overlay"><h3 class="portfolio-title">${item.titleRu}</h3><p class="portfolio-desc">${item.descRu}</p></div>`;
    portfolioGrid.appendChild(el);
});

function updatePortfolioLanguage(lang) {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const title = item.getAttribute(`data-title-${lang}`);
        const desc = item.getAttribute(`data-desc-${lang}`);
        if (title) item.querySelector('.portfolio-title').textContent = title;
        if (desc) item.querySelector('.portfolio-desc').textContent = desc;
    });
}

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

// ========== AI ЧАТ-ВИДЖЕТ ==========
function addAIChatWidget() {
    const widgetHTML = `
        <div id="aiChatWidget" style="position: fixed; bottom: 100px; right: 20px; z-index: 9999;">
            <button id="aiChatToggle" style="background: var(--gradient-primary); border: none; border-radius: 50%; width: 60px; height: 60px; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.2); transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-robot" style="color: white; font-size: 28px;"></i>
            </button>
            <div id="aiChatWindow" style="display: none; position: absolute; bottom: 80px; right: 0; width: 350px; background: white; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); overflow: hidden;">
                <div style="background: var(--gradient-primary); padding: 15px; color: white;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-robot" style="font-size: 24px;"></i>
                        <div><strong style="font-size: 16px;">AI-помощник</strong><div style="font-size: 11px; opacity: 0.8;">Онлайн 24/7</div></div>
                    </div>
                </div>
                <div id="aiChatMessages" style="height: 350px; overflow-y: auto; padding: 15px; background: #f8f9fa;">
                    <div class="ai-message ai-bot"><div style="background: white; padding: 12px 15px; border-radius: 18px; border-top-left-radius: 4px; display: inline-block; max-width: 85%; font-size: 14px;">Привет! 👋 Я AI-помощник. Могу рассказать об услугах, подобрать концепцию съемки. Спрашивай!</div></div>
                </div>
                <div style="padding: 15px; border-top: 1px solid #eee; background: white; display: flex; gap: 10px;">
                    <input type="text" id="aiChatInput" placeholder="Напиши вопрос..." style="flex: 1; padding: 12px 15px; border: 1px solid #e0e0e0; border-radius: 25px; font-family: inherit; font-size: 14px; outline: none;">
                    <button id="aiChatSend" style="background: var(--coral); border: none; border-radius: 50%; width: 44px; height: 44px; color: white; cursor: pointer;"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    
    const style = document.createElement('style');
    style.textContent = `.ai-message{margin-bottom:12px;display:flex}.ai-user{justify-content:flex-end}.ai-user div{background:var(--gradient-primary)!important;color:white!important;border-top-right-radius:4px!important}.ai-bot{justify-content:flex-start}`;
    document.head.appendChild(style);
    
    const toggle = document.getElementById('aiChatToggle');
    const windowChat = document.getElementById('aiChatWindow');
    const input = document.getElementById('aiChatInput');
    const sendBtn = document.getElementById('aiChatSend');
    const messagesContainer = document.getElementById('aiChatMessages');
    
    toggle.addEventListener('click', () => windowChat.style.display = windowChat.style.display === 'block' ? 'none' : 'block');
    
    function addMessage(text, isUser = false) {
        const div = document.createElement('div');
        div.className = `ai-message ${isUser ? 'ai-user' : 'ai-bot'}`;
        div.innerHTML = `<div style="background: ${isUser ? 'var(--gradient-primary)' : 'white'}; color: ${isUser ? 'white' : '#333'}; padding: 12px 15px; border-radius: 18px; ${isUser ? 'border-top-right-radius: 4px;' : 'border-top-left-radius: 4px;'}; display: inline-block; max-width: 85%; font-size: 14px;">${text}</div>`;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    async function sendMessage() {
        const message = input.value.trim();
        if (!message) return;
        addMessage(message, true);
        input.value = '';
        addMessage('✍️ Печатает...', false);
        const response = await askDeepSeek(message);
        messagesContainer.lastChild.remove();
        addMessage(response, false);
    }
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    handleBackToTop();
    handleScrollAnimations();
    addAIChatWidget();
});
