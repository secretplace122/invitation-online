document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuBtn.querySelectorAll('span').forEach(span => span.classList.toggle('active'));
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn?.querySelectorAll('span').forEach(span => span.classList.remove('active'));
            }
        });

        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn?.querySelectorAll('span').forEach(span => span.classList.remove('active'));
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navLinks?.classList.remove('active');
            }
        });
    });

    const examples = [
        { image: '/images/examples/wedding-1.jpg', title: 'Свадебное приглашение' },
        { image: '/images/examples/birthday-1.jpg', title: 'Приглашение на день рождения' },
        { image: '/images/examples/corporate-1.jpg', title: 'Корпоративное приглашение' },
        { image: '/images/examples/wedding-2.jpg', title: 'Нежная свадьба' },
        { image: '/images/examples/birthday-2.jpg', title: 'Детский праздник' },
        { image: '/images/examples/housewarming-1.jpg', title: 'Новоселье' }
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = examples.map(ex => `
            <div class="gallery-item">
                <img src="${ex.image}" alt="${ex.title}" loading="lazy">
                <h3 class="gallery-item-title">${ex.title}</h3>
            </div>
        `).join('');
    }

    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            item.classList.toggle('active');
        });
    });
});