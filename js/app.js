window.onload = function () {

  // var images = document.querySelectorAll('.hflip');
  // images.forEach(function (image) {
  //   var imageHeight = image.clientHeight;
  //   // image.style.transformOrigin = 'top left';
  //   image.style.position = 'absolute'
  //   image.style.transform = 'scaleY(-1)';
  // });

  // Fade out the white rectangle
  var whiteRectangle = document.getElementsByClassName('whiteRectangle')[0];
  whiteRectangle.style.opacity = 0;
  // Hide the white rectangle once it has faded out so you can click through it
  setTimeout(function () {
    whiteRectangle.classList.add('hideWhiteRectangle');
  }, 5000);
};

const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0, rotateDegree = 0;

function update(cursorXPosition) {
  parallax_el.forEach(el => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;


    let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 0.1 : -0.1;
    let zValue = (cursorXPosition - parseFloat(getComputedStyle(el).left)) * isInLeft;

    // perspective is like how far back behind the screen is the 3d element.
    el.style.transform = `
    translateX(calc(-50% + ${-xValue * speedx}px)) 
    translateY(calc(-50% + ${yValue * speedy}px))
    perspective(2300px) 
    translateZ(${zValue * speedz}px)
    rotateY(${rotateDegree * rotateSpeed}deg)
    `;
  })
}

update(0);

// How far is the mouse from the center?
window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return; //time line is still moving? cannot do parallax effect on mouse yet

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX)
})


const main = document.querySelector("main");

if (window.innerWidth >= 725) {
  main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
  // console.log(window.innerWidth);
  main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}
window.addEventListener("resize", updateMainHeight)
function updateMainHeight() {
  if (window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
  } else {
    // console.log(window.innerWidth);
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
  }
}


/* GSAP Animation */

let timeline = gsap.timeline();

Array.from(parallax_el).filter(el => !el.classList.contains("text")).forEach(el => {
  // console.log(el.offsetHeight, "/ 2 + ", el.dataset.distance, "=", el.offsetHeight / 2 + el.dataset.distance);
  timeline.from(el, {
    top: `${parseInt(el.offsetHeight) / 2 + +parseInt(el.dataset.distance)}px`,
    duration: 5,
    ease: "power3.out"
  }, "0"); // wait 0 second after the page loads, then run the animation.
});

timeline.from(".text h1", {
  y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 100,
  duration: 2,
}, "3" // wait 3 seconds after the page loads, then run the animation.
).from(".text h2", {
  y: -150,
  opacity: 0,
  duration: 2,
}, "3" //wait 3 seconds after the page loads, then run the animation.
).from(".hide", {
  opacity: 0,
  duration: 1.5,
}, "3");