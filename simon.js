const simon = {
  greenButton: {
    color: '#008000',
    litColor: '#00cc00',
    sound: document.getElementById('sound1')
  },
  redButton: {
    color: '#b30000',
    litColor: '#ff0000',
    sound: document.getElementById('sound2')
  },
  yellowButton: {
    color: '#cccc00',
    litColor: '#ffff00',
    sound: document.getElementById('sound3')
  },
  blueButton: {
    color: '#0000cc',
    litColor: '#0000ff',
    sound: document.getElementById('sound4')
  },
  gameOn: false,
  sequence: [],
  seqPosition: 0,
  seqMax: 20,
  correctBtn: true,
  errorSound1: document.getElementById('errorNo'),
  errorSound2: document.getElementById('errorBuzz'),
  strictMode: false,
  performButtonAction: function(btnNum) {
    let button;
    switch (btnNum) {
      case 1:
        button = this.greenButton;
        break;
      case 2:
        button = this.redButton;
        break;
      case 3:
        button = this.yellowButton;
        break;
      case 4:
        button = this.blueButton;
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
        simon.errorSound1.play();
        simon.correctBtn = true;
      }
  },
  showSequence: function() {
    let index = 0;
    const sequenceLength = this.sequence.length;
    const timer = setInterval(function() {
      if (simon.gameOn && index < sequenceLength) {
        $('#countDisplay').text(sequenceLength);
        simon.performButtonAction(simon.sequence[index]);
        index++;
      }
      else {
        clearInterval(timer);
        player.playerTurn = true;
        player.checkForInaction();
      }
    }, 1000);
  },
  addToSequence: function() {
    if (this.sequence.length < this.seqMax) {
      const randomNum = Math.ceil(Math.random() * 4);
      this.sequence.push(randomNum);
      this.showSequence();
    }
    else {
      this.showWinnerMessage();
      this.resetGame();
    }
  },
  resetGame: function() {
    simon.sequence = [];
    player.playerTurn = false;
    clearTimeout(player.inactionTimer);
    if (this.gameOn) {
      $('#countDisplay').text(0);
    }
    else {
      $('#countDisplay').text('');
      this.strictMode = false;
      $('#strict').removeClass('strictActive');
    }
  },
  showWinnerMessage: function() {
    $('#winnerMessage').text('Nice job, you beat Simon!');
    $('#winnerMessage').toggle();
    setTimeout(function() {
      $('#winnerMessage').toggle();
    }, 6000);
  }
}

const player = {
  playerTurn: false,
  inactionTimer: 0,
  checkForInaction: function() {
    if (simon.gameOn) {
      this.inactionTimer = setTimeout(function() {
        player.playerTurn = false;
        simon.errorSound2.play();
        simon.seqPosition = 0;
        setTimeout(function() {
          if (simon.strictMode) {
            simon.resetGame();
            simon.addToSequence();
          }
          else {
            simon.showSequence();
          }
        }, 2500);
      }, 5000);
    }
  },
  checkSequence: function(btnSelected) {
    if (btnSelected !== simon.sequence[simon.seqPosition]) {
      this.playerTurn = false;
      simon.correctBtn = false;
      simon.seqPosition = 0;
      setTimeout(function() {
        if (simon.strictMode) {
          simon.resetGame();
          simon.addToSequence();
        }
        else {
          simon.showSequence();
        }
      }, 2500);
    }
    else if (simon.seqPosition < simon.sequence.length - 1) {
      simon.seqPosition++;
      this.checkForInaction();
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


$('#power').click(function() {
  simon.gameOn = !simon.gameOn;
  $('#power').toggleClass('pwr-on');
  simon.resetGame();
});

$('#play').click(function() {
  if (simon.gameOn && simon.sequence.length === 0) {
    simon.addToSequence();
  }
});

$('#strict').click(function() {
  if (simon.gameOn) {
    simon.strictMode = !simon.strictMode;
    $('#strict').toggleClass('strictActive');
  }
});

$('section').mousedown(function(event) {
  if (simon.gameOn && player.playerTurn) {
    clearTimeout(player.inactionTimer);
    let btnSelected = event.target.id.slice(-1);
    btnSelected = parseInt(btnSelected);
    player.checkSequence(btnSelected);
    simon.performButtonAction(btnSelected);
  }
});



