window.addEventListener("load", function(){

    // Grab stuff from DOM
    const wordEl = document.getElementById("word");
    const wrongLettersEl = document.getElementById("wrong-letters");
    const playAgainBtn = document.getElementById("play-button");
    const popup = document.getElementById("popup-container");
    const notification = document.getElementById("notification-container");
    const finalMessage = document.getElementById("final-message");
    const finalMessageRevealWord = document.getElementById("final-message-reveal-word");
    const figureParts = document.querySelectorAll(".figure-part");
  
    const words = [
      "structure", "backtracking", "linked", "jamstack",
      "macbookpro", "programming", "rustand", "algorithms", "tailwind",
      "rendering", "performance",
    ];
    const correctLetters = [];
    const wrongLetters = [];
  
  
    let idx = -1;
    function getNextWord(){
      idx = (idx+1) % words.length;
      return words[idx];
    }
  
    let selectedWord = getNextWord();
    displayWord();
  
    // show hidden word
    function displayWord() {
      wordEl.innerHTML = `
        
        ${selectedWord
          .split("")
          .map(
            letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </span>
            
            `
          )
          .join("")}
        
        `;
  
      const innerWord = wordEl.innerText.replace(/\n/g, "");
      if (innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! You Won 🌟";
        finalMessageRevealWord.innerText = "";
  
        popup.style.display = "flex";
      }
    }
  
  
    // Update wrong letters
    function updateWrongLettersEl() {
      // display wrong letters
      wrongLettersEl.innerHTML = `
        
        ${wrongLetters.length > 0 ? "<p>Wrong inputs</p>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
        
        `;
  
      // display figure parts
      figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
  
        if (index < errors) {
          part.style.display = "block";
        } else {
          part.style.display = "none";
        }
      });
  
      // check if lost
      if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "Unfortunately, you Lost 😢";
        finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
        popup.style.display = "flex";
      }
    }
  
  
    // show notification
    function showNotification() {
      notification.classList.add("show");
  
      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    }
  
  
    // Keydown event listeners -- letter press
    window.addEventListener("keydown", e => {
      const keyCode = e.keyCode || e.which;
  
      if ( (keyCode >= 65 && keyCode <= 90) || /^[a-zA-Z]$/.test(e.key) ) {
        const letter = e.key;
  
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
  
            displayWord();
          } else {
            showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
  
            updateWrongLettersEl();
          } else {
            showNotification();
          }
        }
      }
    });
  
  
    // restart game and play again
    playAgainBtn.addEventListener("click", () => {
      // Empty the arrays
      correctLetters.splice(0);
      wrongLetters.splice(0);
  
      selectedWord = getNextWord();
      displayWord();
  
      updateWrongLettersEl();
      popup.style.display = "none";
    });
    
  
  });
  