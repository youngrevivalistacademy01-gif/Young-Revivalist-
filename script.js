/**
 * Scripture Carousel Logic for YRA Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Safety check to ensure slides exist
    if (slides.length === 0) return;

    function showNextSlide() {
        // Fade out current
        slides[currentSlide].classList.remove('active');
        
        // Calculate next index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Fade in next
        slides[currentSlide].classList.add('active');
    }

    // Interval set to 6 seconds for comfortable reading
    // In a real-world scenario, we might pause this on hover
    const slideInterval = setInterval(showNextSlide, 6000);
});
