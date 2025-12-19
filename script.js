/**
 * Function to play sound and trigger unique visual effects
 */
function playSound(e) {
    let keyCode;
    
    // Check if event is keyboard or click
    if (e.type === 'keydown') {
        keyCode = e.keyCode;
    } else {
        // If clicked, get the data-key from the element or its parent
        keyCode = this.getAttribute('data-key');
    }

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const card = document.querySelector(`.animal-card[data-key="${keyCode}"]`);

    if (!audio) return; 

    audio.currentTime = 0; // Rewind to start
    audio.play();

    if (card) {
        /**
         * -----------------------------------------
         * #8: Creative element not learned in class
         * -----------------------------------------
         * Instead of a static colored glow, I inject a CSS Variable (--glow-color)
         * based on the 'data-color' attribute in the HTML. 
         * This allows each animal (even the scary one's) to have its own unique glow color.
         * Usage of 'style.setProperty' allows JS to communicate directly with CSS logic.
         */
        const specificColor = card.getAttribute('data-color');
        if (specificColor) {
            card.style.setProperty('--glow-color', specificColor);
        }

        card.classList.add('playing');
    }
}

/**
 * The 'transitionend' event fires when a CSS transition has finished.
 * This is used to remove the 'playing' class exactly when the animation ends.
 */
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

// Event Listeners
window.addEventListener('keydown', playSound);

const cards = document.querySelectorAll('.animal-card');
cards.forEach(card => {
    card.addEventListener('click', playSound);
    card.addEventListener('transitionend', removeTransition);
});

// Start background music on first interaction (due to browser policies)
window.addEventListener('mousedown', () => {
    const bgMusic = document.getElementById('bg-music');
    if(bgMusic) {
        bgMusic.volume = 0.1;
        bgMusic.play().catch(e => console.log("Audio play blocked"));
    }
}, { once: true }); // Runs only once