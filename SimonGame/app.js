const el = new Vue({
  el: ".container",

  data: {
    level: "",
    buttons: ["green", "red", "blue", "yellow"],
    pattern: [],
    playersPattern: [],
    blinkTime: 1000,
    isShowingPattern: false,
    strict: false,
    isOn: false,
    isRunning: false,
    winningLevel: 20,
    speedUpLevels: [7, 13],
    startTime: 0,
    isRepeating: false,
    repeatingTime: 0,
  },
  mounted: function () {
    setInterval(this.checkTime, 500);
  },

  methods: {
    mouseDown(e) {
      if (this.isRepeating && this.isRunning) {
        const button = e.target;
        document.querySelector(`audio[data-id="${button.dataset.id}"]`).play();
        button.classList.add("on");
        this.playersPattern.push(button.dataset.id);
      }
    },
    mouseUp(e) {
      if (this.isRepeating && this.isRunning) {
        const button = e.target;
        button.classList.remove("on");
        const pattern1 = this.pattern.join("");
        const pattern2 = this.playersPattern.join("");
        const index = pattern2.length;

        if (pattern1[index - 1] !== pattern2[index - 1]) {
          this.isRepeating = false;
          this.alert();
        }
        if (pattern1 === pattern2) {
          this.isRepeating = false;
          this.playersPattern = [];
          setTimeout(this.newLevel, 1000);
        }
      }
    },

    toggleOn() {
      document.querySelector("body").classList.add("starting");
      this.isOn = !this.isOn;
      if (this.isOn) {
        this.level = 0;
      } else {
        this.initialize();
        this.level = '';
      }
    },
    toggleStart() {
      if (this.isOn) {
        if (this.isRunning) {
          this.initialize();
        } else {
          this.initialize();
          this.startNewGame();
        }
      }
    },

    toggleStrict() {
      if (!this.isRunning && this.isOn) {
        this.strict = !this.strict;
      }
    },

    initialize() {
      document.querySelector("body").classList.remove("starting");
      this.isRunning = false;
      this.level = 0;
      this.playersPattern = [];
      this.pattern = [];
      this.blinkTime = 1000;
      this.repeatingTime = 0;
      this.isRepeating = false;
    },

    startNewGame() {
      if (this.isOn) {
        this.initialize();
        this.isRunning = true;
        setTimeout(() => {
          this.newLevel();
        }, 500);
      }
    },

    random() {
      const index = Math.floor(Math.random() * 4);
      return index;
    },
    newLevel() {
      if (!this.isShowingPattern) {
        // is the winning level completed
        if (this.level === this.winningLevel) {
          this.repeating = false;
          this.winner();
          return;
        }
        // next level
        this.level += 1;
        // check if the speed is rising
        this.speedUpLevels.forEach(level => {
          if (this.level === level) {
            this.blinkTime -= 200;
          }
        });
        // add next button
        this.pattern.push(this.random());
        // show new pattern
        this.showPattern(this.pattern)
          .then(data => {
            // console.log(data);
            this.isRepeating = true;
            this.repeatingTime = new Date().getTime();
          })
          .catch(err => console.log(err));
      }
    },
    alert() {
      this.isRepeating = false;
      const pattern = "3210".repeat(3).split("");
      this.showPattern(pattern, false, 50);
      if (this.strict) {
        this.level = "err";
        this.isRepeating = false;
        setTimeout(() => {
          if (this.isRunning) this.startNewGame();
        }, 1500);
        return;
      } else {
        this.playersPattern = [];
        setTimeout(() => {
          this.showPattern(this.pattern)
            .then(data => {
              // console.log(data);
              this.isRepeating = true;
              this.repeatingTime = new Date().getTime();
            })
        }, 1500);
      }
    },

    winner() {
      // play some victory sound

      // show pattern
      const pattern = "0123".repeat(10).split("");
      this.showPattern(pattern, false, 10);

      this.level = "win!";
      // start a new game
      setTimeout(this.startNewGame, 2000);
    },

    checkTime() {
      if (this.isRepeating && this.isRunning) {
        // get time in milliseconds
        const timeNow = new Date().getTime();
        // set users repeating time
        const endTime = this.repeatingTime + this.level * 1000;
        // check
        if (timeNow >= endTime) {
          this.alert();
          console.log("check");
        }
      }
    },

    async showPattern(
      arr = this.pattern,
      sound = true,
      timeOut = this.blinkTime
    ) {
      this.isShowingPattern = true;
      for (let x = 0; x < arr.length; x++) {
        // If player resets game, then end pattern
        if (!this.isRunning) break;
        const button = document.querySelector(`.box[data-id="${arr[x]}"]`);
        if (sound)
          document
            .querySelector(`audio[data-id="${button.dataset.id}"]`)
            .play();
        button.classList.toggle("on");
        await this.wait(timeOut * 0.7);
        button.classList.toggle("on");
        await this.wait(timeOut * 0.3);
      }
      this.playersPattern = [];
      this.isShowingPattern = false;
      return arr;
    },
    wait(ms) {
      return new Promise(resolve => {
        setTimeout(() => resolve(true), ms);
      });
    }
  }
});
