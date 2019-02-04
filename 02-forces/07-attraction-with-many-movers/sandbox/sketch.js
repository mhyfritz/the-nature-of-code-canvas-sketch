import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import { Attractor, Mover, Vector } from "./types";
import { withMouse } from "./utils";
const settings = {
  animate: true,
  dimensions: [640, 360]
};
const nMovers = 10;

const sketch = ({
  width,
  height
}) => {
  const movers = [];

  for (let i = 0; i < nMovers; i += 1) {
    movers.push(new Mover({
      mass: random.range(0.1, 1.5),
      location: new Vector(random.range(width), random.range(height))
    }));
  }

  const a = new Attractor({
    mass: 20,
    G: 0.4,
    location: new Vector(width / 2, height / 2)
  });
  return ({
    context,
    mouse
  }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height); // TODO: should only move object when clicked *on* it
    // currently clicking *anywhere* on the canvas will move it

    if (mouse.event && mouse.event.buttons === 1) {
      a.location = new Vector(mouse.x, mouse.y);
    }

    a.display(context, {
      fillStyle: "rgb(10,10,30)"
    });

    for (const mover of movers) {
      const force = a.attractionForce(mover);
      mover.applyForce(force);
      mover.update();
      mover.display(context, {
        fillStyle: "rgba(255,105,180,0.75)"
      });
    }
  };
};

canvasSketch(withMouse(sketch), settings);