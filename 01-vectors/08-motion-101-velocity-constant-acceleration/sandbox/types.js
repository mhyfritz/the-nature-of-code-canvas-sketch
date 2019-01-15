import { circle } from "./shapes";
export class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
  }

  div(n) {
    this.x /= n;
    this.y /= n;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  setMag(mag) {
    this.normalize();
    this.mult(mag);
  }

  normalize() {
    const m = this.mag();

    if (m !== 0) {
      this.div(m);
    }
  }

  limit(maxMag) {
    if (this.mag() > maxMag) {
      this.setMag(maxMag);
    }
  }

}
export class Mover {
  constructor(location, velocity, acceleration, topSpeed = 10) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.topSpeed = topSpeed;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
  }

  display(context, r = 16, options = {}) {
    circle(context, this.location.x, this.location.y, r, options);
  }

  checkEdges(width, height) {
    if (this.location.x > width) {
      this.location.x = 0;
    }

    if (this.location.x < 0) {
      this.location.x = width;
    }

    if (this.location.y > height) {
      this.location.y = 0;
    }

    if (this.location.y < 0) {
      this.location.y = height;
    }
  }

}