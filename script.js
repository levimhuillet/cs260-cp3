var simon = new Vue({
  el: '#simon',
  data: {
    score: 0,
    sequence: [],
    message: '',
    startGame: false,
    greenFlash: false,
    redFlash: false,
    yellowFlash: false,
    blueFlash: false,
    currentColor: '',
    CLUE_FLASH_LENGTH: 400,
    QUICK_FLASH_LENGTH: 100,
    selectIndex: 0,
    lost: false,
  },
  computed: {
    currentScore() {
      return this.score;
    },
    gameHasStarted() {
      return this.startGame;
    },
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
      beginGame() {
        this.startGame = true;
        this.score = 0;
        this.selectIndex = 0;
        this.sequence = [];
        // initiate flash sequence
        this.resetFlashGreen();
        setTimeout(this.resetFlashRed, 75);
        setTimeout(this.resetFlashBlue, 175);
        setTimeout(this.resetFlashYellow, 275);
        setTimeout(this.resetFlashGreen, 375);
        // start the next sequence
        setTimeout(this.nextSequence, 700);
      },
      selectGreen()
      {
        this.resetFlashGreen();
        if (this.sequence[this.selectIndex] === "green"){
          // correct guess
          this.selectIndex++;
          if (this.selectIndex == this.sequence.length)
          {
            this.score++;
            // previous sequence ended; new one must be generated
            setTimeout(this.nextSequence, this.CLUE_FLASH_LENGTH * 2);          }
        }
        else {
          lost = true;
          console.log("wrong guess");
        }
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
      selectRed()
      {
        this.resetFlashRed();
        if (this.sequence[this.selectIndex] === "red"){
          // correct guess
          this.selectIndex++;
          if (this.selectIndex == this.sequence.length)
          {
            this.score++;
            // previous sequence ended; new one must be generated
            setTimeout(this.nextSequence, this.CLUE_FLASH_LENGTH * 2);          }
        }
        else {
          lost = true;
          console.log("wrong guess");
        }
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
      selectYellow()
      {
        this.resetFlashYellow();
        if (this.sequence[this.selectIndex] === "yellow"){
          // correct guess
          this.selectIndex++;
          if (this.selectIndex == this.sequence.length)
          {
            this.score++;
            // previous sequence ended; new one must be generated
            setTimeout(this.nextSequence, this.CLUE_FLASH_LENGTH * 2);          }
        }
        else {
          lost = true;
          console.log("wrong guess");
        }
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
      selectBlue()
      {
        this.resetFlashBlue();
        if (this.sequence[this.selectIndex] === "blue"){
          // correct guess
          this.selectIndex++;
          if (this.selectIndex == this.sequence.length)
          {
            this.score++;
            // previous sequence ended; new one must be generated
            setTimeout(this.nextSequence, this.CLUE_FLASH_LENGTH * 2);
          }
        }
        else {
          lost = true;
          console.log("wrong guess");
        }
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
      endGame() {
        this.startGame = false;
      },
      nextSequence() {
        this.selectIndex = 0;
        var newColor = Math.floor((Math.random() * 4) + 1);
        if (newColor === 1)
        this.sequence.push('green');
        else if (newColor === 2){
          this.sequence.push('red');
        }
        else if (newColor === 3){
          this.sequence.push('yellow');
        }
        else {
          this.sequence.push('blue');
        }
        console.log(this.sequence);
        this.nextInSequence(0);
      },
      // recursive function
      nextInSequence(i)
      {
        if (i < this.sequence.length)
        {
          // flash color and trigger the next color
          if (this.sequence[i] === 'green'){
            this.flashGreen();
          }
          else if (this.sequence[i] === 'red'){
            this.flashRed();
          }
          else if (this.sequence[i] === 'yellow'){
            this.flashYellow();
          }
          else {
            this.flashBlue();
          }
          // recursive call
          setTimeout(this.nextInSequence, this.CLUE_FLASH_LENGTH * 2, i+1);
        }

      }
      /*
    addItem() {
      this.todos.push({text: this.message, completed:false});
      this.message = '';
    },
    deleteItem(item) {
      var index = this.todos.indexOf(item);
      if (index > -1)
      this.todos.splice(index,1);
    },
    showAll() {
      this.show = 'all';
    },
    showActive() {
      this.show = 'active';
    },
    showCompleted() {
      this.show = 'completed';
    },
    deleteCompleted() {
      this.todos = this.todos.filter(item => {
        return !item.completed;
      });
    },
    dragItem(item) {
      this.drag = item;
    },
    dropItem(item) {
      const indexItem = this.todos.indexOf(this.drag);
      const indexTarget = this.todos.indexOf(item);
      this.todos.splice(indexItem,1);
      this.todos.splice(indexTarget,0,this.drag);
    },*/
  }
});
