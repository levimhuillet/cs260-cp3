var incorrectAudio = new Audio('./audio/incorrect.mp3');
var neutralAudio = new Audio('./audio/neutral.mp3');
var resetAudio = new Audio('./audio/resetAudioShort.mp3');
var green = new Audio('./audio/green.mp3');
var red = new Audio('./audio/red.mp3');
var blue = new Audio('./audio/blue.mp3');
var yellow = new Audio('./audio/yellow.mp3');

var simon = new Vue({
  el: '#simon',
  data: {
    score: 0, // player's current score
    highScore: 0, // palyer's highest score
    hasHighScore: false, // indicates whether a high score has been recorded
    sequence: [], // correct sequence of flashes
    isAnnouncing: false, // indicates a message needs to be displayed
    message: '', // message to display to the user
    gameInProgress: false, // indicates whether game is running
    isPlayerTurn: false, // marks whether it is the player's turn
    greenFlash: false, // indicates whether the green button is flashing
    redFlash: false, // indicates whether the red button is flashing
    yellowFlash: false, // indicates whether the yellow button is flashing
    blueFlash: false, // indicates whether the blue button is flashing
    // the length of a longer flash, when a clue is being given or a button is being pressed
    CLUE_FLASH_LENGTH: 400,
    // the length of a shorter flash, when the game is being reset
    QUICK_FLASH_LENGTH: 100,
    selectIndex: 0, // the index of the current color to guess in the sequence
  },
  computed: {
    /* Getters */
    hasHighScore() {
      return this.hasHighScore;
    },
    gameInProgress() {
      return this.gameInProgress;
    },
    isAnnouncing() {
      return this.isAnnouncing;
    },
    isPlayerTurn() {
      return this.isPlayerTurn;
    },
    /* Responsible for displaying the flashing buttons */
    getGreenClass() {
      if (!this.greenFlash)
        return 'col-sm block green';
      else
        return 'col-sm block light-green';
    },
    getRedClass() {
      if (!this.redFlash)
        return 'col-sm block red';
      else
        return 'col-sm block light-red';
    },
    getYellowClass() {
      if (!this.yellowFlash)
        return 'col-sm block yellow';
      else
        return 'col-sm block light-yellow';
    },
    getBlueClass() {
      if (!this.blueFlash)
        return 'col-sm block blue';
      else
        return 'col-sm block light-blue';
    },
  },
  methods: {
    /* Game Management */
    // Starts a new game
    beginGame() {
      // Halts any playing audio
      incorrectAudio.pause();
      incorrectAudio.currentTime = 0;
      neutralAudio.pause();
      neutralAudio.currentTime = 0;
      resetAudio.pause();
      resetAudio.currentTime = 0;
      resetAudio.play();
      // initialize
      this.score = 0;
      this.selectIndex = 0;
      this.sequence = [];
      this.isAnnouncing = false;
      this.message = "";
      // initiate restart flash sequence
      this.resetFlashGreen();
      setTimeout(this.resetFlashRed, 75);
      setTimeout(this.resetFlashBlue, 175);
      setTimeout(this.resetFlashYellow, 275);
      setTimeout(this.resetFlashGreen, 375);
      // start
      this.gameInProgress = true;
      // generate the next sequence
      setTimeout(this.nextSequence, 800);
    },
    // ends current game and displays Game over,
    // saving the score if it is a new high score
    loseGame() {
      this.gameInProgress = false;
      this.isAnnouncing = true;
      this.message = "Game Over";
      // save the high score
      this.assignHighestScore();
    },
    // ends a current game without displaying Game Over,
    // saving the score if it would be a new high score
    resetGame() {
      this.gameInProgress = false;
      // save the high score
      this.assignHighestScore();
      this.beginGame();
    },
    assignHighestScore() {
      if (this.hasHighScore) {
        if (this.score > this.highScore) {
          this.highScore = this.score;
        }
      } else {
        this.highScore = this.score;
        this.hasHighScore = true;
      }
    },
    // Determines if the selected action was the correct choice and acts accordingly
    selectColor(color) {
      // Halt any playing sounds
      incorrectAudio.pause();
      incorrectAudio.currentTime = 0;
      neutralAudio.pause();
      neutralAudio.currentTime = 0;
      resetAudio.pause();
      resetAudio.currentTime = 0;
      // only respond if a game is in progress and it is the player's turn
      if (this.gameInProgress && this.isPlayerTurn) {
        this.flashColor(color);
        if (this.sequence[this.selectIndex] === color) {
          // correct guess
          this.playColor(color);
          this.selectIndex++;
          // score is the longest completed sequence,
          // which is always 1 item longer than the last completed sequence
          if (this.selectIndex == this.sequence.length) {
            this.score++;
            // deactivate player turn until next sequence is displayed
            this.isPlayerTurn = false;
            // previous sequence ended; new one must be generated
            setTimeout(this.nextSequence, this.CLUE_FLASH_LENGTH * 2);
          }
        } else {
          // incorrect guess
          incorrectAudio.play();
          this.loseGame();
        }
      } else {
        this.isAnnouncing = true;
        if (this.gameInProgress) {
          // sequence is flashing
          this.message = "Wait until the sequence has finished flashing before guessing";
        } else {
          this.flashColor(color);
          neutralAudio.play();
          this.message = "Click 'Begin' to begin a new game";
        }
      }
    },
    // Flashes the provided color
    flashColor(color) {
      if (color === "green") {
        this.resetFlashGreen();
      } else if (color === "red") {
        this.resetFlashRed();
      } else if (color === "yellow") {
        this.resetFlashYellow();
      } else {
        // blue
        this.resetFlashBlue();
      }
    },
    // Plays the audio of the given color
    playColor(color) {
      if (color === 'green') {
        green.play();
      } else if (color === 'red') {
        red.play();
      } else if (color === 'yellow') {
        yellow.play();
      } else {
        blue.play();
      }
    },
    // Appends a random color (1-4) to the sequence,
    // then calls the function to replay the new sequence
    nextSequence() {
      resetAudio.pause();
      resetAudio.currentTime = 0;
      this.selectIndex = 0;
      var newColor = Math.floor((Math.random() * 4) + 1);
      if (newColor === 1)
        this.sequence.push('green');
      else if (newColor === 2) {
        this.sequence.push('red');
      } else if (newColor === 3) {
        this.sequence.push('yellow');
      } else {
        this.sequence.push('blue');
      }
      this.flashNextInSequence(0);
    },
    // recursive function that replays the new sequence with a delay between each flash
    flashNextInSequence(i) {
      if (i < this.sequence.length) {
        // flash color and trigger the next color

        if (this.sequence[i] === 'green') {
          this.playColor('green');
          this.flashGreen();
        } else if (this.sequence[i] === 'red') {
          this.playColor('red');
          this.flashRed();
        } else if (this.sequence[i] === 'yellow') {
          this.playColor('yellow');
          this.flashYellow();
        } else {
          this.playColor('blue');
          this.flashBlue();
        }
        // recursive call
        setTimeout(this.flashNextInSequence, this.CLUE_FLASH_LENGTH * 2, i + 1);
      } else {
        // sequence has finished flashing; it is the player's turn
        this.isPlayerTurn = true;
        // Turn off any announcements that may have appeared during the sequence
        this.isAnnouncing = false;
        this.message = "";
      }
    },
    /* Green */
    selectGreen() {
      this.selectColor("green");
    },
    flashGreen() {
      this.greenFlash = true;
      setTimeout(this.unflashGreen, this.CLUE_FLASH_LENGTH);
    },
    resetFlashGreen() {
      this.greenFlash = true;
      setTimeout(this.unflashGreen, this.QUICK_FLASH_LENGTH);
    },
    unflashGreen() {
      this.greenFlash = false;
    },
    /* Red */
    selectRed() {
      this.selectColor("red");
    },
    flashRed() {
      this.redFlash = true;
      setTimeout(this.unflashRed, this.CLUE_FLASH_LENGTH);
    },
    resetFlashRed() {
      this.redFlash = true;
      setTimeout(this.unflashRed, this.QUICK_FLASH_LENGTH);
    },
    unflashRed() {
      this.redFlash = false;
    },
    /* Yellow */
    selectYellow() {
      this.selectColor("yellow");
    },
    flashYellow() {
      this.yellowFlash = true;
      setTimeout(this.unflashYellow, this.CLUE_FLASH_LENGTH);
    },
    resetFlashYellow() {
      this.yellowFlash = true;
      setTimeout(this.unflashYellow, this.QUICK_FLASH_LENGTH);
    },
    unflashYellow() {
      this.yellowFlash = false;
    },
    /* Blue */
    selectBlue() {
      this.selectColor("blue");
    },
    flashBlue() {
      this.blueFlash = true;
      setTimeout(this.unflashBlue, this.CLUE_FLASH_LENGTH);
    },
    resetFlashBlue() {
      this.blueFlash = true;
      setTimeout(this.unflashBlue, this.QUICK_FLASH_LENGTH);
    },
    unflashBlue() {
      this.blueFlash = false;
    },
  }
});