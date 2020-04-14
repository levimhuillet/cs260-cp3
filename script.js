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
  /*  activeTodos() {
      return this.todos.filter(item => {
        return !item.completed;
      });
    },
    filteredTodos() {
      if (this.show === 'active')
      return this.todos.filter(item => {
        return !item.completed;
      });
      if (this.show === 'completed')
      return this.todos.filter(item => {
        return item.completed;
      });
      return this.todos;
    },*/
  },
    methods: {
      beginGame() {
        this.startGame = true;
        this.score = 0;
        this.onlyFlashGreen();
        setTimeout(this.unflashGreen, 200);
        setTimeout(this.onlyFlashRed, 100);
        setTimeout(this.unflashRed, 300);
        setTimeout(this.onlyFlashBlue, 200);
        setTimeout(this.unflashBlue, 400);
        setTimeout(this.onlyFlashYellow, 300);
        setTimeout(this.unflashYellow, 500);
        setTimeout(this.onlyFlashGreen, 400);
        setTimeout(this.unflashGreen, 500);
        setTimeout(this.onlyFlashRed, 400);
        setTimeout(this.unflashRed, 500);
        setTimeout(this.onlyFlashBlue, 400);
        setTimeout(this.unflashBlue, 500);
        setTimeout(this.onlyFlashYellow, 400);
        setTimeout(this.unflashYellow, 500);
        setTimout(this.nextSequence, 1000);
      },
      flashGreen() {
        this.greenFlash = true;
        setTimeout(this.unflashGreen, 500);
        this.score++;
      },
      onlyFlashGreen() {
        this.greenFlash = true;
      },
      unflashGreen() {
        this.greenFlash = false;
      },
     flashRed() {
        this.redFlash = true;
        setTimeout(this.unflashRed, 500);
        this.score++;
      },
      onlyFlashRed() {
         this.redFlash = true;
       },
      unflashRed() {
        this.redFlash = false;
      },
      flashYellow() {
        this.yellowFlash = true;
        setTimeout(this.unflashYellow, 500);
        this.score++;
      },
      onlyFlashYellow() {
        this.yellowFlash = true;
      },
      unflashYellow() {
        this.yellowFlash = false;
      },
      flashBlue() {
        this.blueFlash = true;
        setTimeout(this.unflashBlue, 500);
        this.score++;
      },
      onlyFlashBlue() {
        this.blueFlash = true;

      },
      unflashBlue() {
        this.blueFlash = false;
      },
      endGame() {
        this.startGame = false;
      },
      nextSequence() {
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
        for (var i = 0; i < this.sequence.length; i++){
          if (this.sequence[i] === 'green'){
            this.onlyFlashGreen();
            setTimeout(this.unflashGreen, 300);
          }
          else if (this.sequence[i] === 'red'){
            this.onlyFlashRed();
            setTimeout(this.unflashRed, 300);
          }
          else if (this.sequence[i] === 'yellow'){
            this.onlyFlashYellow();
            setTimeout(this.unflashYellow, 300);
          }
          else {
            this.onlyFlashBlue();
            setTimeout(this.unflashBlue, 300);
          }
        }
      },
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
