import canvasSketch from "canvas-sketch";
import { Mover, Vector } from "../../types";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

const sketch = ({ width, height }) => {
  const mover = new Mover(
    new Vector(width / 2, height / 2),
    new Vector(),
    new Vector(-0.001, 0.01)
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
