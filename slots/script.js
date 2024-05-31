const symbols = ["🍒", "🍋", "🍊", "🍉", "🔔", "⭐", "💎"];

function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

function spinReels() {
    document.getElementById("reel1").innerText = getRandomSymbol();
    document.getElementById("reel2").innerText = getRandomSymbol();
    document.getElementById("reel3").innerText = getRandomSymbol();
}

document.getElementById("spinButton").addEventListener("click", spinReels);