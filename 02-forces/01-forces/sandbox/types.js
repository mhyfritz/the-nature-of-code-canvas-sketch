import { circle } from "./shapes";
import { TWO_PI } from "./constants";
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
  /* credits: p5.js */


  static fromAngle(angle, length = 1) {
    return new Vector(length * Math.cos(angle), length * Math.sin(angle));
  }

  static random2D() {
    return this.fromAngle(Math.random() * TWO_PI);
  }

  static div(v, n) {
    const vec = new Vector(v.x, v.y);
    vec.div(n);
    return vec;
  }

  static sub(v1, v2) {
    const vec = new Vector(v1.x, v1.y);
    vec.sub(v2);
    return vec;
  }

}
export class Mover {
  constructor(options = {}) {
    const {
      location = new Vector(),
      velocity = new Vector(),
      acceleration = new Vector(),
      mass = 1
    } = options;
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.mass = mass;
  }

  applyForce(force) {
    const f = Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display(context, options = {}) {
    const {
      r = 16
    } = options;
    circle(context, this.location.x, this.location.y, r * this.mass, options);
  }

  checkEdges(width, height) {
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    }

    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x *= -1;
    }

    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y *= -1;
    }
  }

}