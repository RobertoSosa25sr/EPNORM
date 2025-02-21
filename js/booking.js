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

function toggleRecurringOptions() {
    const isRecurring = document.getElementById('isRecurring').checked;
    document.getElementById('recurringDetails').style.display = isRecurring ? 'block' : 'none';
    updateSummary();
}

function updateRecurringUI() {
    const recurringType = document.getElementById('recurringType').value;
    document.getElementById('weeklyOptions').style.display = recurringType === 'weekly' ? 'block' : 'none';
    document.getElementById('monthlyOptions').style.display = recurringType === 'monthly' ? 'block' : 'none';
    updateSummary();
}

function updateSummary() {
    const duration = parseInt(document.getElementById('duration').value);
    const baseRate = 40; // $40 per hour
    const spaceTotal = baseRate * duration;
    const isRecurring = document.getElementById('isRecurring').checked;
    let recurringMultiplier = 1;

    if (isRecurring) {
        const recurringType = document.getElementById('recurringType').value;
        const untilDate = new Date(document.getElementById('recurringUntil').value);
        const startDate = new Date(document.getElementById('bookingDate').value);
        
        if (recurringType === 'weekly') {
            const selectedDays = document.querySelectorAll('.day-checkbox input:checked').length;
            const weeks = Math.ceil((untilDate - startDate) / (7 * 24 * 60 * 60 * 1000));
            recurringMultiplier = selectedDays * weeks;
        } else {
            const months = (untilDate.getFullYear() - startDate.getFullYear()) * 12 + 
                          (untilDate.getMonth() - startDate.getMonth());
            recurringMultiplier = months;
        }
    }

    const recurringTotal = spaceTotal * recurringMultiplier;

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
    const total = recurringTotal + servicesTotal + serviceFee;

    // Update summary display
    const summaryItems = document.querySelectorAll('.summary-item');
    summaryItems[0].innerHTML = `
        <span>Space Rental (${duration} hour${duration > 1 ? 's' : ''})
        ${isRecurring ? `<br><small>Recurring ${recurringMultiplier} times</small>` : ''}
        </span>
        <span>$${recurringTotal.toFixed(2)}</span>`;
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

    // Gather recurring booking details if applicable
    const bookingDetails = {
        date: document.getElementById('bookingDate').value,
        time: selectedTime.textContent,
        duration: document.getElementById('duration').value,
        isRecurring: document.getElementById('isRecurring').checked,
    };

    if (bookingDetails.isRecurring) {
        bookingDetails.recurringType = document.getElementById('recurringType').value;
        bookingDetails.untilDate = document.getElementById('recurringUntil').value;
        
        if (bookingDetails.recurringType === 'weekly') {
            bookingDetails.selectedDays = Array.from(document.querySelectorAll('.day-checkbox input:checked'))
                .map(input => input.value);
        }
    }

    alert('Booking confirmed! You will receive a confirmation email shortly.');
    window.location.href = 'dashboard.html';
} 