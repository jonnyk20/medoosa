const explode = async (canvas, target, particleCanvas) => {
  let ctx;


  ctx = canvas.getContext("2d");

  let reductionFactor = 17;
  target.style.visibility = "hidden";
  // Get the color data for our button
  let width = target.offsetWidth;
  let height = target.offsetHeight;
  let colorData = ctx.getImageData(0, 0, width, height).data;

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

        this.color = modifiedColors;
        const [red, green, blue, alpha] = modifiedColors;
        const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillStyle = color;
        // ctx.fill();
        ctx.strokeStyle = color;
        // ctx.lineWidth = 3;
        ctx.stroke();

        // Update the particle's location and life
        p.remainingLife--;
        p.radius -= 0.05;
        p.startX += p.speed.x;
        p.startY += p.speed.y;
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
  for (let localX = 0; localX < width; localX += 8) {
    for (let localY = 0; localY < height; localY += 8) {
      if (count % reductionFactor === 0) {
        let index = (localY * width + localX) * 8;
        let rgbaColorArr = colorData.slice(index, index + 8);

        let bcr = target.getBoundingClientRect();
        let globalX = bcr.left + localX;
        let globalY = bcr.top + localY;

        // if (rgbaColorArr[3] > 0) {
        //   createParticleAtPoint(globalX, globalY, rgbaColorArr);
        // }
        if (!(rgbaColorArr[3] === 0)) {
          createParticleAtPoint(globalX, globalY, rgbaColorArr);
        }
      }
      count++;
    }
  }

  window.requestAnimationFrame(update);
};

export default explode;
