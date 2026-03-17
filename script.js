let calcExpression = "";

// --- VERBESSERTE WÜRFEL LOGIK ---
function roll(sides) {
  const btn = document.getElementById(`w${sides}`);
  
  // Falls schon ein Ergebnis da steht, zurücksetzen und neu würfeln
  btn.classList.remove('crit');
  btn.classList.add('rolling');
  
  let counter = 0;
  const rollingTicks = 8; // Wie oft die Zahl während der Animation wechselt

  const interval = setInterval(() => {
    // Zufällige Zahl für die Animation
    btn.innerText = Math.floor(Math.random() * sides) + 1;
    counter++;

    if (counter >= rollingTicks) {
      clearInterval(interval);
      btn.classList.remove('rolling');
      
      // Das finale, faire Ergebnis
      const finalResult = Math.floor(Math.random() * sides) + 1;
      btn.innerText = finalResult;

      // Gold-Effekt bei höchstem Wurf
      if (finalResult === sides) {
        btn.classList.add('crit');
      }
    }
  }, 50);
}

function resetDice() {
  ["20", "8", "6"].forEach(s => {
    const btn = document.getElementById(`w${s}`);
    btn.innerText = `W ${s}`;
    btn.classList.remove('crit', 'rolling');
  });
}

// --- IMAGE HANDLING ---
function handleFile(id, event) {
  const file = event.target.files[0];
  const preview = document.getElementById(`preview-${id}`);
  if (file && file.type.startsWith("image/")) {
    const url = URL.createObjectURL(file);
    preview.innerHTML = `<img src="${url}" style="width:100%; height:100%; object-fit:contain;">`;
  }
}

function resetBox(id) {
  document.getElementById(`preview-${id}`).innerHTML = "Click to Upload Image";
  document.getElementById(`input-${id}`).value = "";
}

function resetText(id) {
  document.getElementById(`note-${id}`).value = "";
}

// --- UNIVERSAL FIELD ---
function setUniMode(mode) {
  const imgArea = document.getElementById('uni-image-area');
  const textArea = document.getElementById('uni-text');
  if (mode === 'image') {
    imgArea.classList.remove('hidden');
    textArea.classList.add('hidden');
  } else {
    imgArea.classList.add('hidden');
    textArea.classList.remove('hidden');
  }
}

function handleUniFile(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('uni-preview');
  if (file && file.type.startsWith("image/")) {
    const url = URL.createObjectURL(file);
    preview.innerHTML = `<img src="${url}" style="max-width:100%; max-height:100%;">`;
  }
}

function resetUni() {
  document.getElementById('uni-preview').innerHTML = "Choose Mode or Upload";
  document.getElementById('uni-text').value = "";
  document.getElementById('uni-file').value = "";
}

// --- CALCULATOR ---
function calcPress(val) {
  const display = document.getElementById('calc-display');
  if (val === '=') {
    try {
      // Nutze Function statt eval für etwas mehr Sicherheit
      calcExpression = Function('"use strict";return (' + calcExpression + ')')().toString();
      display.innerText = calcExpression;
    } catch { 
      display.innerText = "Error"; 
      calcExpression = ""; 
    }
  } else {
    calcExpression += val;
    display.innerText = calcExpression;
  }
}

function resetCalc() {
  calcExpression = "";
  document.getElementById('calc-display').innerText = "0";
}

// --- SAVE FUNCTION ---
function saveArchive() {
  const target = document.getElementById('capture-area');
  const btn = document.querySelector('.save-btn');
  const originalText = btn.innerText;
  btn.innerText = "Saving...";
  
  html2canvas(target, {
    backgroundColor: "#0f0f0f",
    scale: 2,
    useCORS: true 
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'Noble-Archive-Save.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
    btn.innerText = originalText;
  });
}

// --- GLOBAL RESET ---
function resetAll() {
  if(confirm("Everything will be cleared. Continue?")) {
    for(let i=1; i<=4; i++) { 
      resetBox(i); 
      resetText(i); 
    }
    resetDice();
    resetCalc();
    resetUni();
  }
}