// Mood data configuration
const moodData = {
    happy: {
        emoji: "😊",
        title: "Feeling Happy!",
        quote: "Joy is the simplest form of gratitude.",
        tip: "Try sharing your happiness with someone today! It will multiply your joy.",
        bgEmoji: ["🌞", "🌈", "✨", "🌸", "🎉"]
    },
    sad: {
        emoji: "😢",
        title: "Feeling Sad",
        quote: "Tears water our growth. It's okay to not be okay.",
        tip: "Consider calling a friend or writing in a journal. Your feelings are valid.",
        bgEmoji: ["🌧️", "☁️", "💧", "🌊", "🕊️"]
    },
    angry: {
        emoji: "😠",
        title: "Feeling Angry",
        quote: "Anger is just sadness with nowhere to go. Breathe through it.",
        tip: "Try the 4-7-8 technique: Inhale for 4, hold for 7, exhale for 8 seconds.",
        bgEmoji: ["🔥", "⚡", "💥", "🌋", "☄️"]
    },
    neutral: {
        emoji: "😐",
        title: "Feeling Neutral",
        quote: "Still waters run deep. Your calm is your strength.",
        tip: "Try mindfulness meditation to connect with your inner state.",
        bgEmoji: ["🍃", "🌫️", "🌌", "🌀", "⚪"]
    }
};

// App state
let moodHistory = [];
const maxHistory = 5;
let currentMood = null;

// DOM elements
const moodCard = document.getElementById('moodCard');
const moodEmoji = document.getElementById('moodEmoji');
const moodName = document.getElementById('mood-name');
const moodQuote = document.getElementById('moodQuote');
const moodTip = document.getElementById('moodTip');
const historyItems = document.getElementById('historyItems');
const emojiShower = document.querySelector('.emoji-shower');

// Initialize the app
function init() {
    createParticles();
    // Start with neutral mood
    changeMood('neutral');
}

// Change mood function
function changeMood(mood) {
    if (currentMood === mood) return;
    
    currentMood = mood;
    const data = moodData[mood];
    
    // Add animation classes
    moodCard.classList.add('animate-rotate');
    moodEmoji.classList.add('animate-pop');
    moodName.classList.add('animate-pop');
    
    setTimeout(() => {
        // Update card appearance
        moodCard.className = 'mood-card ' + mood;
        
        // Update mood display
        moodEmoji.textContent = data.emoji;
        moodName.textContent = data.title;
        moodQuote.textContent = data.quote;
        moodTip.innerHTML = `<div class="tip-icon">💡</div><p>${data.tip}</p>`;
        
        // Create emoji shower effect
        createEmojiShower(data.bgEmoji);
        
        // Add to history
        addToHistory(mood);
        
        // Remove animation classes
        setTimeout(() => {
            moodCard.classList.remove('animate-rotate');
            moodEmoji.classList.remove('animate-pop');
            moodName.classList.remove('animate-pop');
        }, 600);
    }, 100);
}

// Create emoji shower effect
function createEmojiShower(emojis) {
    emojiShower.innerHTML = '';
    const showerCount = 15;
    
    for (let i = 0; i < showerCount; i++) {
        const emojiSpan = document.createElement('span');
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        emojiSpan.textContent = randomEmoji;
        emojiSpan.style.left = `${Math.random() * 100}%`;
        emojiSpan.style.top = `${Math.random() * -50}px`;
        emojiSpan.style.animationDuration = `${Math.random() * 2 + 2}s`;
        emojiSpan.style.animationDelay = `${Math.random() * 1}s`;
        emojiShower.appendChild(emojiSpan);
    }
}

// Add mood to history
function addToHistory(mood) {
    if (moodHistory[0] !== mood) {
        moodHistory.unshift(mood);
        
        if (moodHistory.length > maxHistory) {
            moodHistory.pop();
        }
        
        updateHistoryDisplay();
    }
}

// Update history display
function updateHistoryDisplay() {
    historyItems.innerHTML = '';
    
    moodHistory.forEach((mood, index) => {
        const item = document.createElement('div');
        item.className = 'history-item ' + mood;
        item.textContent = moodData[mood].emoji;
        item.title = moodData[mood].title;
        item.onclick = () => changeMood(mood);
        item.style.animationDelay = `${index * 0.1}s`;
        historyItems.appendChild(item);
    });
}

// Create particle background effect
function createParticles() {
    const particles = document.getElementById('particles');
    const particleCount = 20; // Reduced for performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 3 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.4})`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animation = `float ${Math.random() * 8 + 8}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particles.appendChild(particle);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);