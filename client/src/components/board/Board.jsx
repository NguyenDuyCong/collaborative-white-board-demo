import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import "./Board.css";

let timeout;
var ctx;
let socket = io.connect("http://192.168.43.56:5000", {
  transports: ["websocket", "polling", "flashsocket"]
});

const Board = ({ color, size }) => {
  console.log(`size: ${size}`);

  socket.on("canvas-data", (data) => {
    var image = new Image();
    var canvas = document.querySelector("#board");
    ctx = canvas.getContext("2d");
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    };
    image.src = data;
  });

  useEffect(() => {
    drawOnCanvas();
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    }
  }, [size, color]);

  const drawOnCanvas = () => {
    var canvas = document.querySelector("#board");
    ctx = canvas.getContext("2d");

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    // console.log(color);
    /* Drawing on Paint App */
    ctx.lineWidth = size;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    canvas.addEventListener(
      "mousedown",
      function (e) {
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeout !== undefined) clearTimeout(timeout);
      timeout = setTimeout(() => {
        let base64ImageData = canvas.toDataURL("image/png");
        socket.emit("canvas-data", base64ImageData);
        // console.log(base64ImageData);
      }, 1000);
    };
  };

  return (
    <div className="sketch" id="sketch">
      <canvas className="board" id="board"></canvas>
    </div>
  );
};

export default Board;
