// Intersection Observer for timeline items
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    // Handle screenshot gallery
    const screenshotBtn = document.querySelector('.screenshot-btn');
    const screenshotGallery = document.querySelector('.screenshot-gallery');
    let isGalleryOpen = false;
    
    if (screenshotBtn && screenshotGallery) {
        screenshotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            isGalleryOpen = !isGalleryOpen;
            screenshotGallery.classList.toggle('active');
            
            // Update button text and icon
            if (isGalleryOpen) {
                screenshotBtn.innerHTML = `<i class="fas fa-times"></i> Hide Screenshots`;
            } else {
                screenshotBtn.innerHTML = `<i class="fas fa-images"></i> View Screenshots`;
            }
        });
        
        // Only close when clicking the button or outside the gallery
        document.addEventListener('click', (e) => {
            if (isGalleryOpen && 
                !screenshotBtn.contains(e.target) && 
                !screenshotGallery.contains(e.target)) {
                isGalleryOpen = false;
                screenshotGallery.classList.remove('active');
                screenshotBtn.innerHTML = `<i class="fas fa-images"></i> View Screenshots`;
            }
        });
    }

    // Handle expandable features
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        const header = item.querySelector('.feature-header');
        
        header.addEventListener('click', () => {
            // Close other expanded items
            featureItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                }
            });
            
            // Toggle current item
            item.classList.toggle('expanded');
        });
    });
}); 