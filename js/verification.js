document.addEventListener('DOMContentLoaded', function() {
    // Set initial progress
    document.getElementById('verificationProgress').style.width = '33%';
    setupDocumentUpload();
});

function setupDocumentUpload() {
    const uploadArea = document.getElementById('documentUpload');
    const input = document.getElementById('documentInput');

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
}

function handleDocumentFile(file) {
    if (file) {
        // Here you would typically upload the file to your backend
        document.getElementById('documentUpload').classList.add('uploaded');
    }
}

function verifyDocument() {
    // Move to face verification
    document.getElementById('documentStep').classList.remove('active');
    document.getElementById('faceStep').classList.add('active');
    document.getElementById('verificationProgress').style.width = '66%';
}

let stream = null;

async function toggleCamera() {
    try {
        if (!stream) {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.getElementById('videoElement');
            video.srcObject = stream;
            video.hidden = false;
            document.getElementById('cameraPlaceholder').hidden = true;
            document.getElementById('cameraButton').textContent = 'Stop Camera';
            document.getElementById('photoButton').disabled = false;
        } else {
            stopCamera();
        }
    } catch (err) {
        alert('Unable to access camera: ' + err);
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
        document.getElementById('videoElement').hidden = true;
        document.getElementById('cameraPlaceholder').hidden = false;
        document.getElementById('cameraButton').textContent = 'Start Camera';
        document.getElementById('photoButton').disabled = true;
    }
}

function takePhoto() {
    const video = document.getElementById('videoElement');
    const canvas = document.getElementById('photoCanvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    stopCamera();
    canvas.hidden = false;
    document.getElementById('continueButton').disabled = false;
}

function verifyFace() {
    // Move to summary
    document.getElementById('faceStep').classList.remove('active');
    document.getElementById('summaryStep').classList.add('active');
    document.getElementById('verificationProgress').style.width = '100%';
}

function completeVerification() {
    // Mark user as verified
    sessionStorage.setItem('isVerified', 'true');
    
    // Return to previous page
    const returnTo = sessionStorage.getItem('returnTo');
    if (returnTo) {
        sessionStorage.removeItem('returnTo');
        window.location.href = returnTo;
    } else {
        window.location.href = 'account-settings.html';
    }
} 