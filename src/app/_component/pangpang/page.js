"use client";
import { useEffect } from "react";
import "./firework.scss";

export class Particle {
  constructor(id, opt) {
    if (typeof window === "undefined") return;
    this.box = document.getElementById(id);
    this.number = opt.number || 100;
    this.colors = this.handleArrayParams(opt.colors) || [
      "#400606",
      "#c7b4aa",
      "#ffffff",
    ];
    this.width = opt.width || 15;
    this.height = opt.height || 7;
    this.duration = opt.duration || 2000;
    this.delay = opt.delay || 2000;
  }
  handleArrayParams(arr) {
    return Array.isArray(arr) &&
      arr.length > 0 &&
      arr.every((el) => el[0] === "#")
      ? arr
      : false;
  }
  getRandom(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  getRange(num, range = 0.5) {
    const symbol = Math.random() > 0.5 ? +1 : -1;
    return num + this.getRandom(Math.floor(num * range)) * symbol;
  }
  start() {
    for (let i = 0; i < this.number; i++) {
      const temp = document.createElement("span");
      temp.style.cssText += `
        position: absolute;
        transform-style: preserve-3d;
        animation-timing-function: cubic-bezier(${
          this.getRandom(3) * 0.1
        }, 0, 1, 1);
        animation-iteration-count: 2;
        width: ${this.getRange(this.width, 0.7)}px;
        height: ${this.getRange(this.height, 0.7)}px;
        top: -${this.width * 2}px;
        left: calc(${this.getRandom(100)}% - ${this.width * 0.5}px);
        background-color: ${
          this.colors[this.getRandom(this.colors.length - 1)]
        };
        animation-name: fallen_${this.getRandom(5, 1)};
        animation-duration: 1000ms;
        animation-delay: ${this.getRange(this.delay)}ms;
       `;
      this.box.append(temp);
    }
  }
}

export default function PangPang() {
  // useEffect(() => {
  //   const party = new Particle("particle", {
  //     number: 200,
  //     colors: ["#ffca76", "#ffb9b9", "#fff180"],
  //   });
  //   party.start();
  // }, []);
  return <></>;
}
