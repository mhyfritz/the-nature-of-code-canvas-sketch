import canvasSketch from "canvas-sketch";
import { line, rectangle } from "./shapes";
import { Vector } from "./types";
import { withMouse } from "./utils";
const settings = {
  animate: true,
  dimensions: [640, 360]
};

const sketch = () => {
  return ({
    context,
    width,
    height,
    mouse
  }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    const center = new Vector(width / 2, height / 2);
    const mouseVec = new Vector(mouse.x, mouse.y);
    mouseVec.sub(center);
    const m = mouseVec.mag();
    rectangle(context, 0, 0, m, 10);
    context.translate(center.x, center.y);
    line(context, 0, 0, mouseVec.x, mouseVec.y);
  };
};

canvasSketch(withMouse(sketch), settings);