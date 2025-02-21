let currentChat = null;

function loadChat(chatId) {
    // Update active chat
    document.querySelectorAll('.chat-item').forEach(chat => {
        chat.classList.remove('active');
    });
    document.querySelector(`.chat-item[onclick="loadChat('${chatId}')"]`).classList.add('active');

    // On mobile, show chat area and hide chat list
    if (window.innerWidth <= 768) {
        document.querySelector('.chats-list').classList.remove('active');
        document.querySelector('.chat-area').classList.add('active');
    }

    currentChat = chatId;
    // Here you would typically load the chat history from your backend
}

function sendMessage() {
    const input = document.querySelector('.chat-input input');
    const message = input.value.trim();

    if (message && currentChat) {
        // Add message to chat
        const chatMessages = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        messageElement.innerHTML = `
            <p>${message}</p>
            <span class="time">${formatTime(new Date())}</span>
        `;
        chatMessages.appendChild(messageElement);

        // Clear input
        input.value = '';

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // If chatting with AI Assistant, generate response
        if (currentChat === 'ai') {
            setTimeout(() => {
                const aiResponse = document.createElement('div');
                aiResponse.className = 'message ai';
                aiResponse.innerHTML = `
                    <div class="assistant-header">
                        <i class="fas fa-robot"></i> AI Assistant
                    </div>
                    <p>${generateAIResponse(message)}</p>
                    <span class="time">${formatTime(new Date())}</span>
                `;
                chatMessages.appendChild(aiResponse);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }

        // Here you would typically send the message to your backend
    }
}

function generateAIResponse(message) {
    // Simple response generation based on keywords
    const msg = message.toLowerCase();
    if (msg.includes('conflict') || msg.includes('double') || msg.includes('problem')) {
        return "I'll look into this issue immediately and help resolve any conflicts. Could you provide the booking reference number?";
    } else if (msg.includes('cancel') || msg.includes('reschedule')) {
        return "I can help you with modifying your booking. Would you like to cancel or reschedule? I'll check available slots and ensure a smooth transition.";
    } else if (msg.includes('available') || msg.includes('book')) {
        return "I'll check the availability and help you find the perfect space. What dates and times are you interested in?";
    } else {
        return "I'm here to help! I can assist with bookings, resolve conflicts, check availability, or answer any questions about our spaces. What would you like to know?";
    }
}

function viewBooking(bookingId) {
    window.location.href = `my-bookings.html?booking=${bookingId}`;
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
}

// Handle enter key in input
document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.chat-input input');
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Show chats list on mobile back button
    if (window.innerWidth <= 768) {
        document.querySelector('.chat-area').addEventListener('click', function(e) {
            if (e.target.matches('.back-button')) {
                document.querySelector('.chats-list').classList.add('active');
                document.querySelector('.chat-area').classList.remove('active');
            }
        });
    }
}); 