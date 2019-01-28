import { TWO_PI } from "./constants";
export function circle(context, x, y, radius, options = {}) {
  const {
    strokeStyle = "black",
    fillStyle = "hotpink"
  } = options;
  context.save();
  context.beginPath();
  context.arc(x, y, radius, 0, TWO_PI, false);

  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
    context.stroke();
  }

  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }

  context.restore();
}
export function line(context, x1, y1, x2, y2, options = {}) {
  const {
    strokeStyle = "black",
    lineWidth = 1
  } = options;
  context.save();
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.restore();
}
export function rectangle(context, x1, y1, x2, y2, options = {}) {
  const {
    strokeStyle,
    fillStyle = "black"
  } = options;
  context.save();
  context.rect(x1, y1, x2, y2);

  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
    context.stroke();
  }

  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }

  context.restore();
}