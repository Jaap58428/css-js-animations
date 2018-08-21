window.onload = () => {
  document.getElementById('button').addEventListener('click', main)
}

let main = () => {
  document.body.removeChild(document.getElementById('button'))


  ballCount = 10; // amount of balls to show

  for (var i = 0; i < ballCount; i++) {
    let randomBall = getRandomBallElement();

    randomBall.addEventListener('click', removeThisBall)

    document.body.appendChild(randomBall)

    let colorOne = getRandomInt(355)
    let colorTwo = getRandomInt(355)

    setInterval(() => {
      // increase colors by one
      colorOne = increaseColor(colorOne)
      colorTwo = increaseColor(colorTwo)

      changeBackground(colorOne, colorTwo, randomBall)
    }, getRandomInt(50) + 50)
  }

}

let changeBackground = (colorOne, colorTwo, circle) => {
  let styleFormat = 'linear-gradient(-70deg, ' + hslToString(colorOne) + ' , ' + hslToString(colorTwo) + ')';
  circle.style.backgroundImage = styleFormat
}

let hslToString = (colorValue) => {
  return 'hsl(' + colorValue + ', 100%, 60%)'
}

let increaseColor = (oldColor) => {
  // hsl colors rotate over the color wheel 0-360
  if (oldColor < 355) {
    return oldColor + 5;
  } else {
    return 0;
  }
}

let getRandomBallElement = () => {
  var newDiv = document.createElement('div');
  newDiv.className = 'circle'
  newDiv.id = 'circle'

  let size = (getRandomInt(7) + 3) + 'rem'

  newDiv.style.height = size;
  newDiv.style.width = size;

  // make sure the location isnt further then the size of the object allows
  // done via css calculation of vh/vw - object size
  let baseTop = getRandomInt(100) + 'vh';
  let baseLeft = getRandomInt(100) + 'vw';

  newDiv.style.top = 'calc( ' + baseTop + ' - ' + size  + ' )';
  newDiv.style.left = 'calc( ' + baseLeft + ' - ' + size  + ' )';

  return newDiv;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let removeThisBall = (eventBall) => {
  eventBall.target.style.transform = 'scale(0)';
  setInterval(() => {
    document.body.removeChild(eventBall.target)
  }, 500)
}
