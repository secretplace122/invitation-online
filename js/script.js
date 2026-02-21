const App = {
    init: function() {
        this.mobileMenu();
        this.smoothScroll();
        this.activeMenuHighlight();
    },

    mobileMenu: function() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navLinks.classList.toggle('active');
            });

            document.addEventListener('click', function(e) {
                if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
        }
    },

    smoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    document.getElementById('navLinks')?.classList.remove('active');
                }
            });
        });
    },

    activeMenuHighlight: function() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');

        if (sections.length === 0) return;

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href').replace('#', '');
                if (href === current) {
                    item.classList.add('active');
                }
            });
        });
    }
};

function setPatternBg(patternName) {
    const patternDiv = document.querySelector('.pattern-bg');
    if (patternDiv) {
        patternDiv.style.backgroundImage = `url('/images/patterns/${patternName}')`;
    }
}

document.addEventListener('DOMContentLoaded', () => App.init());