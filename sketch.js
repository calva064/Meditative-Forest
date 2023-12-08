//establish variables
let video;
let slider;
let button;
let font;
let buttonText='Hide video feed';
let song;

//preload font and music
function preload(){
  font = loadFont('Medieval.ttf')
  song = loadSound('ArrivalinNara.m4a')
}


//set up canvas
function setup() {
  
  createCanvas(windowWidth,windowHeight);
  video = createCapture(VIDEO); 
  
  //center video
  image(video, 0, 0);
  video.size(500, 500);
  video.position(windowWidth / 2 - video.width / 2,windowHeight / 2 - video.height / 2);//chatGPT assisted
  
  //create button
  button = createButton(buttonText);
  button.position(windowWidth/7,windowHeight/1.05);

  //create slider
  slider = createSlider(20, 100, 50);
  slider.position(windowWidth / 2 - button.width / 2+400,windowHeight/1.14);
  slider.size(80);
    
  
  //if button is pressed, show/hide video
  button.mousePressed(() => {

    if (buttonText == 'Show video feed' && mouseIsPressed){
      video.show();
      buttonText = 'Hide video feed'
      button.html(buttonText)//chatGPT assisted
    }
    else if (buttonText == 'Hide video feed' && mouseIsPressed){
    video.hide();
    buttonText = 'Show video feed'
    button.html(buttonText)//chatGPT assisted
    }
    
  });

}



function draw() {

  //play song
  if (!song.isPlaying()){
    song.play();
  }

  //create colors for gradient
  let ltOrange = color(196, 170, 155);
  let ltBlue = color(155, 175, 196);

  //chatGPT assisted
  for (let y = 0; y < windowHeight; y++) {
    let interColor = lerpColor(ltOrange, ltBlue, y / windowHeight);
    stroke(interColor)
    line(0,y,windowWidth,y)
  }

  //load video pixels
  video.loadPixels();

  //set xSpace to slider value
  let xSpace = slider.value();
    

  // loop over every xSpace pixels and every y pixel in the video
  for (let x = 0; x < windowWidth; x+=xSpace) {
    for (let y = 0; y < 4000; y++) {

  //pull the r value from every pixel in the video stream
  const pixelRed = getQuick(video, x, y)[0];
  strokeWeight(0.3)
  stroke(getQuick(video, x, y)[0],getQuick(video, x, y)[1],getQuick(video, x, y)[2],getQuick(video, x, y)[3]);//determines color of strokes


      // pick a random value and compare it pixelRed
      if (random(255) < pixelRed) {
        drawGrassBlade(x, y);
        
      }
    }
  }

  //create text
  textFont(font)
  textSize(20)
  fill(255)
  noStroke();
  text(" Welcome to the meditative forest. The magical trees are generated \n using a live video feed. If you would like to hide your video, please \n click the button below.", 0,windowHeight-90)
  text('Slide left to populate the forest. Slide right to create clearings.',windowWidth / 2 - button.width / 2+150,windowHeight-90)
  text("Soundscape credits: Alt-J, Arrival in Nara",windowWidth / 2 - button.width / 2+150,windowHeight-20)
}

//draw blades of grass, bias towards taller blades
function drawGrassBlade(x, y) {
  const bladeHeight = max(
    random(1, 60),
    random(1, 60),
    random(1, 60),
    random(1, 60),
    random(1, 60),
    random(1, 60)
  );

  let bladeLean = random(-0.3, 0.3);
  bladeLean *= bladeHeight;
  line(x, y, x - bladeLean, y + bladeHeight);

}

// find the RGBA values of the pixel at x, y in the array
function getQuick(video, x, y) {
  const i = (y * video.width + x) * 4;
  return [
    video.pixels[i],
    video.pixels[i + 1],
    video.pixels[i + 2],
    video.pixels[i + 3],
  ];
}

//References
//https://editor.p5js.org/reginaflores/sketches/0cZdqLv8f
//https://compform.net/js_lab/js_lab.html?https://sketches2022fall.compform.net/posts/CeYuHCwzMpTGwqHug/code
//https://p5js.org/reference/#/p5/createSlider
//fonts.google.com/specimen/MedievalSharp
//Alt-J, Arrival in Nara 
