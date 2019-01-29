import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import { Mover, Vector } from "./types";
const settings = {
  animate: true,
  dimensions: [640, 360]
};
const nMovers = 100;

const sketch = ({
  width,
  height
}) => {
  const movers = [];

  for (let i = 0; i < nMovers; i += 1) {
    movers.push(new Mover({
      mass: random.range(0.1, 2.5)
    }));
  }

  const wind = new Vector(0.01, 0);
  return ({
    context
  }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (const mover of movers) {
      const gravity = new Vector(0, 0.1 * mover.mass);
      mover.applyForce(wind);
      mover.applyForce(gravity);
      mover.update();
      mover.display(context, {
        fillStyle: "rgba(255,105,180,0.75)"
      });
      mover.checkEdges(width, height);
    }
  };
};

canvasSketch(sketch, settings);