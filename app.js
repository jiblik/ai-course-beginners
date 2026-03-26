// ============================================
// AI Course - App Logic v2
// ============================================

const pages = [
    'lesson-01', 'lesson-02', 'lesson-03', 'lesson-04', 'lesson-05',
    'lesson-06', 'lesson-07', 'lesson-08', 'lesson-09',
    'resources', 'quick-reference'
];

const lessonNames = {
    'lesson-01': 'מה זה AI?',
    'lesson-02': 'השחקנים הגדולים',
    'lesson-03': 'Prompting - יסודות',
    'lesson-04': 'Prompting - מתקדם',
    'lesson-05': 'AI בעבודה',
    'lesson-06': 'AI ויצירתיות',
    'lesson-07': 'AI ובטיחות',
    'lesson-08': 'AI ועתיד העבודה',
    'lesson-09': 'ערכת הישרדות',
    'resources': 'כלים ומשאבים',
    'quick-reference': 'גיליון עזר'
};

const lessonIcons = {
    'lesson-01': '🧠', 'lesson-02': '🗺️', 'lesson-03': '💬',
    'lesson-04': '🚀', 'lesson-05': '💼', 'lesson-06': '🎨',
    'lesson-07': '🛡️', 'lesson-08': '🔮', 'lesson-09': '🎁',
    'resources': '📋', 'quick-reference': '⚡'
};

// State
let currentPage = 'home';
let completedLessons = JSON.parse(localStorage.getItem('ai-course-completed') || '[]');

// Configure marked
marked.setOptions({
    breaks: true,
    gfm: true
});

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
}

async function loadLesson(page) {
    const contentEl = document.getElementById('lessonContent');
    const navEl = document.getElementById('lessonNav');

    contentEl.innerHTML = '<div class="loading">טוען...</div>';
    navEl.innerHTML = '';

    try {
        const response = await fetch(`${page}.md`);
        if (!response.ok) throw new Error('Not found');
        let text = await response.text();

        // Remove wrapping <div dir="rtl"> tags
        text = text.replace(/<div dir="rtl">\s*/g, '').replace(/\s*<\/div>\s*$/g, '');

        let html = marked.parse(text);

        // Post-process: wrap emoji-headed h2 sections in visual cards
        html = wrapSectionCards(html);

        // Add lesson hero header
        const lessonNum = page.replace('lesson-', '').replace('resources', '').replace('quick-reference', '');
        const icon = lessonIcons[page] || '';
        const name = lessonNames[page] || '';

        if (page.startsWith('lesson-')) {
            // Extract title from first h1
            const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
            const title = h1Match ? h1Match[1] : name;
            // Remove the original h1
            html = html.replace(/<h1[^>]*>.*?<\/h1>/, '');

            const heroHtml = `
                <div class="lesson-hero" data-num="${lessonNum}">
                    <span class="lesson-tag">שיעור ${lessonNum} ${icon}</span>
                    <h1>${title}</h1>
                </div>`;
            html = heroHtml + html;
        }

        contentEl.innerHTML = html;

        // Intercept .md links
        interceptMdLinks(contentEl);
        addCopyButtons();
        addVisualBlocks(contentEl);
        buildLessonNav(page, navEl);

        contentEl.style.animation = 'none';
        contentEl.offsetHeight;
        contentEl.style.animation = 'fadeIn 0.3s ease';
    } catch (err) {
        contentEl.innerHTML = '<div class="loading">שגיאה בטעינת השיעור</div>';
    }
}

function wrapSectionCards(html) {
    const sectionMap = {
        '🎯': 'target',
        '📖': 'content',
        '💡': 'example',
        '🧪': 'exercise',
        '🎮': 'quiz',
        '📌': 'summary'
    };

    for (const [emoji, cls] of Object.entries(sectionMap)) {
        // Match h2 that starts with the emoji and all content until next h2 or hr
        const regex = new RegExp(
            `(<h2[^>]*>\\s*${emoji.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}[^<]*<\\/h2>)`,
            'g'
        );
        html = html.replace(regex, (match) => {
            return `<div class="section-card ${cls}">${match}`;
        });
    }

    // Close section cards before the next section card or at end
    // Simple approach: close before any new section-card div
    html = html.replace(/(<div class="section-card)/g, '</div>$1');
    // Remove the first orphan </div>
    html = html.replace('</div><div class="section-card', '<div class="section-card');

    return html;
}

function interceptMdLinks(container) {
    container.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.md')) {
            const page = href.replace('.md', '');
            if (pages.includes(page) || page === 'README') {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (page === 'README') {
                        navigateTo('home');
                    } else {
                        navigateTo(page);
                    }
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
                btn.textContent = '✓ הועתק!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'העתק';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
        pre.appendChild(btn);
    });
}

function addVisualBlocks(container) {
    // Add visual illustration blocks after certain h3 headers
    const headers = container.querySelectorAll('h3');
    headers.forEach(h3 => {
        const text = h3.textContent;
        // Add visual timeline for history sections
        if (text.includes('היסטוריה') || text.includes('שנות ה-')) {
            // Already has emoji-based visual, skip
        }
    });
}

function buildLessonNav(page, navEl) {
    const allPages = ['home', ...pages];
    const idx = allPages.indexOf(page);
    let html = '';

    if (idx > 0) {
        const prev = allPages[idx - 1];
        const prevName = prev === 'home' ? 'דף הבית' : lessonNames[prev];
        const prevIcon = prev === 'home' ? '🏠' : (lessonIcons[prev] || '');
        html += `<a href="#" onclick="navigateTo('${prev}'); return false;">
            <span class="nav-label">הקודם →</span>
            <span class="nav-title">${prevIcon} ${prevName}</span>
        </a>`;
    }

    if (idx < allPages.length - 1) {
        const next = allPages[idx + 1];
        const nextName = lessonNames[next];
        const nextIcon = lessonIcons[next] || '';
        html += `<a href="#" class="next-link" onclick="navigateTo('${next}'); return false;">
            <span class="nav-label">← הבא</span>
            <span class="nav-title">${nextIcon} ${nextName}</span>
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
        if (completedLessons.includes(link.dataset.page)) {
            link.classList.add('completed');
        }
    });
}

// ============================================
// Mobile Sidebar
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
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    document.getElementById('menuToggle').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    document.getElementById('overlay').addEventListener('click', closeSidebar);

    const hash = window.location.hash.slice(1);
    if (hash && pages.includes(hash)) {
        navigateTo(hash);
    }

    updateProgress();

    window.addEventListener('hashchange', () => {
        const h = window.location.hash.slice(1);
        if (h && pages.includes(h)) {
            navigateTo(h);
        } else if (!h) {
            navigateTo('home');
        }
    });
});
