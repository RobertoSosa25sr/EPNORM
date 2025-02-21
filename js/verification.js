document.addEventListener('DOMContentLoaded', function() {
    // For demo purposes, set default user data if none exists
    if (!sessionStorage.getItem('pendingUser')) {
        const defaultUser = {
            name: "Roberto Sosa",
            email: "roberto.sosa@epn.edu.ec",
            phone: "+593987654321",
            password: "admin123"
        };
        sessionStorage.setItem('pendingUser', JSON.stringify(defaultUser));
    }

    // Set default verification status to false
    if (!sessionStorage.getItem('isVerified')) {
        sessionStorage.setItem('isVerified', 'false');
    }

    // Set progress bar to initial state
    document.getElementById('verificationProgress').style.width = '50%';
});

function verifyEmail() {
    const code = document.getElementById('emailCode').value;
    if (code.length !== 6) {
        alert('Please enter a valid 6-digit code');
        return;
    }

    // Move directly to summary
    document.getElementById('emailStep').classList.remove('active');
    document.getElementById('summaryStep').classList.add('active');
    document.getElementById('verificationProgress').style.width = '100%';
    showSummary();
}

function showSummary() {
    // Get user data and populate summary
    const userData = JSON.parse(sessionStorage.getItem('pendingUser'));
    
    document.getElementById('summaryName').textContent = userData.name;
    document.getElementById('summaryEmail').textContent = userData.email;
    document.getElementById('summaryPhone').textContent = userData.phone;

    // Switch to summary step
    document.getElementById('emailStep').classList.remove('active');
    document.getElementById('summaryStep').classList.add('active');
    document.getElementById('verificationProgress').style.width = '100%';
}

function completeRegistration() {
    const userData = JSON.parse(sessionStorage.getItem('pendingUser'));
    
    // Here you would typically send the final registration data to your backend
    // For demo purposes, we'll just show a success message and redirect
    alert('Registration completed successfully!');
    // Mark user as verified
    sessionStorage.setItem('isVerified', 'true');
    sessionStorage.removeItem('pendingUser');
    
    // Check if there's a return URL
    const returnTo = sessionStorage.getItem('returnTo');
    if (returnTo) {
        sessionStorage.removeItem('returnTo');
        window.location.href = returnTo;
    } else {
        window.location.href = 'dashboard.html';
    }
}

function goBack() {
    // Redirect back to signup page
    window.location.href = 'index.html';
}

function resendEmailCode() {
    // Here you would typically trigger a new email code
    alert('New verification code sent to your email');
} 