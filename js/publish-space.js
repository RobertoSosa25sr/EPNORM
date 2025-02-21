document.addEventListener('DOMContentLoaded', function() {
    setupPhotoUploads();
});

function setupPhotoUploads() {
    const photoUploads = document.querySelectorAll('.photo-upload');
    
    photoUploads.forEach(upload => {
        const input = upload.querySelector('input');
        
        upload.addEventListener('click', () => input.click());
        
        input.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    upload.style.backgroundImage = `url(${e.target.result})`;
                    upload.style.backgroundSize = 'cover';
                    upload.style.backgroundPosition = 'center';
                    upload.querySelector('i').style.display = 'none';
                    upload.querySelector('p').style.display = 'none';
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    });
}

function nextStep(currentStepId, nextStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(nextStepId).classList.add('active');
}

function prevStep(currentStepId, prevStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(prevStepId).classList.add('active');
}

function publishSpace() {
    // Here you would typically submit all the form data to your backend
    
    // Show success step
    document.getElementById('pricingStep').classList.remove('active');
    document.getElementById('successStep').classList.add('active');
} 