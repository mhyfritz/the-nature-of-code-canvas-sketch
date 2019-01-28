import canvasSketch from "canvas-sketch";
import { line, rectangle } from "../../shapes";
import { Vector } from "../types";
import { withMouse } from "../../utils";

const settings = {
  animate: true,
  dimensions: [640, 360]
};

const sketch = () => {
  return ({ context, width, height, mouse }) => {
    rectangle(context, 0, 0, width, height, { fillStyle: "white" });

    const center = new Vector(width / 2, height / 2);
    const mouseVec = new Vector(mouse.x, mouse.y);

    mouseVec.sub(center);
    mouseVec.normalize();
    mouseVec.mult(50);

    context.translate(center.x, center.y);
    line(context, 0, 0, mouseVec.x, mouseVec.y);
  };
};

canvasSketch(withMouse(sketch), settings);
