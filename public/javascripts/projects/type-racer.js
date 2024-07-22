window.addEventListener("load", function(){
    const word = document.getElementById("word");
    const text = document.getElementById("text");
    const scoreEl = document.getElementById("score");
    const timeEl = document.getElementById("time");
    const finalScoreTxtEl = document.getElementById("final-score-txt");
    const endgameEl = document.getElementById("end-game-container");
    const restartBtn = document.getElementById("restart-btn");
    const settingsForm = document.getElementById("settings-form");
    const difficultySelect = document.getElementById("difficulty");
  
    // List of words for game
    const words = [
      "silence",
      "stipend",
      "airplane",
      "basketball",
      "pineapple",
      "juice",
      "warlike",
      "badminton",
      "northern",
      "dependent",
      "steering",
      "silver",
      "highest",
      "superficial",
      "quince",
      "eight",
      "feeble",
      "admit",
      "dragged",
      "loving"
    ];
  
    // Init word
    let randomWord, score, time, newWord, timeIntervalId;
  
    // set difficulty to value in local storage or medium
    let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";
  
    // set difficulty select value
    difficultySelect.value = difficulty;
  
    initiateGame();
  
    function initiateGame(){
      randomWord = "", score = 0, time = 10, newWord = "";
      // counting down
      timeIntervalId = setInterval(updateTime, 1000);
  
      addWordToDOM();
  
      // focus on text on start
      text.value = "";
      text.focus();
    }
  
    // Generate random word from array
    function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }
  
    // add word to DOM
    function addWordToDOM() {
      randomWord = getRandomWord();
      word.innerHTML = randomWord;
    }
  
    // function to update score()
    function increaseScore() {
      score++;
      scoreEl.innerHTML = score;
    }
  
    // update time
    function updateTime() {
      time--;
      timeEl.innerHTML = time + " s";
  
      if (time === 0) {
        clearInterval(timeIntervalId);
        gameOver();
      }
    }
  
    // Game over -- show end screen
    function gameOver() {
      finalScoreTxtEl.innerText = `Your final score is ${score}`;
      endgameEl.classList.remove("hide");
    }
  
    restartBtn.addEventListener("click", function(e){
        initiateGame();
        endgameEl.classList.add("hide");
    });
  
    // Typing
    text.addEventListener("input", e => {
      const insertedText = e.target.value;
      // Check if the inserted text is equal to the random word
      if (insertedText.toLowerCase() === randomWord.toLowerCase()) {
        addWordToDOM();
        increaseScore();
  
        // clear
        e.target.value = "";
        if (difficulty === "hard") time += 2;
        else if (difficulty === "medium") time += 3;
        else time += 5;
  
        updateTime();
      }
    });
  
    // Settings btn click
    // settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));
  
    // Settings select
    settingsForm.addEventListener("change", e => {
      difficulty = e.target.value;
      localStorage.setItem("difficulty", difficulty);
    });
  
  })