// HEADER SCORE
const scoreContainer = document.querySelector(".score-number");
const triangle = document.querySelector(".triangle");
// PLAYING
const play = document.querySelector(".play");
const you = document.querySelector(".player--you");
const house = document.querySelector(".player--house");
const youSelected = document.querySelector(".you-selected");
const houseSelected = document.querySelector(".house-selected");
// RESULT
const resultContainer = document.querySelector(".result-container");
const result = document.querySelector(".result");
const playAgainBtn = document.querySelector(".play-again");
// MODAL
const overlay = document.querySelector(".overlay");
const modalEl = document.querySelector(".rules");
const modalBtn = document.querySelector(".rules-btn");
const closeBtn = document.querySelector(".close-modal");

class Game {
  constructor() {
    this.score = 0;
    this.tool = {
      0: "paper",
      1: "rock",
      2: "scissors",
    };

    triangle.addEventListener("click", this.play.bind(this));
    playAgainBtn.addEventListener("click", this.updateUI.bind(this));
  }

  play(e) {
    if (!e.target.classList.contains("tool-img")) return;

    const selectedTool = Number(e.target.dataset.tool);
    const computer = this.selectRandom();

    let resMsg;
    if (selectedTool === computer) {
      resMsg = "match tie";
    } else if ((selectedTool + 1) % 3 === computer) {
      resMsg = "you win";
      this.score++;
    } else {
      resMsg = "you loose";
      this.score--;
    }

    scoreContainer.innerHTML = `${this.score}`;

    const youToolHTML = `
            <img
              src="images/icon-${this.tool[selectedTool]}.svg"
              alt="You choose ${this.tool[selectedTool]}"
              class="tool-img--selected ${this.tool[selectedTool]}--selected"
            />`;

    const computerToolHTML = `
            <img
              src="images/icon-${this.tool[computer]}.svg"
              alt="You choose ${this.tool[selectedTool]}"
              class="tool-img--selected ${this.tool[computer]}--selected"
            />`;

    youSelected.innerHTML = youToolHTML;
    houseSelected.innerHTML = computerToolHTML;

    result.innerHTML = resMsg;

    this.updateUI();
  }

  updateUI() {
    this.hideTriangle();
    this.showPlay();
    this.showResult();
  }

  showResult() {
    resultContainer.classList.toggle("hidden");
  }

  hideTriangle() {
    triangle.classList.toggle("hidden");
  }

  showPlay() {
    play.classList.toggle("hidden");
  }

  selectRandom() {
    const num = Math.floor(Math.random() * 3);
    return num;
  }
}

class Modal {
  constructor() {
    modalBtn.addEventListener("click", this.toggleModal); // open Modal
    closeBtn.addEventListener("click", this.toggleModal); // close Modal
  }

  toggleModal = function () {
    modalEl.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  };
}

const modal = new Modal();
const game = new Game();
