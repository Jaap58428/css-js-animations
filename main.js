window.onload = () => {
  main();
}

let main = () => {

  // amount of balls to show
  // more impacts performance negatively
  let ballCount = 10;

  // update ball state after milliseconds
  // a higher value appears smoother but might impact performance negatively
  let intervalSpeed = 100

  // amount of hsl color value is changed every update
  // higher makes the colors shift quicker but too much will appear choppy
  let gradientColorJump = 3

  // angle of the gradient on all balls
  let gradientDegree = -70

  // smallest possible ball size, size in rem's
  // needs at least 1
  let minBallSize = 5

  // biggest possible ball size, size in rem's
  // needs to be bigger then minBallSize
  let maxBallSize = 20

  // update ball state after milliseconds
  // a higher value appears smoother but might impact performance negatively
  // recommended also needs to be similar to the CSS transitionTime value
  let movementSpeed = 1000

  // the amount of pixels the ball can move from its initial position
  let movementDistance = 100

  for (var i = 0; i < ballCount; i++) {
    let randomBall = getRandomBallElement(minBallSize, maxBallSize);

    randomBall.addEventListener('click', removeThisBall)

    document.body.appendChild(randomBall)

    console.log(document.getElementsByClassName('circle')[0].style.transitionProperty);

    // start every ball on a random gradient point
    let colorOne = getRandomInt(355)
    let colorTwo = getRandomInt(355)

    setInterval(() => {
      // increase colors by gradientColorJump
      colorOne = increaseColor(colorOne, gradientColorJump)
      colorTwo = increaseColor(colorTwo, gradientColorJump)

      changeBackground(colorOne, colorTwo, randomBall)
    }, intervalSpeed)

    setInterval(() => {
      changeLocation(randomBall, movementDistance)
    }, movementSpeed)
  }

}

let changeBackground = (colorOne, colorTwo, circle) => {
  let styleFormat = 'linear-gradient(-70deg, ' + hslToString(colorOne) + ' , ' + hslToString(colorTwo) + ')';
  circle.style.backgroundImage = styleFormat
}

let hslToString = (colorValue) => {
  return 'hsl(' + colorValue + ', 100%, 60%)'
}

let increaseColor = (oldColor, gradientInterval) => {
  // hsl colors rotate over the color wheel 0-360
  if (oldColor < (360 - gradientInterval)) {
    return oldColor + gradientInterval;
  } else {
    return 0;
  }
}

let getRandomBallElement = (minSize, maxSize) => {
  var newDiv = document.createElement('div');
  newDiv.className = 'circle'
  newDiv.id = 'circle'

  let size = (getRandomInt(maxSize - minSize) + minSize) + 'rem'

  newDiv.style.height = size;
  newDiv.style.width = size;

  // make sure the location isnt further then the size of the object allows
  // done via css calculation of vh/vw - object size
  let baseTop = getRandomInt(100) + 'vh';
  let baseLeft = getRandomInt(100) + 'vw';

  newDiv.style.top = 'calc( ' + baseTop + ' - (' + size + ' )/2 + 1px)';
  newDiv.style.left = 'calc( ' + baseLeft + ' - (' + size + ')/2 + 1px)';

  console.log(newDiv);

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

let changeLocation = (ball, speed) => {
  let oldTop = ball.style.top
  let oldLeft = ball.style.left

  let oldOffsetTop = oldTop.slice(oldTop.indexOf('(') + 1, oldTop.indexOf(' ') - 2)
  let oldOffsetLeft = oldTop.slice(oldTop.indexOf('(') + 1, oldTop.indexOf(' ') - 2)

  let newTop, newLeft;

  if (oldOffsetTop > 0) {
    newTop = Number(oldOffsetTop) - getRandomInt(speed)
  } else {
    newTop = Number(oldOffsetTop) + getRandomInt(speed)
  }

  if (oldOffsetLeft > 0) {
    newLeft = Number(oldOffsetLeft) - getRandomInt(speed)
  } else {
    newLeft = Number(oldOffsetLeft) + getRandomInt(speed)
  }

  // if (Math.random() > 0.5) {
  //   newLeft = getRandomInt(speed) + oldLeft.slice(5, 6)
  // } else {
  //   newLeft = getRandomInt(speed) - oldLeft.slice(5, 6)
  // }

  console.log(oldTop.slice(0, oldTop.indexOf('(') + 1) + newTop + oldTop.slice(oldTop.indexOf(' ') - 2, oldTop.length));

  ball.style.top = oldTop.slice(0, oldTop.indexOf('(') + 1) + newTop + oldTop.slice(oldTop.indexOf(' ') - 2, oldTop.length)
  ball.style.left = oldLeft.slice(0, oldLeft.indexOf('(') + 1) + newLeft + oldLeft.slice(oldLeft.indexOf(' ') - 2, oldLeft.length)
}
