

const absorb = async (canvas, target, origin, particleCanvas) => {
  let ctx;
  let isFinished = false;
  ctx = canvas.getContext("2d");


  let reductionFactor = 93;
  // Get the color data for our button
  let width = target.offsetWidth;
  let height = target.offsetHeight;
  let colorData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  target.style.visibility = "hidden";

  // Keep track of how many times we've iterated (in order to reduce
  // the total number of particles create)
  let count = 0;

  const targetColor = [135, 206, 235, 255];

  /* An "exploding" particle effect that uses circles */
  const ExplodingParticle = function() {
    // Set how long we want our particle to animate for
    this.animationDuration = 3000; // in ms

    // Size our particle
    this.radius = 5 + Math.random() * 5;

    // Set a max time to live for our particle
    this.hasReachedOrigin = false;

    // This function will be called by our animation logic later on
    this.draw = ctx => {
      let p = this;

      if (this.radius > 0 && !this.hasReachedOrigin) {
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
        ctx.strokeStyle = color;
        ctx.stroke();

        const { startX, startY } = p;

        const rangeX = origin.x - startX;
        const rangeY = origin.y - startY;
        const ratio = rangeY / rangeX;
        const yPixelsPerFrame = rangeY > 0 ? 2 : -2;
        const xPixelsPerFrame = yPixelsPerFrame / ratio;

        const distance = Math.sqrt( rangeX * rangeX +  rangeY * rangeY);


        if (distance < 5) {
          p.hasReachedOrigin = true;
        }

        // Update the particle's location and life
        p.radius -= 0.05;
        p.startX += xPixelsPerFrame;
        p.startY += yPixelsPerFrame;
      } 
    };
  };

  let particles = [];
  const createParticleAtPoint = (x, y, colorData, id) => {
    let particle = new ExplodingParticle();
    particle.rgbArray = colorData;
    particle.startX = x;
    particle.startY = y;
    particle.startTime = Date.now();
    particle.id = id;

    particles.push(particle);
  };

  const particleCtx = particleCanvas.getContext("2d");

  const animateParticles = particlesArr => {
    particlesArr.forEach((particle, i) => {
      particle.draw(particleCtx);
      // Simple way to clean up if the last particle is done animating
      if (i === particles.length - 1) {
        let percent =
          (Date.now() - particle.startTime) /
          particle.animationDuration;

        if (percent > 1) {
          particles = [];
          isFinished = true;
        }
      }
    })
  }


  const update = () => {
    // Clear out the old particles
    if (typeof particleCtx !== "undefined") {
      particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
    // Draw all of our particles in their new location
      animateParticles(particles);

    // Animate performantly
    if (!isFinished) {
      window.requestAnimationFrame(update);
    } else {
      target.style.visibility = "hidden";
      particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      canvas.remove();
    }
  };

  let particleIndex = 0;
  // Go through every location of our button and create a particle
  for (let localX = 0; localX < width; localX += 1) {
    for (let localY = 0; localY < height; localY += 1) {
      if (count % reductionFactor === 0) {
        let index = (localY * width + localX) * 4;
        let rgbaColorArr = colorData.slice(index, index + 4);

        let bcr = target.getBoundingClientRect();
        let globalX = bcr.left + localX;
        let globalY = bcr.top + localY;

        // if (rgbaColorArr[3] > 0) {
        //   createParticleAtPoint(globalX, globalY, rgbaColorArr);
        // }
        if (
          !(rgbaColorArr[3] === 0)
        ) {
          const id = particleIndex;
          particleIndex += 1;
          createParticleAtPoint(globalX, globalY, rgbaColorArr, id);
        }
      }
      count++;
    }
  }

    window.requestAnimationFrame(update);
  
};

export default absorb;
