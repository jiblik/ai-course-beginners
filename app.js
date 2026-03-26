// ============================================
// AI Course - Interactive App v3
// ============================================

const pages = [
    'lesson-01','lesson-02','lesson-03','lesson-04','lesson-05',
    'lesson-06','lesson-07','lesson-08','lesson-09',
    'resources','quick-reference'
];

const lessonNames = {
    'lesson-01':'מה זה AI?','lesson-02':'השחקנים הגדולים',
    'lesson-03':'Prompting - יסודות','lesson-04':'Prompting - מתקדם',
    'lesson-05':'AI בעבודה','lesson-06':'AI ויצירתיות',
    'lesson-07':'AI ובטיחות','lesson-08':'AI ועתיד העבודה',
    'lesson-09':'ערכת הישרדות','resources':'כלים ומשאבים',
    'quick-reference':'גיליון עזר'
};

const lessonIcons = {
    'lesson-01':'🧠','lesson-02':'🗺️','lesson-03':'💬','lesson-04':'🚀',
    'lesson-05':'💼','lesson-06':'🎨','lesson-07':'🛡️','lesson-08':'🔮',
    'lesson-09':'🎁','resources':'📋','quick-reference':'⚡'
};

let currentPage = 'home';
let completedLessons = JSON.parse(localStorage.getItem('ai-course-completed') || '[]');

marked.setOptions({ breaks: true, gfm: true });

// ============================================
// Dark Mode
// ============================================
function initTheme() {
    const saved = localStorage.getItem('ai-course-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('ai-course-theme', isDark ? 'light' : 'dark');
}

// ============================================
// Reading Progress
// ============================================
function updateReadingProgress() {
    if (currentPage === 'home') {
        document.getElementById('readingProgress').style.width = '0%';
        return;
    }
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
                // Counter animation for stats
                if (entry.target.classList.contains('anim-count')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.anim-fade, .anim-slide, .anim-count').forEach(el => {
        observer.observe(el);
    });
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
    const duration = 1200;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
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
        // Re-trigger home animations
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

    contentEl.innerHTML = '<div style="text-align:center;padding:80px 20px;color:var(--text-tertiary);">טוען שיעור...</div>';
    navEl.innerHTML = '';

    try {
        const response = await fetch(`${page}.md`);
        if (!response.ok) throw new Error('Not found');
        let text = await response.text();

        text = text.replace(/<div dir="rtl">\s*/g, '').replace(/\s*<\/div>\s*$/g, '');
        let html = marked.parse(text);
        html = wrapSectionCards(html);

        const lessonNum = page.replace('lesson-', '').replace('resources', '').replace('quick-reference', '');
        const icon = lessonIcons[page] || '';

        if (page.startsWith('lesson-')) {
            const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
            const title = h1Match ? h1Match[1] : (lessonNames[page] || '');
            html = html.replace(/<h1[^>]*>.*?<\/h1>/, '');
            html = `<div class="lesson-hero" data-num="${lessonNum}">
                <span class="lesson-tag">שיעור ${lessonNum} ${icon}</span>
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
        contentEl.innerHTML = '<div style="text-align:center;padding:80px 20px;color:var(--red);">שגיאה בטעינת השיעור 😕</div>';
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
        btn.textContent = 'העתק';
        btn.addEventListener('click', () => {
            const code = pre.querySelector('code')?.textContent || pre.textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = '✓ הועתק';
                btn.classList.add('copied');
                setTimeout(() => { btn.textContent = 'העתק'; btn.classList.remove('copied'); }, 2000);
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
        const name = prev === 'home' ? 'דף הבית' : lessonNames[prev];
        const ic = prev === 'home' ? '🏠' : (lessonIcons[prev] || '');
        html += `<a href="#" onclick="navigateTo('${prev}'); return false;">
            <span class="nav-label">→ הקודם</span>
            <span class="nav-title">${ic} ${name}</span>
        </a>`;
    }
    if (idx < all.length - 1) {
        const next = all[idx + 1];
        html += `<a href="#" class="next-link" onclick="navigateTo('${next}'); return false;">
            <span class="nav-label">הבא ←</span>
            <span class="nav-title">${lessonIcons[next] || ''} ${lessonNames[next]}</span>
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
        link.addEventListener('click', e => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.contains('open') ? closeSidebar() : openSidebar();
    });
    document.getElementById('overlay').addEventListener('click', closeSidebar);

    window.addEventListener('scroll', () => updateReadingProgress(), { passive: true });

    const hash = window.location.hash.slice(1);
    if (hash && pages.includes(hash)) {
        navigateTo(hash);
    } else {
        // Trigger homepage animations
        setTimeout(() => initScrollAnimations(), 100);
    }

    updateProgress();

    window.addEventListener('hashchange', () => {
        const h = window.location.hash.slice(1);
        if (h && pages.includes(h)) navigateTo(h);
        else if (!h) navigateTo('home');
    });
});

// fadeIn keyframe for lesson content
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(style);
