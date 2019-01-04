import { TWO_PI } from "./constants";

export function circle(context, x, y, radius, options = {}) {
  const { strokeStyle = "black", fillStyle = "hotpink" } = options;
  context.save();
  context.beginPath();
  context.arc(x, y, radius, 0, TWO_PI, false);
  context.strokeStyle = strokeStyle;
  context.stroke();
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  context.restore();
}
