// PLAYER

let POS1 = true;
let POS2 = false;
let POS3 = false;
let lastPressTime = 0; 

let GameOver = false;
let fails = 3;

let GameStart = false;

let left = document.getElementById('p1');
let middle = document.getElementById('p2');
let right = document.getElementById('p3');

function updatePositions() {
    if (POS1) {
        left.style.visibility = 'visible';
        middle.style.visibility = 'hidden';
        right.style.visibility = 'hidden';
    } else if (POS2) {
        left.style.visibility = 'hidden';
        middle.style.visibility = 'visible';
        right.style.visibility = 'hidden';
    } else if (POS3) {
        left.style.visibility = 'hidden';
        middle.style.visibility = 'hidden';
        right.style.visibility = 'visible';
    }
}

function handleKeyPress(event) {
    const currentTime = Date.now();
    
    // Only proceed if 500ms has passed since the last key press
    if (currentTime - lastPressTime > 500) {
        lastPressTime = currentTime;

        if (event.key === 'ArrowRight') {
            if (POS1) {
                POS1 = false;
                POS2 = true;
            } else if (POS2) {
                POS2 = false;
                POS3 = true;
            }
        } else if (event.key === 'ArrowLeft') {
            if (POS3) {
                POS3 = false;
                POS2 = true;
            } else if (POS2) {
                POS2 = false;
                POS1 = true;
            }
        }

        updatePositions(); // Update the position based on the current state
    }
}

// Event listener for keyboard presses
window.addEventListener('keydown', handleKeyPress);

// Initialize the first state
updatePositions();



// FIRES CONTROLLER

let fires = [
    document.getElementById('fire1'),
    document.getElementById('fire2'),
    document.getElementById('fire3'),
    document.getElementById('fire4')
];

let fireIndex = 0;

function showNextFire() {
    // Hide all fires first
    fires.forEach(fire => fire.style.visibility = 'hidden');

    // Make the current fire visible
    fires[fireIndex].style.visibility = 'visible';

    // Move to the next index
    fireIndex = (fireIndex + 1) % fires.length;
}

setInterval(showNextFire, 500);

// FALLING ANIMATIONS


const animation1 = [
    document.getElementById('f35'),
    document.getElementById('f34'),
    document.getElementById('f33'),
    document.getElementById('f1')
];

const animation2 = [
    document.getElementById('f5'),
    document.getElementById('f6'),
    document.getElementById('f7'),
    document.getElementById('f8'),
    document.getElementById('f9'),
    document.getElementById('f29')
];

const animation3 = [
    document.getElementById('f13'),
    document.getElementById('f14'),
    document.getElementById('f15'),
    document.getElementById('f16'),
    document.getElementById('f17'),
    document.getElementById('f21')
];

const animation4 = [
    document.getElementById('f22'),
    document.getElementById('f23'),
    document.getElementById('f24'),
    document.getElementById('f25')
];

function animateFall(animationSet, animationId) {
    for (let i = 0; i < animationSet.length; i++) {
        setTimeout(() => {
            animationSet[i].style.visibility = 'visible'; 
            if (i > 0) {
                animationSet[i - 1].style.visibility = 'hidden'; 
            }
        }, i * 500); 
    }

    setTimeout(() => {
        if (animationId === 1 && POS1) {
            animateFall(animation2, 2); 
        } else if (animationId === 1) {
            document.getElementById('fail1').style.visibility = 'visible';
            if (!GameOver) {
                handleMisses();
                if (fails === 0) {
                    GameOver = true;
                    document.getElementById('gg').style.visibility = 'visible';
                }
                if (!GameOver) {setTimeout(jump, 1000);}
            }
            
        }

        if (animationId === 2 && POS2) {
            animateFall(animation3, 3); 
        } else if (animationId === 2) {
            document.getElementById('fail2').style.visibility = 'visible';
            if (!GameOver) {
                handleMisses();
                if (fails === 0) {
                    GameOver = true;
                    document.getElementById('gg').style.visibility = 'visible';
                }
                if (!GameOver) {setTimeout(jump, 1000);}
            }
        }

        if (animationId === 3 && POS3) {
            animateFall(animation4, 4);
        } else if (animationId === 3) {
            document.getElementById('fail3').style.visibility = 'visible';
            if (!GameOver) {
                handleMisses();
                if (fails === 0) {
                    GameOver = true;
                    document.getElementById('gg').style.visibility = 'visible';
                }
                if (!GameOver) {setTimeout(jump, 1000);}
                
            }
        }

        if (animationId === 4) {
            addScore();
            jump();
        }

        // Hide the last frame after all animations
        animationSet[animationSet.length - 1].style.visibility = 'hidden';
    }, animationSet.length * 500); 
}





// SCORE CONTROLLER
let scoreScreen = document.getElementById('score');
let score = 0;
let failcount = document.getElementById('failcount');
let misses = 3;

function addScore() {
    score++
    scoreScreen.textContent = `Score: ${score}`;
}
function handleMisses() {
    misses--;
    failcount.textContent = `Misses: ${misses}`;
}
// Trigger

let fallStart = document.getElementById('jumptop');

function jump() {
    document.getElementById('fail1').style.visibility = 'hidden';
    document.getElementById('fail2').style.visibility = 'hidden';
    document.getElementById('fail3').style.visibility = 'hidden';
    
    fallStart.style.visibility = 'visible';
    setTimeout(() => {
        fallStart.style.visibility = 'hidden';
        animateFall(animation1, 1);
    }, 500);
}



// GAME START
window.addEventListener('keydown', function(event) {
    if (event.key === ' ' && !GameStart) {
        GameStart = true;
        document.getElementById('welcome').style.visibility = 'hidden';
        jump();
    }
});
