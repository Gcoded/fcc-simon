let sequence = [];
const greenButton = {
  number: 1,
  color: '#008000',
  litColor: '#00cc00',
  sound: document.getElementById('sound1'),
  changeColor: function() {
    $('#button'+this.number).css('background-color', this.litColor);
  }
}

const redButton = {
  number: 2,
  color: '#b30000',
  litColor: '#ff0000',
  sound: document.getElementById('sound2')
}

const yellowButton = {
  number: 3,
  color: '#e6e600',
  litColor: '#ffff66',
  sound: document.getElementById('sound3')
}

const blueButton = {
  number: 4,
  color: '#0000cc',
  litColor: '#0000ff',
  sound: document.getElementById('sound4')
}



