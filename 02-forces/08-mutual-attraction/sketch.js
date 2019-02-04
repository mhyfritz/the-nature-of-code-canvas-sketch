import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import { Mover, Vector } from "../types";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

const nMovers = 10;

const sketch = ({ width, height }) => {
  const movers = [];
  for (let i = 0; i < nMovers; i += 1) {
    movers.push(
      new Mover({
        mass: random.range(0.1, 1.5),
        G: 0.3,
        location: new Vector(random.range(width), random.range(height))
      })
    );
  }

  return ({ context }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    for (const m1 of movers) {
      for (const m2 of movers) {
        if (m1 === m2) {
          continue;
        }
        const force = m2.attractionForce(m1);
        m1.applyForce(force);
      }
      m1.update();
      m1.display(context, { fillStyle: "rgba(255,105,180,0.75)" });
    }
  };
};

canvasSketch(sketch, settings);
