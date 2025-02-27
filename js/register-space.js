document.addEventListener('DOMContentLoaded', function() {
    setupDocumentUpload();
    setupPhotoUploads();
});

function setupDocumentUpload() {
    const uploadArea = document.getElementById('documentUpload');
    const input = document.getElementById('documentInput');
    const verifyButton = document.getElementById('verifyButton');

    uploadArea.addEventListener('click', () => input.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleDocumentFile(e.dataTransfer.files[0]);
    });

    input.addEventListener('change', (e) => {
        handleDocumentFile(e.target.files[0]);
    });

    function handleDocumentFile(file) {
        if (file) {
            // Here you would typically upload the file to your backend
            uploadArea.classList.add('uploaded');
            verifyButton.disabled = false;
        }
    }
}

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

function verifyDocument() {
    // Move to basic info step
    document.getElementById('documentStep').classList.remove('active');
    document.getElementById('photosStep').classList.add('active');
}

function submitRegistration() {
    // Here you would typically submit the form data to your backend
    
    // Show success step
    document.getElementById('basicInfoStep').classList.remove('active');
    document.getElementById('successStep').classList.add('active');
}

function nextStep(currentStepId, nextStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(nextStepId).classList.add('active');
}

function prevStep(currentStepId, prevStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(prevStepId).classList.add('active');
} 