import canvasSketch from "canvas-sketch";
import { Mover, Vector } from "../../types";
import { withMouse } from "../../utils";

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
  return ({ context, mouse }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    const direction = new Vector(mouse.x, mouse.y);
    direction.sub(mover.location);
    direction.normalize();
    direction.mult(0.5);
    mover.update(direction);
    mover.display(context);
  };
};

canvasSketch(withMouse(sketch), settings);
