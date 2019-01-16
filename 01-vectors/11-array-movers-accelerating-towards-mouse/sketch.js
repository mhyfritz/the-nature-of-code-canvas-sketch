import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import { Mover, Vector } from "../../types";
import { withMouse } from "../../utils";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

const nMovers = 20;

const sketch = ({ width, height }) => {
  const movers = [];
  for (let i = 0; i < nMovers; i += 1) {
    movers.push(
      new Mover(
        new Vector(random.range(width), random.range(height)),
        new Vector(),
        new Vector()
      )
    );
  }
  return ({ context, mouse }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    const mouseVec = new Vector(mouse.x, mouse.y);
    for (const mover of movers) {
      const direction = Vector.sub(mouseVec, mover.location);
      direction.normalize();
      direction.mult(0.5);
      mover.update(direction);
      mover.display(context, { fillStyle: "rgba(255,105,180,0.75)" });
    }
  };
};

canvasSketch(withMouse(sketch), settings);
