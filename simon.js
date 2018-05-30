let gameOn = false;

const greenButton = {
  number: 1,
  color: '#008000',
  litColor: '#00cc00',
  sound: document.getElementById('sound1')
}

const redButton = {
  number: 2,
  color: '#b30000',
  litColor: '#ff0000',
  sound: document.getElementById('sound2')
}

const yellowButton = {
  number: 3,
  color: '#cccc00',
  litColor: '#ffff00',
  sound: document.getElementById('sound3')
}

const blueButton = {
  number: 4,
  color: '#0000cc',
  litColor: '#0000ff',
  sound: document.getElementById('sound4')
}

const simon = {
  sequence: [],
  seqPosition: 0,
  seqMax: 20,
  correctBtn: true,
  errorSound: document.getElementById('error'),
  showSequence: function() {
    let index = 0;
    const sequenceLength = this.sequence.length;
    const timer = setInterval(function() {
      if (index < sequenceLength) {
        performButtonAction(simon.sequence[index]);
        index++;
      }
      else {
        clearInterval(timer);
        player.playerTurn = true;
      }
    }, 1000);
  },
  addToSequence: function() {
    if (this.sequence.length < this.seqMax) {
      const randomNum = Math.ceil(Math.random() * 4);
      this.sequence.push(randomNum);
      this.showSequence();
    }
  }
}

const player = {
  playerTurn: false,
  checkSequence: function(btnSelected) {
    if (btnSelected !== simon.sequence[simon.seqPosition]) {
      this.playerTurn = false;
      simon.correctBtn = false;
      setTimeout(function() {
        simon.showSequence();
      }, 2500);
      simon.seqPosition = 0;
    }
    else if (simon.seqPosition < simon.sequence.length - 1) {
      simon.seqPosition++;
    }
    else {
      this.playerTurn = false;
      simon.seqPosition = 0;
      setTimeout(function() {
        simon.addToSequence();
      }, 1500);
    }
  }
}

function performButtonAction(btnNum) {
  let button;
  switch (btnNum) {
    case 1:
      button = greenButton;
      break;
    case 2:
      button = redButton;
      break;
    case 3:
      button = yellowButton;
      break;
    case 4:
      button = blueButton;
      break;
    }

    $('#button'+btnNum).css('background-color', button.litColor);
    setTimeout(() => {
      $('#button'+btnNum).css('background-color', button.color);
    }, 700);

    if (simon.correctBtn) {
      button.sound.play();
    }
    else {
      simon.errorSound.play();
      simon.correctBtn = true;
    }
}

$('#power').click(function() {
  gameOn = !gameOn;
  simon.sequence = [];
  player.playerTurn = false;
});

$('#play').click(function() {
  if (gameOn && simon.sequence.length === 0) {
    simon.addToSequence();
  }
});

$('section').mousedown(function(event) {
  if (gameOn && player.playerTurn) {
    let btnSelected = event.target.id.slice(-1);
    btnSelected = parseInt(btnSelected);
    player.checkSequence(btnSelected);
    performButtonAction(btnSelected);
  }
});



