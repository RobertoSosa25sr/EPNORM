document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;

    // Handle time slot selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', () => {
            // Remove selection from other slots
            document.querySelectorAll('.time-slot').forEach(s => {
                s.classList.remove('selected');
            });
            // Add selection to clicked slot
            slot.classList.add('selected');
            updateSummary();
        });
    });

    // Handle duration changes
    document.getElementById('duration').addEventListener('change', updateSummary);

    // Handle service selection
    document.querySelectorAll('.service-item input').forEach(service => {
        service.addEventListener('change', updateSummary);
    });
});

function updateSummary() {
    const duration = parseInt(document.getElementById('duration').value);
    const baseRate = 40; // $40 per hour
    const spaceTotal = baseRate * duration;

    let servicesTotal = 0;
    document.querySelectorAll('.service-item input:checked').forEach(service => {
        switch(service.id) {
            case 'projector':
                servicesTotal += 10;
                break;
            case 'catering':
                servicesTotal += 20;
                break;
            case 'whiteboard':
                servicesTotal += 5;
                break;
        }
    });

    const serviceFee = 5;
    const total = spaceTotal + servicesTotal + serviceFee;

    // Update summary display
    const summaryItems = document.querySelectorAll('.summary-item');
    summaryItems[0].innerHTML = `<span>Space Rental (${duration} hour${duration > 1 ? 's' : ''})</span><span>$${spaceTotal.toFixed(2)}</span>`;
    summaryItems[1].innerHTML = `<span>Additional Services</span><span>$${servicesTotal.toFixed(2)}</span>`;
    summaryItems[2].innerHTML = `<span>Service Fee</span><span>$${serviceFee.toFixed(2)}</span>`;
    summaryItems[3].innerHTML = `<span>Total</span><span>$${total.toFixed(2)}</span>`;
}

function confirmBooking() {
    const selectedTime = document.querySelector('.time-slot.selected');
    if (!selectedTime) {
        alert('Please select a time slot');
        return;
    }

    alert('Booking confirmed! You will receive a confirmation email shortly.');
    window.location.href = 'dashboard.html';
} 