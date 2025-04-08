// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Nav Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active'); // You'll need CSS for .nav-active

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
             // Burger Animation
             burger.classList.toggle('toggle');
        });
    }

    // Set Current Year in Footer
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Basic Portfolio Modal Trigger (More detailed logic in gallery.js if needed)
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    if(modal && closeModalBtn) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                // TODO: Fetch project details based on item's data attribute
                // Update modal content (title, video, description)
                // For now, just show the modal
                modal.style.display = 'block';
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            // Optional: Pause video if playing
        });

        // Close modal if clicking outside the content
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
                 // Optional: Pause video if playing
            }
        });
    }

}); // End DOMContentLoaded

// CSS for nav-active and burger toggle needs to be added in components.css/responsive.css
// @keyframes navLinkFade needs to be added in animations.css