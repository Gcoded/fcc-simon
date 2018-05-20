let sequence = [];
const greenButton = {
  number: 1,
  color: '#008000',
  litColor: '#00cc00',
  sound: document.getElementById('sound1'),
  highlight: function() {
    $('#button'+this.number).css('background-color', this.litColor);
    setTimeout(() => {
      $('#button'+this.number).css('background-color', this.color);
    }, 1000);
  }
}

const redButton = {
  number: 2,
  color: '#b30000',
  litColor: '#ff0000',
  sound: document.getElementById('sound2'),
  highlight: function() {
    $('#button'+this.number).css('background-color', this.litColor);
    setTimeout(() => {
      $('#button'+this.number).css('background-color', this.color);
    }, 1000);
  }
}

const yellowButton = {
  number: 3,
  color: '#cccc00',
  litColor: '#ffff00',
  sound: document.getElementById('sound3'),
  highlight: function() {
    $('#button'+this.number).css('background-color', this.litColor);
    setTimeout(() => {
      $('#button'+this.number).css('background-color', this.color);
    }, 1000);
  }
}

const blueButton = {
  number: 4,
  color: '#0000cc',
  litColor: '#0000ff',
  sound: document.getElementById('sound4'),
  highlight: function() {
    $('#button'+this.number).css('background-color', this.litColor);
    setTimeout(() => {
      $('#button'+this.number).css('background-color', this.color);
    }, 1000);
  }
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
  button.highlight();
  button.sound.play();
});


