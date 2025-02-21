document.addEventListener('DOMContentLoaded', function() {
    // Check if user is verified
    const isVerified = sessionStorage.getItem('isVerified') === 'true';
    
    // Add click handler to Book Now button
    document.querySelector('.space-price .button').addEventListener('click', (e) => {
        e.preventDefault();
        if (!isVerified) {
            alert('Identity verification is required to book spaces. Redirecting to verification page...');
            sessionStorage.setItem('returnTo', window.location.href);
            window.location.href = 'account-settings.html';
        } else {
            window.location.href = 'booking.html';
        }
    });

    // Handle gallery thumbnail clicks
    const thumbnails = document.querySelectorAll('.thumbnail-grid img');
    const mainImage = document.querySelector('.main-image img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Update main image
            mainImage.src = thumb.src;
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Handle question submission
    const questionForm = document.querySelector('.ask-question');
    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textarea = questionForm.querySelector('textarea');
        if (textarea.value.trim()) {
            alert('Question sent! The host will be notified.');
            textarea.value = '';
        }
    });
});