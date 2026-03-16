document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.timeline-step');
    const circle = document.getElementById('progress-circle');
    const progressText = document.getElementById('progress-text');

    const updateProgress = () => {
        const total = steps.length;
        let completed = 0;

        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            // If the card is above the center of the screen, consider it "reached"
            if (rect.top < window.innerHeight / 2) {
                completed = index + 1;
            }
        });

        const percentage = Math.round((completed / total) * 100);
        
        // Update SVG Circle
        const offset = 100 - percentage;
        circle.style.strokeDasharray = `${percentage}, 100`;
        
        // Update Text
        progressText.innerText = `${percentage}%`;
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
});
