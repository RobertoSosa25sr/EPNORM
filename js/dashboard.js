function toggleActivity() {
    const modal = document.getElementById('activityModal');
    modal.classList.add('active');
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

function hideActivity() {
    const modal = document.getElementById('activityModal');
    modal.classList.remove('active');
    // Restore background scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('activityModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideActivity();
        }
    });
}); 