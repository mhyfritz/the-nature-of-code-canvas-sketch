import canvasSketch from "canvas-sketch";
import { circle } from "../../shapes";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

let x = 100;
let y = 100;
let xspeed = 1;
let yspeed = 3.3;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    circle(context, x, y, 20);

    x += xspeed;
    y += yspeed;

    if (x < 0 || x > width) {
      xspeed *= -1;
    }

    if (y < 0 || y > height) {
      yspeed *= -1;
    }
  };
};

canvasSketch(sketch, settings);
