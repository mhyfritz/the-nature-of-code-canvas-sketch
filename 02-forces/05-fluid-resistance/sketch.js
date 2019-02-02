import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import { Liquid, Mover, Vector } from "../types";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

const nMovers = 10;

function setupMovers() {
  const movers = [];
  for (let i = 0; i < nMovers; i += 1) {
    movers.push(
      new Mover({
        location: new Vector((i + 1) * 60, 0),
        mass: random.range(0.4, 2)
      })
    );
  }
  return movers;
}

const sketch = ({ canvas, width, height }) => {
  let movers = setupMovers();

  canvas.addEventListener("click", () => {
    movers = setupMovers();
  });

  const liquid = new Liquid({
    y: height / 2,
    w: width,
    h: height / 2,
    c: 0.075
  });

  return ({ context }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.font = "12px sans-serif";
    context.fillStyle = "black";
    context.fillText("click mouse to reset", 10, 20);

    liquid.display(context, { fillStyle: `rgb(10,10,30)` });

    for (const mover of movers) {
      const gravity = new Vector(0, 0.1 * mover.mass);
      mover.applyForce(gravity);

      if (liquid.contains(mover)) {
        const dragForce = liquid.dragForce(mover);
        mover.applyForce(dragForce);
      }

      mover.update();
      mover.display(context, { fillStyle: "rgba(255,105,180,0.75)" });
      mover.checkEdges(width, height, false);
    }
  };
};

canvasSketch(sketch, settings);
