let inputBox;
let selectionBox;
let speechGen;
let speechRec;
let listening;
let video;
let poseNet;
let poses = [];
let speech;
let output

var myRec = new p5.SpeechRec();

function setup() {
	createCanvas(800, 300);
	background(255);
	video = createCapture(VIDEO);
	video.size(width, height);

	let btnRecognize = createButton("Say Something");
	textSize(32);
	textAlign(CENTER);
	btnRecognize.position(100, 50);
	btnRecognize.mouseClicked(recognizeSpeech);

	// Initialize the speech engine
	speechGen = new p5.Speech("Google US English");
	speechRec = new p5.SpeechRec('en-US');

	listening = false;
	output = select('#speech')
	frameRate(7)
}

function recognizeSpeech() {
	listening = true;
	speechRec.onResult = recognizeFinished;
	speechRec.start();
}

function recognizeFinished() {
	speechGen.speak(speechRec.resultString);
	listening = false;
}


function draw() {
	background(220);
	fill(random(255), random(205), random(255));
	if (listening) {
		push();
		translate(380, 180);
		scale(3);
		text("Speak!", 0, 0);
		pop();
	} else {
		push();
		translate(380, 180);
		scale(3);
		text(speechRec.resultString, 0, 0);
		pop();
	}
}