import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import { Mover, Vector } from "../../types";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

const sketch = ({ width, height }) => {
  const mover = new Mover(
    new Vector(random.range(width), random.range(height)),
    new Vector(random.range(-2, 2), random.range(-2, 2))
  );
  return ({ context }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    mover.update();
    mover.checkEdges(width, height);
    mover.display(context);
  };
};

canvasSketch(sketch, settings);
