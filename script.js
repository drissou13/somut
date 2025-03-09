const motsSud = [
  "fada", "cagol", "pastis", "pagne", "calan", "pouto", "petan", "tchio", "boule", "soupe",
  "olive", "panis", "sarde", "tapon", "gnole", "chich", "massu", "pigne", "rague", "capou",
  "galin", "barjo", "roust", "miche", "tioun", "macan", "daube", "rouga", "cabri", "roule",
  "nifle", "bibin", "bouss", "estru", "flari", "cabri", "degun", "panti", "gambi", "couss",
  "rosco", "macou", "nigno", "berlu", "pount", "coupo", "beret", "boufa", "tatan", "souti",
  "tchac", "poupé", "pinat", "choul", "pouet", "papet", "riant", "zouli", "crado", "tremp",
  "tchat", "mandi", "douce", "moula", "roufi", "clapi", "craqu", "piano", "bravo", "tropo",
  "sarra", "roumi", "drola", "fassi", "gnonc", "tchat", "vieux", "béret", "canou", "pélot",
  "pégre", "coqui", "mouss", "cagot", "bénit", "gitan", "rasto", "sapin", "couri", "vache",
  "basto", "valou", "ranci", "trifo", "titon", "pouri", "vigno", "perdu", "glavi", "cadou"
];

let motSecret = motsSud[Math.floor(Math.random() * motsSud.length)].toUpperCase();
let currentAttempt = 0;
const maxAttempts = 6;

const board = document.getElementById("game-board");
const input = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");

const sonGagne = new Audio("sons/gagne.mp3");
const sonPerdu = new Audio("sons/perdu.mp3");

// Initialiser le plateau
for (let i = 0; i < maxAttempts * 5; i++) {
  const box = document.createElement("div");
  box.classList.add("letter-box");
  board.appendChild(box);
}

submitBtn.addEventListener("click", handleGuess);

function handleGuess() {
  let guess = input.value.trim().toUpperCase();

  if (guess.length !== 5) {
    message.textContent = "Mot à 5 lettres, pitchoun !";
    return;
  }

  if (!motsSud.includes(guess.toLowerCase())) {
    message.textContent = "C’est pas un mot du Sud ça !";
    return;
  }

  const startIndex = currentAttempt * 5;

  for (let i = 0; i < 5; i++) {
    const box = board.children[startIndex + i];
    box.textContent = guess[i];

    if (guess[i] === motSecret[i]) {
      box.classList.add("correct");
    } else if (motSecret.includes(guess[i])) {
      box.classList.add("present");
    } else {
      box.classList.add("absent");
    }
  }

  if (guess === motSecret) {
    message.textContent = "🎉 Bien joué minot ! T’as trouvé le mot !";
    sonGagne.play();
    submitBtn.disabled = true;
    return;
  }

  currentAttempt++;

  if (currentAttempt >= maxAttempts) {
    message.textContent = `🔚 Fini ! Le mot c'était : ${motSecret}`;
    sonPerdu.play();
    submitBtn.disabled = true;
  }

  input.value = "";
  input.focus();
}
