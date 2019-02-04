import canvasSketch from "canvas-sketch";
import { Attractor, Mover, Vector } from "../types";
import { withMouse } from "../../utils";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

const sketch = ({ width, height }) => {
  const m = new Mover({ location: new Vector(width / 4, height / 4) });
  const a = new Attractor({
    mass: 20,
    G: 0.4,
    location: new Vector(width / 2, height / 2)
  });

  return ({ context, mouse }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // TODO: should only move object when clicked *on* it
    // currently clicking *anywhere* on the canvas will move it
    if (mouse.event && mouse.event.buttons === 1) {
      a.location = new Vector(mouse.x, mouse.y);
    }

    const force = a.attractionForce(m);
    m.applyForce(force);
    m.update();

    a.display(context, { fillStyle: "rgb(10,10,30)" });
    m.display(context, { fillStyle: "rgba(255,105,180,0.75)" });
  };
};

canvasSketch(withMouse(sketch), settings);
