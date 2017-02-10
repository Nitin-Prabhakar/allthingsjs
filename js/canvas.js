var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
context.save();
var image = new Image();
image.src = "schro.jpg";
var startx = 0;
var starty = 0;
image.onload = function(){
  //render an image on canvas
  context.drawImage(image,startx,starty,canvas.width,canvas.height);
  //open rendered image
  //window.open(canvas.toDataURL());
  //draw rectangles
  //context.strokeRect(64,123.4.9,canvas.width/1.5,canvas.height/2.25);
  context.strokeRect(64,123.4,canvas.width/1.5,canvas.height/2.25);
  //clear rectangle
  context.clearRect(64,123.4,canvas.width/1.5,canvas.height/2.25);


  //Draw something

  context.fillStyle = '#dfd69a';
  //context.strokeStyle = 'rgba(0,0,0,0.025)';


  context.beginPath();

  context.moveTo(120,179.4);

  context.lineTo(210,179.4);
  context.lineTo(210,269.4);
  context.lineTo(120,269.4);
  context.lineTo(120,179.4);

  context.stroke();


  context.closePath();
  context.beginPath();

  context.moveTo(75,134.4);
  context.lineTo(75,224.4);
  context.lineTo(165,224.4);
  context.lineTo(165,134.4);
  context.lineTo(75,134.4);

  context.stroke();

  context.closePath();
  context.beginPath();

  context.moveTo(75,134.4);
  context.lineTo(120,179.4);
  context.lineTo(210,179.4);
  context.lineTo(165,134.4);
  context.lineTo(75,134.4);
  context.stroke();


  context.closePath();
  context.beginPath();

  context.moveTo(75,224.4);
  context.lineTo(120,269.4);
  context.lineTo(210,269.4);
  context.lineTo(165,224.4);
  context.lineTo(75,224.4);
  context.stroke();

  context.closePath();
  context.beginPath();

  context.moveTo(75,224.4);
  context.lineTo(75,134.4);
  context.lineTo(120,179.4);
  context.lineTo(120,269.4);
  context.lineTo(75,224.4);
  context.stroke();


  context.closePath();
  context.beginPath();

  context.moveTo(165,224.4);
  context.lineTo(210,269.4);
  context.lineTo(210,179.4);
  context.lineTo(165,134.4);
  context.lineTo(165,224.4);

  context.stroke();


};
