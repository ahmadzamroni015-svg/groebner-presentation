// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Slide Navigation
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
const totalSlides = slides.length;

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlides();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlides();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Button click
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Indicator click
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateSlides();
    });
});

// Fungsi copy kode Singular
function copyCode() {
    const codeElement = document.getElementById('singularCode');
    if (!codeElement) {
        console.error('Element singularCode tidak ditemukan');
        return;
    }
    
    // Ambil teks asli tanpa tag HTML span
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = codeElement.innerHTML;
    const codeText = tempDiv.textContent || tempDiv.innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Copied!';
            btn.style.background = '#00ff88';
            btn.style.color = '#0a0f1e';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '#FF5E00';
                btn.style.color = 'white';
            }, 2000);
        }
    }).catch(err => {
        console.error('Gagal copy: ', err);
        alert('Gagal menyalin kode. Silakan copy manual.');
    });
}

// Initialize particles
createParticles();

// Cek apakah semua gambar loading dengan baik
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        console.log('Image not found: ' + this.src);
    });
});

// Smooth scroll untuk overflow slide
slides.forEach(slide => {
    slide.addEventListener('wheel', (e) => {
        const isScrollable = slide.scrollHeight > slide.clientHeight;
        if (isScrollable) {
            e.stopPropagation();
        }
    });
});
// Fungsi copy kode dari elemen tertentu (untuk semua slide)
function copyCodeFromElement(elementId) {
    const codeElement = document.getElementById(elementId);
    if (!codeElement) {
        console.error('Element ' + elementId + ' tidak ditemukan');
        return;
    }
    
    // Ambil teks asli tanpa tag HTML span
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = codeElement.innerHTML;
    let codeText = tempDiv.textContent || tempDiv.innerText;
    
    // Bersihkan spasi berlebih di awal/akhir
    codeText = codeText.trim();
    
    navigator.clipboard.writeText(codeText).then(() => {
        // Cari tombol copy di dalam wrapper yang sama
        const wrapper = codeElement.closest('.code-block-wrapper');
        if (wrapper) {
            const btn = wrapper.querySelector('.copy-btn');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '✅ Copied!';
                btn.style.background = '#00ff88';
                btn.style.color = '#0a0f1e';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '#FF5E00';
                    btn.style.color = 'white';
                }, 2000);
            }
        }
    }).catch(err => {
        console.error('Gagal copy: ', err);
        alert('Gagal menyalin kode. Silakan copy manual.');
    });
}