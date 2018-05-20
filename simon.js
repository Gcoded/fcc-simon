let sequence = [];
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

function highlight(button) {
  $('#button'+button.number).css('background-color', button.litColor);
  setTimeout(() => {
    $('#button'+button.number).css('background-color', button.color);
  }, 1000);
}


$('section').mousedown(function(event) {
  let button = event.target.id;
  switch (button) {
    case 'button1':
      button = greenButton;
      break;
    case 'button2':
      button = redButton;
      break;
    case 'button3':
      button = yellowButton;
      break;
    case 'button4':
      button = blueButton;
      break;
    }
  highlight(button);
  button.sound.play();
});


