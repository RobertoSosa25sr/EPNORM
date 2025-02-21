function showTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        const cancelOptions = document.createElement('div');
        cancelOptions.innerHTML = `
            <div class="cancel-options">
                <h3>Cancel Booking</h3>
                <label class="radio">
                    <input type="radio" name="cancelType" value="single" checked>
                    Cancel only this occurrence
                </label>
                <label class="radio">
                    <input type="radio" name="cancelType" value="future">
                    Cancel this and all future occurrences
                </label>
                <label class="radio">
                    <input type="radio" name="cancelType" value="all">
                    Cancel entire series
                </label>
            </div>
        `;
        
        // Here you would typically show this in a modal
        // For now, we'll just use confirm
        if (confirm('Cancel this occurrence only or the entire series?')) {
            alert('Booking(s) canceled successfully');
            location.reload();
        }
    }
}

function modifyBooking(bookingId) {
    // Here you would typically redirect to a booking modification page
    alert('Modify booking functionality coming soon');
}

function bookAgain(bookingId) {
    // Here you would typically redirect to the booking page with pre-filled details
    window.location.href = 'spaces.html';
}

function modifyRecurring(bookingId) {
    // Redirect to booking modification page with series ID
    window.location.href = `booking.html?modify=series&id=${bookingId}`;
}

function cancelRecurring(bookingId) {
    if (confirm('Are you sure you want to cancel the entire booking series?')) {
        alert('Booking series canceled successfully');
        location.reload();
    }
} 