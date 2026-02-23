document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
            }
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
});
const App = {
    init: function () {
        this.mobileMenu();
        this.smoothScroll();
    },

    mobileMenu: function () {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                navLinks.classList.toggle('active');

                const spans = this.querySelectorAll('span');
                spans.forEach(span => span.classList.toggle('active'));
            });

            document.addEventListener('click', function (e) {
                if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
        }
    },

    smoothScroll: function () {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    document.getElementById('navLinks')?.classList.remove('active');
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());