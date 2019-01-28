import canvasSketch from "canvas-sketch";
import { circle } from "../../shapes";
import { Vector } from "../types";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

let location = new Vector(100, 100);
let velocity = new Vector(2.5, 5);

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    circle(context, location.x, location.y, 20);

    location.add(velocity);

    if (location.x < 0 || location.x > width) {
      velocity.x *= -1;
    }

    if (location.y < 0 || location.y > height) {
      velocity.y *= -1;
    }
  };
};

canvasSketch(sketch, settings);
