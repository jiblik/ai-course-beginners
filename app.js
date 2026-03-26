// ============================================
// AI Course - App Logic
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

    // Update active nav
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

    // Mark lesson as completed
    if (page.startsWith('lesson-') && !completedLessons.includes(page)) {
        completedLessons.push(page);
        localStorage.setItem('ai-course-completed', JSON.stringify(completedLessons));
        updateProgress();
    }

    // Close mobile sidebar
    closeSidebar();

    // Scroll to top
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

        // Remove the wrapping <div dir="rtl"> tags
        text = text.replace(/<div dir="rtl">\s*/g, '').replace(/<\/div>\s*$/g, '');

        contentEl.innerHTML = marked.parse(text);
        addCopyButtons();
        buildLessonNav(page, navEl);

        // Animate in
        contentEl.style.animation = 'none';
        contentEl.offsetHeight; // trigger reflow
        contentEl.style.animation = 'fadeIn 0.3s ease';
    } catch (err) {
        contentEl.innerHTML = '<div class="loading">שגיאה בטעינת השיעור</div>';
    }
}

function buildLessonNav(page, navEl) {
    const allPages = ['home', ...pages];
    const idx = allPages.indexOf(page);
    let html = '';

    if (idx > 0) {
        const prev = allPages[idx - 1];
        const prevName = prev === 'home' ? 'דף הבית' : lessonNames[prev];
        html += `<a href="#" onclick="navigateTo('${prev}'); return false;">
            <span class="nav-label">← הקודם</span>
            <span class="nav-title">${prevName}</span>
        </a>`;
    }

    if (idx < allPages.length - 1) {
        const next = allPages[idx + 1];
        const nextName = lessonNames[next];
        html += `<a href="#" class="next-link" onclick="navigateTo('${next}'); return false;">
            <span class="nav-label">הבא →</span>
            <span class="nav-title">${nextName}</span>
        </a>`;
    }

    navEl.innerHTML = html;
}

function addCopyButtons() {
    document.querySelectorAll('.lesson-content pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'העתק';
        btn.addEventListener('click', () => {
            const code = pre.querySelector('code')?.textContent || pre.textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = 'הועתק!';
                setTimeout(() => btn.textContent = 'העתק', 2000);
            });
        });
        pre.style.position = 'relative';
        pre.appendChild(btn);
    });
}

// ============================================
// Progress
// ============================================

function updateProgress() {
    const total = 9;
    const done = completedLessons.filter(l => l.startsWith('lesson-')).length;
    document.getElementById('progressText').textContent = `${done}/${total}`;
    document.getElementById('progressFill').style.width = `${(done / total) * 100}%`;

    // Update nav links
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
    // Nav link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    // Mobile menu
    document.getElementById('menuToggle').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    document.getElementById('overlay').addEventListener('click', closeSidebar);

    // Handle hash navigation
    const hash = window.location.hash.slice(1);
    if (hash && pages.includes(hash)) {
        navigateTo(hash);
    }

    // Update progress
    updateProgress();

    // Hash change
    window.addEventListener('hashchange', () => {
        const h = window.location.hash.slice(1);
        if (h && pages.includes(h)) {
            navigateTo(h);
        } else if (!h) {
            navigateTo('home');
        }
    });
});
