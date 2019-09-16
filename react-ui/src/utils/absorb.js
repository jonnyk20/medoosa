import html2canvas from "html2canvas";

const absorb = async (target, origin, particleCanvas) => {
  let ctx;

  const { clientHeight, clientWidth } = target;
  console.log({ clientHeight, clientWidth, target });
  const canvas = await html2canvas(target, {
    backgroundColor: "transparent",
    height: clientHeight,
    width: clientWidth,
    scale: 1
  });
  // canvas.height = 182;
  // canvas.width = 279;
  // container.appendChild(canvas);
  ctx = canvas.getContext("2d");

  // createParticleCanvas();

  let reductionFactor = 17;
  target.style.visibility = "hidden";
  // Get the color data for our button
  let width = target.offsetWidth;
  let height = target.offsetHeight;
  let colorData = ctx.getImageData(0, 0, width, height).data;
  // console.log({ colorData });

  // Keep track of how many times we've iterated (in order to reduce
  // the total number of particles create)
  let count = 0;

  const targetColor = [135, 206, 235, 255];

  /* An "exploding" particle effect that uses circles */
  const ExplodingParticle = function() {
    // Set how long we want our particle to animate for
    this.animationDuration = 5000; // in ms

    // Set the speed for our particle
    this.speed = {
      x: -5 + Math.random() * 10,
      y: -5 + Math.random() * 10
    };

    // Size our particle
    this.radius = 5 + Math.random() * 5;

    // Set a max time to live for our particle
    this.life = 500; //+ Math.random() * 10;
    this.remainingLife = this.life;

    // This function will be called by our animation logic later on
    this.draw = ctx => {
      let p = this;
      // if (this.id === "681.5-561") {
      //   console.log("ID", this.id);
      // }
      if (this.remainingLife > 0 && this.radius > 0) {
        // Draw a circle at the current location
        ctx.beginPath();
        ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
        if (!this.color) {
          const [red, green, blue, alpha] = this.rgbArray;
          this.color = [red, green, blue, alpha];
        }
        const changeRate = 1;
        const modifiedColors = this.color.map((color, i) => {
          const delta = targetColor[i] - color;
          if (delta === 0) {
            return color;
          }
          if (delta < 0) {
            return color - changeRate;
          }
          return color + changeRate;
        });
        // if (this.id === "681.5-561") {
        //   console.log("orignial", this.color);
        //   console.log("targetColors", targetColor);
        //   console.log("modifiedColors", modifiedColors);
        // }
        this.color = modifiedColors;
        const [red, green, blue, alpha] = modifiedColors;
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillStyle = color;
        // ctx.fill();
        ctx.strokeStyle = color;
        // ctx.lineWidth = 3;
        ctx.stroke();

        // const origin = {
        //   x: 0,
        //   y: window.innerHeight
        // };

        const { startX, startY } = p;

        const rangeX = origin.x - startX;
        const rangeY = origin.y - startY;
        const ratio = rangeY / rangeX;
        const yPixelsPerFrame = rangeY > 0 ? 2 : -2;
        const xPixelsPerFrame = yPixelsPerFrame / ratio;

        // Update the particle's location and life
        p.remainingLife--;
        p.radius -= 0.05;
        p.startX += xPixelsPerFrame; // p.speed.x;
        p.startY += yPixelsPerFrame; // p.speed.y;
      } else {
        // console.log("REMAINING LIFE", this.remainingLife);
        // console.log("RADIUS", this.radius);
      }
    };
  };

  let particles = [];
  const createParticleAtPoint = (x, y, colorData) => {
    let particle = new ExplodingParticle();
    particle.rgbArray = colorData;
    particle.startX = x;
    particle.startY = y;
    particle.startTime = Date.now();
    particle.id = `${x}-${y}`;

    particles.push(particle);
  };

  const particleCtx = particleCanvas.getContext("2d");

  const update = () => {
    // Clear out the old particles
    if (typeof particleCtx !== "undefined") {
      particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    // Draw all of our particles in their new location
    for (let i = 0; i < particles.length; i++) {
      particles[i].draw(particleCtx);

      // Simple way to clean up if the last particle is done animating
      if (i === particles.length - 1) {
        let percent =
          (Date.now() - particles[i].startTime) /
          particles[i].animationDuration;

        if (percent > 1) {
          particles = [];
        }
      }
    }

    // Animate performantly
    window.requestAnimationFrame(update);
  };

  // Go through every location of our button and create a particle
  for (let localX = 0; localX < width; localX += 2) {
    for (let localY = 0; localY < height; localY += 2) {
      if (count % reductionFactor === 0) {
        let index = (localY * width + localX) * 4;
        let rgbaColorArr = colorData.slice(index, index + 4);
        // console.log("rgbaColorArr", rgbaColorArr);

        let bcr = target.getBoundingClientRect();
        let globalX = bcr.left + localX;
        let globalY = bcr.top + localY;

        // if (rgbaColorArr[3] > 0) {
        //   createParticleAtPoint(globalX, globalY, rgbaColorArr);
        // }
        if (
          !// rgbaColorArr[0] === 0 &&
          // rgbaColorArr[1] === 0 &&
          // rgbaColorArr[2] === 0 &&
          (rgbaColorArr[3] === 0)
        ) {
          createParticleAtPoint(globalX, globalY, rgbaColorArr);
        }
      }
      count++;
    }
  }

  window.requestAnimationFrame(update);
};

export default absorb;
