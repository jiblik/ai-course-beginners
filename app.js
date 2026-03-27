// ============================================
// AI Course - Bilingual App (HE/RU) v4
// ============================================

const pages = [
    'lesson-01','lesson-02','lesson-03','lesson-04','lesson-05',
    'lesson-06','lesson-07','lesson-08','lesson-09',
    'resources','quick-reference'
];

// ============================================
// i18n — All translatable strings
// ============================================
const i18n = {
    he: {
        siteTitle: 'AI למתחילים',
        siteSubtitle: 'המדריך המלא לעולם הבינה המלאכותית',
        'nav-home': 'דף הבית',
        'nav-lessons': 'שיעורים',
        'nav-appendix': 'נספחים',
        'nav-01': 'מה זה AI?', 'nav-02': 'השחקנים הגדולים',
        'nav-03': 'Prompting - יסודות', 'nav-04': 'Prompting - מתקדם',
        'nav-05': 'AI בעבודה', 'nav-06': 'AI ויצירתיות',
        'nav-07': 'AI ובטיחות', 'nav-08': 'AI ועתיד העבודה',
        'nav-09': 'ערכת הישרדות',
        'nav-resources': 'כלים ומשאבים', 'nav-quickref': 'גיליון עזר',
        'progress': 'התקדמות',
        'hero-badge': '9 שיעורים • 30+ פרומפטים • 100% מעשי',
        'hero-title': 'ללמוד<br><span class="gradient-text">בינה מלאכותית</span><br>מאפס.',
        'hero-subtitle': 'מ"מה זה ChatGPT?" ל"תן לי שנייה, אני שואל את ה-AI שלי". בלי מונחים מסובכים, עם הרבה הומור ודוגמאות מהחיים.',
        'hero-cta': 'להתחיל ללמוד', 'hero-browse': 'לצפות בתוכן',
        'hc-1': 'מה זה AI?', 'hc-3': 'יצירתיות', 'hc-4': 'בטיחות',
        'stat-lessons': 'שיעורים מקיפים', 'stat-prompts': 'Prompts מוכנים',
        'stat-hours': 'שעות תוכן', 'stat-free': 'כלים חינמיים',
        'section-title': 'תוכן הקורס',
        'section-desc': '9 שיעורים שייקחו אתכם מאפס לגיבורי AI',
        'cta-title': 'מוכנים להתחיל?',
        'cta-desc': 'שיעור ראשון לוקח 10 דקות. אחרי זה לא תפסיקו.',
        'cta-btn': 'יאללה, נתחיל',
        'footer': 'נבנה עם ❤️ ו-AI • כל הזכויות שמורות © 2026',
        'lesson-tag': 'שיעור',
        'nav-prev': '→ הקודם', 'nav-next': 'הבא ←',
        'home-name': 'דף הבית',
        'copy': 'העתק', 'copied': '✓ הועתק',
        'loading': 'טוען שיעור...', 'error': 'שגיאה בטעינת השיעור 😕',
        lessonNames: {
            'lesson-01':'מה זה AI?','lesson-02':'השחקנים הגדולים',
            'lesson-03':'Prompting - יסודות','lesson-04':'Prompting - מתקדם',
            'lesson-05':'AI בעבודה','lesson-06':'AI ויצירתיות',
            'lesson-07':'AI ובטיחות','lesson-08':'AI ועתיד העבודה',
            'lesson-09':'ערכת הישרדות','resources':'כלים ומשאבים',
            'quick-reference':'גיליון עזר'
        },
        lessonDescs: {
            'lesson-01':'הבנה בסיסית, היסטוריה קצרה, ולמה דווקא עכשיו',
            'lesson-02':'ChatGPT, Claude, Gemini, Grok, Copilot - מי עושה מה',
            'lesson-03':'מה זה Prompt, 5 עקרונות הזהב, טכניקות בסיסיות',
            'lesson-04':'שרשראות, ביקורת עצמית, מאגר Prompts',
            'lesson-05':'מיילים, מצגות, סיכומים, ניתוח נתונים',
            'lesson-06':'תמונות, כתיבה יצירתית, וידאו, מולטימדיה',
            'lesson-07':'פרטיות, הזיות, Deepfakes, כללי זהב',
            'lesson-08':'מקצועות בסיכון, הזדמנויות חדשות',
            'lesson-09':'10 כלים חינמיים, קהילות, ומשאבים להמשך'
        },
        lessonTimes: ['~10 דק\'','~12 דק\'','~10 דק\'','~12 דק\'','~12 דק\'','~12 דק\'','~10 דק\'','~10 דק\'','~8 דק\'']
    },
    ru: {
        siteTitle: 'ИИ для начинающих',
        siteSubtitle: 'Полное руководство по искусственному интеллекту',
        'nav-home': 'Главная',
        'nav-lessons': 'Уроки',
        'nav-appendix': 'Приложения',
        'nav-01': 'Что такое ИИ?', 'nav-02': 'Главные игроки',
        'nav-03': 'Prompting — Основы', 'nav-04': 'Prompting — Продвинутый',
        'nav-05': 'ИИ на работе', 'nav-06': 'ИИ и творчество',
        'nav-07': 'ИИ и безопасность', 'nav-08': 'ИИ и будущее работы',
        'nav-09': 'Набор для выживания',
        'nav-resources': 'Инструменты и ресурсы', 'nav-quickref': 'Шпаргалка',
        'progress': 'Прогресс',
        'hero-badge': '9 уроков • 30+ промптов • 100% практики',
        'hero-title': 'Изучить<br><span class="gradient-text">искусственный интеллект</span><br>с нуля.',
        'hero-subtitle': 'От «Что такое ChatGPT?» до «Подожди секунду, я спрошу свой ИИ». Без сложных терминов, с юмором и примерами из жизни.',
        'hero-cta': 'Начать обучение', 'hero-browse': 'Смотреть программу',
        'hc-1': 'Что такое ИИ?', 'hc-3': 'Творчество', 'hc-4': 'Безопасность',
        'stat-lessons': 'Подробных уроков', 'stat-prompts': 'Готовых промптов',
        'stat-hours': 'Часов контента', 'stat-free': 'Бесплатных инструментов',
        'section-title': 'Программа курса',
        'section-desc': '9 уроков, которые проведут вас от нуля до уверенного пользователя ИИ',
        'cta-title': 'Готовы начать?',
        'cta-desc': 'Первый урок займёт 10 минут. После этого вы не остановитесь.',
        'cta-btn': 'Поехали!',
        'footer': 'Сделано с ❤️ и ИИ • Все права защищены © 2026',
        'lesson-tag': 'Урок',
        'nav-prev': '← Предыдущий', 'nav-next': 'Следующий →',
        'home-name': 'Главная',
        'copy': 'Копировать', 'copied': '✓ Скопировано',
        'loading': 'Загрузка урока...', 'error': 'Ошибка загрузки урока 😕',
        lessonNames: {
            'lesson-01':'Что такое ИИ?','lesson-02':'Главные игроки',
            'lesson-03':'Prompting — Основы','lesson-04':'Prompting — Продвинутый',
            'lesson-05':'ИИ на работе','lesson-06':'ИИ и творчество',
            'lesson-07':'ИИ и безопасность','lesson-08':'ИИ и будущее работы',
            'lesson-09':'Набор для выживания','resources':'Инструменты и ресурсы',
            'quick-reference':'Шпаргалка'
        },
        lessonDescs: {
            'lesson-01':'Базовое понимание, краткая история и почему именно сейчас',
            'lesson-02':'ChatGPT, Claude, Gemini, Grok, Copilot — кто что делает',
            'lesson-03':'Что такое Prompt, 5 золотых принципов, базовые техники',
            'lesson-04':'Цепочки, самокритика, библиотека промптов',
            'lesson-05':'Письма, презентации, конспекты, анализ данных',
            'lesson-06':'Изображения, креативное письмо, видео, мультимедиа',
            'lesson-07':'Приватность, галлюцинации, Deepfakes, золотые правила',
            'lesson-08':'Профессии в зоне риска, новые возможности',
            'lesson-09':'10 бесплатных инструментов, сообщества и ресурсы'
        },
        lessonTimes: ['~10 мин','~12 мин','~10 мин','~12 мин','~12 мин','~12 мин','~10 мин','~10 мин','~8 мин']
    }
};

const lessonIcons = {
    'lesson-01':'🧠','lesson-02':'🗺️','lesson-03':'💬','lesson-04':'🚀',
    'lesson-05':'💼','lesson-06':'🎨','lesson-07':'🛡️','lesson-08':'🔮',
    'lesson-09':'🎁','resources':'📋','quick-reference':'⚡'
};

// ============================================
// State
// ============================================
let currentPage = 'home';
let currentLang = localStorage.getItem('ai-course-lang') || 'he';
let completedLessons = JSON.parse(localStorage.getItem('ai-course-completed') || '[]');

marked.setOptions({ breaks: true, gfm: true });

// ============================================
// Language Switching
// ============================================
function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('ai-course-lang', lang);

    // Update HTML direction
    const isRTL = lang === 'he';
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-rtl', isRTL);
    document.body.classList.toggle('lang-ltr', !isRTL);

    // Font family
    document.body.style.fontFamily = isRTL
        ? "'Rubik', -apple-system, BlinkMacSystemFont, sans-serif"
        : "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Mobile lang toggle
    const mf = document.getElementById('mobileLangFlag');
    if (mf) mf.textContent = lang === 'he' ? 'RU' : 'IL';

    // Translate all i18n elements
    applyTranslations();

    // Rebuild lessons grid
    buildLessonsGrid();

    // Update sidebar title
    document.getElementById('sidebarTitle').textContent = t('siteTitle');
    document.getElementById('sidebarSubtitle').textContent = t('siteSubtitle');
    document.getElementById('mobileTitle').textContent = t('siteTitle');
    document.title = t('siteTitle');

    // Hero title (innerHTML)
    document.getElementById('heroTitle').innerHTML = t('hero-title');

    // Re-load current lesson if on one
    if (currentPage !== 'home') {
        loadLesson(currentPage);
    }
}

function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || key;
}

function tName(page) {
    return i18n[currentLang].lessonNames[page] || page;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = t(key);
        if (val && val !== key) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = val;
            } else {
                el.textContent = val;
            }
        }
    });
}

// ============================================
// Build Lessons Grid (dynamic per language)
// ============================================
function buildLessonsGrid() {
    const grid = document.getElementById('lessonsGrid');
    if (!grid) return;
    const lang = currentLang;
    const names = i18n[lang].lessonNames;
    const descs = i18n[lang].lessonDescs;
    const times = i18n[lang].lessonTimes;
    const arrow = lang === 'he' ? '←' : '→';

    let html = '';
    for (let i = 1; i <= 9; i++) {
        const num = String(i).padStart(2, '0');
        const page = `lesson-${num}`;
        const bonus = i === 9 ? ' card-bonus' : '';
        html += `<a href="#" class="lesson-card anim-slide${bonus}" onclick="navigateTo('${page}'); return false;">
            <div class="lc-header">
                <span class="lc-num">${num}</span>
                <span class="lc-icon">${lessonIcons[page]}</span>
            </div>
            <h3>${names[page]}</h3>
            <p>${descs[page]}</p>
            <div class="lc-footer"><span class="lc-time">${times[i-1]}</span><span class="lc-arrow">${arrow}</span></div>
        </a>`;
    }
    grid.innerHTML = html;

    // Re-trigger scroll animations on new elements
    setTimeout(() => initScrollAnimations(), 50);
}

// ============================================
// Dark Mode
// ============================================
function initTheme() {
    const saved = localStorage.getItem('ai-course-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ai-course-theme', newTheme);
}

// ============================================
// Reading Progress
// ============================================
function updateReadingProgress() {
    if (currentPage === 'home') { document.getElementById('readingProgress').style.width = '0%'; return; }
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.getElementById('readingProgress').style.width = Math.min(progress, 100) + '%';
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('anim-count')) animateCounter(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.anim-fade, .anim-slide, .anim-count').forEach(el => observer.observe(el));
}

function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';
    const target = parseInt(el.dataset.target);
    if (!target) return;
    const numEl = el.querySelector('.stat-num');
    const plus = numEl.querySelector('.stat-plus');
    const plusText = plus ? plus.outerHTML : '';
    let current = 0;
    const step = target / (1200 / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        numEl.innerHTML = Math.round(current) + plusText;
    }, 16);
}

// ============================================
// Navigation
// ============================================
function navigateTo(page) {
    currentPage = page;
    window.location.hash = page === 'home' ? '' : page;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    if (page === 'home') {
        document.getElementById('homePage').style.display = '';
        document.getElementById('lessonPage').style.display = 'none';
        setTimeout(() => initScrollAnimations(), 50);
    } else {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('lessonPage').style.display = '';
        loadLesson(page);
    }

    if (page.startsWith('lesson-') && !completedLessons.includes(page)) {
        completedLessons.push(page);
        localStorage.setItem('ai-course-completed', JSON.stringify(completedLessons));
        updateProgress();
    }

    closeSidebar();
    window.scrollTo({ top: 0 });
    updateReadingProgress();
}

async function loadLesson(page) {
    const contentEl = document.getElementById('lessonContent');
    const navEl = document.getElementById('lessonNav');

    contentEl.innerHTML = `<div style="text-align:center;padding:80px 20px;color:var(--text-tertiary);">${t('loading')}</div>`;
    navEl.innerHTML = '';

    // Build file path based on language
    const filePath = currentLang === 'he' ? `${page}.md` : `ru/${page}.md`;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Not found');
        let text = await response.text();

        text = text.replace(/<div dir="rtl">\s*/g, '').replace(/\s*<\/div>\s*$/g, '');
        let html = marked.parse(text);
        html = wrapSectionCards(html);

        const lessonNum = page.replace('lesson-', '').replace('resources', '').replace('quick-reference', '');
        const icon = lessonIcons[page] || '';

        if (page.startsWith('lesson-')) {
            const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
            const title = h1Match ? h1Match[1] : tName(page);
            html = html.replace(/<h1[^>]*>.*?<\/h1>/, '');
            html = `<div class="lesson-hero" data-num="${lessonNum}">
                <span class="lesson-tag">${t('lesson-tag')} ${lessonNum} ${icon}</span>
                <h1>${title}</h1>
            </div>` + html;
        }

        contentEl.innerHTML = html;
        interceptMdLinks(contentEl);
        addCopyButtons();
        buildLessonNav(page, navEl);

        contentEl.style.animation = 'none';
        contentEl.offsetHeight;
        contentEl.style.animation = 'fadeIn 0.35s ease';
    } catch (err) {
        contentEl.innerHTML = `<div style="text-align:center;padding:80px 20px;color:var(--red);">${t('error')}</div>`;
    }
}

function wrapSectionCards(html) {
    const map = { '🎯':'target', '📖':'content', '💡':'example', '🧪':'exercise', '🎮':'quiz', '📌':'summary' };
    for (const [emoji, cls] of Object.entries(map)) {
        const re = new RegExp(`(<h2[^>]*>\\s*${emoji.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')}[^<]*<\\/h2>)`, 'g');
        html = html.replace(re, m => `<div class="section-card ${cls}">${m}`);
    }
    html = html.replace(/(<div class="section-card)/g, '</div>$1');
    html = html.replace('</div><div class="section-card', '<div class="section-card');
    return html;
}

function interceptMdLinks(container) {
    container.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.md')) {
            const p = href.replace('.md', '');
            if (pages.includes(p) || p === 'README') {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    navigateTo(p === 'README' ? 'home' : p);
                });
            }
        }
    });
}

function addCopyButtons() {
    document.querySelectorAll('.lesson-content pre').forEach(pre => {
        if (pre.querySelector('.copy-btn')) return;
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = t('copy');
        btn.addEventListener('click', () => {
            const code = pre.querySelector('code')?.textContent || pre.textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = t('copied');
                btn.classList.add('copied');
                setTimeout(() => { btn.textContent = t('copy'); btn.classList.remove('copied'); }, 2000);
            });
        });
        pre.appendChild(btn);
    });
}

function buildLessonNav(page, navEl) {
    const all = ['home', ...pages];
    const idx = all.indexOf(page);
    let html = '';

    if (idx > 0) {
        const prev = all[idx - 1];
        const name = prev === 'home' ? t('home-name') : tName(prev);
        const ic = prev === 'home' ? '🏠' : (lessonIcons[prev] || '');
        html += `<a href="#" onclick="navigateTo('${prev}'); return false;">
            <span class="nav-label">${t('nav-prev')}</span>
            <span class="nav-title">${ic} ${name}</span>
        </a>`;
    }
    if (idx < all.length - 1) {
        const next = all[idx + 1];
        html += `<a href="#" class="next-link" onclick="navigateTo('${next}'); return false;">
            <span class="nav-label">${t('nav-next')}</span>
            <span class="nav-title">${lessonIcons[next] || ''} ${tName(next)}</span>
        </a>`;
    }
    navEl.innerHTML = html;
}

// ============================================
// Progress
// ============================================
function updateProgress() {
    const total = 9;
    const done = completedLessons.filter(l => l.startsWith('lesson-')).length;
    document.getElementById('progressText').textContent = `${done}/${total}`;
    document.getElementById('progressFill').style.width = `${(done / total) * 100}%`;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (completedLessons.includes(link.dataset.page)) link.classList.add('completed');
    });
}

// ============================================
// Mobile
// ============================================
function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Init
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => { e.preventDefault(); navigateTo(link.dataset.page); });
    });

    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.contains('open') ? closeSidebar() : openSidebar();
    });
    document.getElementById('overlay').addEventListener('click', closeSidebar);
    window.addEventListener('scroll', () => updateReadingProgress(), { passive: true });

    // Apply saved language
    switchLang(currentLang);

    const hash = window.location.hash.slice(1);
    if (hash && pages.includes(hash)) {
        navigateTo(hash);
    } else {
        setTimeout(() => initScrollAnimations(), 100);
    }

    updateProgress();

    window.addEventListener('hashchange', () => {
        const h = window.location.hash.slice(1);
        if (h && pages.includes(h)) navigateTo(h);
        else if (!h) navigateTo('home');
    });
});

// fadeIn keyframe
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(style);
