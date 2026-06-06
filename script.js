// ==========================================
// 1. GLOBAL SCOPE BOUND FUNCTIONS (For HTML Inline Calls)
// ==========================================

// Project Filter Interface
window.filterProjects = function(category) {
    const cards = document.querySelectorAll('.project-card');
    const btns = document.querySelectorAll('.filter-btn');
    
    if (window.event && window.event.target) {
        btns.forEach(btn => {
            btn.classList.remove('bg-primary', 'text-white', 'border-primary');
            btn.classList.add('border-gray-300', 'dark:border-gray-700', 'text-slate-600', 'dark:text-gray-400');
        });
        window.event.target.classList.add('bg-primary', 'text-white', 'border-primary');
    }

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden-item');
        } else {
            card.classList.add('hidden-item');
        }
    });
};

// Certification Secure Overlay Modal Controller
window.openCert = function(src) {
    const modal = document.getElementById('certModal');
    const certImg = document.getElementById('certImage');
    if (modal && certImg) {
        certImg.src = src;
        modal.classList.add('active');
    }
};

window.closeCert = function() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
    }
};

// Video Stream Interface Controller
window.toggleVideoModal = function() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('projectVideo');
    if (modal) {
        modal.classList.toggle('active');
        if (!modal.classList.contains('active') && iframe) {
            const src = iframe.src; 
            iframe.src = src; 
        }
    }
};

// Tooltip Toast Trigger Helper
function triggerNotificationToast(textMessage) {
    const toastEl = document.getElementById('system-toast');
    const messageEl = document.getElementById('toast-message');
    if (toastEl && messageEl) {
        messageEl.innerText = textMessage;
        toastEl.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        toastEl.classList.add('opacity-100', 'scale-100');
        
        setTimeout(() => {
            toastEl.classList.remove('opacity-100', 'scale-100');
            toastEl.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        }, 3000);
    }
}

// Client Clipboards Interface Helper with Integrated Toast Message Fix
window.copyEmail = function() {
    const emailText = "jannnicole.c.sanjose@gmail.com";
    navigator.clipboard.writeText(emailText).then(() => {
        triggerNotificationToast("Email copied successfully!");
    }).catch(err => {
        console.error('System write processing execution aborted: ', err);
    });
};

// ==========================================
// 2. DOM CONTENT RENDERING INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        
        setTimeout(() => {
            const footerIcons = document.querySelectorAll('#connect .group svg');
            footerIcons.forEach(svg => {
                svg.style.width = '40px';
                svg.style.height = '40px';
                svg.style.display = 'block';
            });
        }, 50); 
    }

    // Modern Interface Matrix Theme Toggle Setup
    const toggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (themeIcon) {
                themeIcon.innerText = html.classList.contains('dark') ? '🌙' : '☀️';
            }
        });
    }

    // Web3Forms Node Execution API Handler
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            if (result) result.innerHTML = "Processing...";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    if (result) {
                        result.classList.add('text-green-500');
                        result.innerHTML = "Redirecting...";
                    }
                    setTimeout(() => {
                        window.location.href = form.redirect.value;
                    }, 1000);
                } else {
                    if (result) {
                        result.classList.add('text-primary');
                        result.innerHTML = res.message;
                    }
                }
            })
            .catch(error => {
                console.error(error);
                if (result) result.innerHTML = "Something went wrong!";
            })
            .then(function() {
                form.reset();
            });
        });
    }
});

// Structural Client Context Protection Matrix Handling
window.addEventListener('contextmenu', function (e) {
    if (e.target && e.target.classList.contains('no-save')) { 
        e.preventDefault(); 
    }
}, false);