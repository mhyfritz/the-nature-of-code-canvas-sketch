import canvasSketch from "canvas-sketch";
import { Mover, Vector } from "./types";
const settings = {
  animate: true,
  dimensions: [640, 360]
};

const sketch = ({
  width,
  height
}) => {
  const mover = new Mover({
    location: new Vector(30, 30)
  });
  const wind = new Vector(0.01, 0);
  const gravity = new Vector(0, 0.1);
  return ({
    context
  }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    mover.applyForce(wind);
    mover.applyForce(gravity);
    mover.update();
    mover.display(context);
    mover.checkEdges(width, height);
  };
};

canvasSketch(sketch, settings);