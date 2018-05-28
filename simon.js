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
  showSequence: function() {
    let index = 0;
    const sequenceLength = simon.sequence.length;
    const timer = setInterval(function() {
      if (index < sequenceLength) {
        performButtonAction(simon.sequence[index]);
        index++;
      }
      else {
        clearInterval(timer);
      }

    }, 1500);
  },
  addToSequence: function() {
    if (this.sequence.length < 20) {
      const randomNum = Math.ceil(Math.random() * 4);
      this.sequence.push(randomNum);
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
    }, 1000);

    button.sound.play();
}

$('#power').click(function() {
  gameOn = !gameOn;
});

$('#play').click(function() {
  if (gameOn) {
    simon.addToSequence();
    simon.showSequence();
  }
  else {
    simon.sequence = [];
  }
});

$('section').mousedown(function(event) {
  if (gameOn) {
    let btnNum = event.target.id.slice(-1);
    btnNum = parseInt(btnNum);
    performButtonAction(btnNum);
  }
});



