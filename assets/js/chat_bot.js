document.getElementById('chat-button').addEventListener('click', function() {
    const chatWidget = document.getElementById('chat-widget');
    if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
        chatWidget.style.display = 'flex';
    } else {
        chatWidget.style.display = 'none';
    }
});

document.getElementById('chat-send').addEventListener('click', function() {
    const input = document.getElementById('chat-input');
    const message = input.value;
    if (message.trim()) {
        const chatBody = document.getElementById('chat-body');
        const newMessage = document.createElement('p');
        newMessage.textContent = message;
        chatBody.appendChild(newMessage);
        
        const thankYouMessage = document.createElement('p');
        thankYouMessage.textContent = 'Cảm ơn phản hồi từ Anh/Chị';
        thankYouMessage.style.fontStyle = 'italic';
        thankYouMessage.style.color = '#007bff';
        chatBody.appendChild(thankYouMessage);
        
        input.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
