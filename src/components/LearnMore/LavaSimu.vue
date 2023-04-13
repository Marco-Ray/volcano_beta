<template>
  <div ref="canvasContainer" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
import p5 from "p5";

export default {
  name: "LavaTest",
  mounted() {
    new p5(this.sketch, this.$refs.canvasContainer);
  },
  methods: {
    sketch(p) {
      let objs = [];
      const noiseScale = 0.01;
      const palette = ['#361914','#7c3c30','#994835',"rgb(196,73,49)","rgb(231,93,54)",
          "rgb(46,48,47)","rgb(78,77,64)","rgb(63,63,58)","rgb(101,76,82)","rgb(206,97,76)","rgb(221,65,18)",
        "rgb(204,76,57)","rgb(84,63,66)","rgb(211,105,63)","rgb(63,60,66)",];
        // "rgb(253,183,60)",

      p.setup = function () {
        const containerWidth = p.canvas.parentNode.offsetWidth;
        const containerHeight = p.canvas.parentNode.offsetHeight;
        p.createCanvas(containerWidth, containerHeight); // create the canvas for the sketch;
        p.angleMode(p.DEGREES);
        p.noStroke();
        // p.background('rgba(54,25,20,0.6)');  //background color
        drawMountainShape();// draw a template area with the mountain shape
      };

      function pointIsInsideMountain(x, y) {
        const mountainHeight = p.height * 0.9;
        const mountainWidth = p.width * 0.9;
        const mountainPeakX = p.width / 2;
        const mountainPeakY = p.height - mountainHeight;

        const slope = mountainHeight / (mountainWidth / 2); // slope of the mountain
        const leftBoundary = mountainPeakX - (y - mountainPeakY) / slope; // left boundary of the mountain
        const rightBoundary = mountainPeakX + (y - mountainPeakY) / slope; // right boundary of the mountain

        return x >= leftBoundary && x <= rightBoundary; // return true if the point is inside the mountain
      }

      function drawMountainShape() {
        const containerWidth = p.canvas.parentNode.offsetWidth;
        const containerHeight = p.canvas.parentNode.offsetHeight;
        const mountainHeight = containerHeight * 0.12;
        const mountainWidth = containerWidth * 0.5;
        p.fill('rgba(235,209,189,0.5)');
        p.beginShape();
        p.vertex(mountainWidth*0.20, containerHeight);
        p.vertex(mountainWidth*0.98, mountainHeight);
        p.vertex(mountainWidth*0.985, mountainHeight);
        p.vertex(mountainWidth*0.99, mountainHeight*1.2);
        p.vertex(mountainWidth*0.995, mountainHeight*1.3);
        p.vertex(mountainWidth, mountainHeight);
        p.vertex(mountainWidth*1.02, mountainHeight);
        p.vertex(mountainWidth*1.80, containerHeight);
        p.endShape(p.CLOSE);
      }

      p.windowResized = function () {
        const containerWidth = p.canvas.parentNode.offsetWidth;
        const containerHeight = p.canvas.parentNode.offsetHeight;
        p.resizeCanvas(containerWidth, containerHeight); // resize the canvas
        p.background('rgba(163,158,156,0.4)');  // redraw the background color
        drawMountainShape();// redraw the mountain shape
      };

      p.draw = function () {
        objs.push(new Obj(p.mouseX, p.mouseY,pointIsInsideMountain));

        for (let i = 0; i < objs.length; i++) {
          objs[i].move();
          objs[i].display();
        }

        for (let j = objs.length - 1; j >= 0; j--) {
          if (objs[j].isFinished()) {
            objs.splice(j, 1);
          }
        }
      };

      class Obj {
        constructor(ox, oy,pointIsInsideMountain) {
          this.init(ox, oy);
          this.pointIsInsideMountain = pointIsInsideMountain;
        }

        init(ox, oy) {
          this.vel = p.createVector(0, 0);
          this.pos = p.createVector(ox, oy);
          this.t = p.random(0, noiseScale);
          this.lifeMax = p.random(5, 10);
          this.life = this.lifeMax;
          this.step = p.random(0.1, 0.5);
          this.dMax = p.random(10) >= 5 ? 5 : 10; // 50% chance to be 5, 50% chance to be 20
          this.d = this.dMax;
          this.c = p.color(p.random(palette));
        }

        move() {
          let theta = p.map(
            p.noise(this.pos.x * noiseScale, this.pos.y * noiseScale, this.t),
            0,
            1,
            -360,
            270
          );
          this.vel.x = p.cos(theta);
          this.vel.y = -p.sin(theta);
          this.pos.add(this.vel);
        }

        isFinished() {
          this.life -= this.step;
          this.d = p.map(this.life, 0, this.lifeMax, 0, this.dMax);
          if (this.life < 0) {
            return true;
          } else {
            return false;
          }
        }
        display() {
          if (this.pointIsInsideMountain(this.pos.x, this.pos.y)) {
            p.fill(this.c); // set the color
            p.circle(this.pos.x, this.pos.y, this.d); // draw the circle
          }
        }
      }
    },
  },
};
</script>


