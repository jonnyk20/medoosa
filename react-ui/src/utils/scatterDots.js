function freshDot() {
  this.obj = document.createElement("div")
  this.obj.classList.add("dot")
  this.obj.style.top = window.innerHeight * Math.random() + "px"
  this.obj.style.left = window.innerWidth * Math.random() + "px"

  document.body.insertBefore(this.obj, document.body.firstChild)
}

const scatterDots = () => {
  var dot = []
  for (var i = 0; i < 200; i++) {
    dot.push(new freshDot())
  }
}

const initiateScatterDots = () => {
  scatterDots()
}
export default initiateScatterDots
