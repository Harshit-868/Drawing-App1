var bSlider, brushVal, clr, btn1, btn2;
var sPos = [];
var tool = "brush";

function setup() {
  createCanvas(400, 400);
  frameRate(100);

  bSlider = createSlider(1, 25, 13, 0);
  bSlider.position(20, 375);

  clr = createInput("", 'color');
  clr.position(180, 375);

  btn1 = createButton("Brush");
  btn1.position(290, 350);
  btn2 = createButton("Erase");
  btn2.position(290, 378);
}

function draw() {
  background(255);

  // Text
  fill("black");
  noStroke();
  textSize(15);
  text("Stroke Weight:", 30, 360);
  text("Stroke Colour:", 165, 360);

  // Tool
  for (var s in sPos) {
    if (sPos[s][4] == "brush") {
      fill(sPos[s][3]);
      noStroke();
      ellipse(sPos[s][0], sPos[s][1], sPos[s][2]);
    }

    if (sPos[s][4] == "eraser") {
      fill("white");
      noStroke();
      rect(sPos[s][0], sPos[s][1], sPos[s][2] + 5, sPos[s][2] + 5);
    }
  }

  // Borders
  stroke("black");
  strokeWeight(5);
  textSize(15);
  line(0, 0, 400, 0);
  line(0, 400, 400, 400);
  line(0, 0, 0, 400);
  line(400, 0, 400, 400);
  strokeWeight(3);
  line(0, 335, 400, 335);

  // Tool
  if (tool == "brush") {
    stroke("black")
    strokeWeight(1);
    fill(clr.value());
    
    if (mouseX < 400 && mouseX > 10 && mouseY < 330 && mouseY > 10) {
      ellipse(mouseX, mouseY, bSlider.value());
    } else {
      ellipse(31, 305, bSlider.value());
    }

  } else if (tool == "eraser") {
    stroke("black");
    strokeWeight(1);
    fill("white");
    rectMode(CENTER);
    if (mouseX < 400 && mouseX > 10 && mouseY < 330 && mouseY > 10) {
      rect(mouseX, mouseY, bSlider.value() + 5, bSlider.value() + 5);
    } else {
      rect(31, 305, bSlider.value() + 5, bSlider.value() + 5);
    }
  }

  // Buttons
  btn1.mousePressed(() => {
    tool = "brush";
  })

  btn2.mousePressed(() => {
    tool = "eraser";
  })
}

function mouseDragged() {
  if (mouseX < 400 && mouseX > 10 && mouseY < 330 && mouseY > 10) {
    sPos.push([mouseX, mouseY, bSlider.value(), clr.value(), tool]);
  }
}

function keyPressed() {
  if (keyCode == 66) {
    tool = "brush";
  } else if (keyCode == 69) {
    tool = "eraser";
  }
}