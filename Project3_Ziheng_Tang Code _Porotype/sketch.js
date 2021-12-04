let inputBox;
let selectionBox;
let speechGen;
let speechRec;
let listening = 0;
let video;
let poses = [];
let speech;
let output

var myRec;



var img1, img2;
var vScale = 8;
var imgs = [];
var mic;
var mode = 0;
var timer = 0;



function setup() {
	createCanvas(640, 800);
	background(255);

	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(width / vScale, 480 / vScale);
	video.hide();
	imgs.push(img1);
	imgs.push(img2);
	mic = new p5.AudioIn();
	mic.start();
	let btnRecognize = createButton("Say Something");
	textSize(32);
	textAlign(CENTER);
	btnRecognize.position(windowWidth / 2 - width / 2 + 50, 480 + 100);
	btnRecognize.mouseClicked(recognizeSpeech);

	// Initialize the speech engine
	speechGen = new p5.Speech("Google US English");
	speechRec = new p5.SpeechRec('en-US');
	myRec = new p5.SpeechRec();
	listening = 0;
	output = select('#speech')
	// frameRate(7)
}

function recognizeSpeech() {
	if (listening != 1) {
		listening = 1;
		speechRec.onResult = recognizeFinished;
		speechRec.onEnd = restartRec;
		speechRec.start();
	}

}

function restartRec() {
	print("end");
	myRec.start();
}

function recognizeFinished() {
	speechGen.speak(speechRec.resultString);
	listening = 2;
}


function draw() {
	background(0);
	micLevel = mic.getLevel(.9);
	//声音过大或者显示模式为显示的摄像头数据
	if (micLevel >= 0.004 && mode == 0) {
		mode = int(random(1, 3));
		// console.log(mode);
		timer = millis();
	}
	//时间超过4s,进入摄像头模式
	if (millis() - timer >= 4000) {
		mode = 0;
	}
	if (mode == 0) {
		video.loadPixels();   //摄像头模式
	}
	else {
		imgs[mode - 1].loadPixels();  //图片模式
	}
	//循环显示
	for (var y = 0; y < video.height; y++) {
		for (var x = 0; x < video.width; x++) {
			var index = (video.width - x + 1 + (y * video.width)) * 4;
			if (mode == 0) {
				var r = video.pixels[index + 0];
				var g = video.pixels[index + 1];
				var b = video.pixels[index + 2];
			} else {
				var r = imgs[mode - 1].pixels[index + 0];
				var g = imgs[mode - 1].pixels[index + 1];
				var b = imgs[mode - 1].pixels[index + 2];
			}
			var bright = (r + g + b) / 3;
			var w = map(bright, 0, 255, 0, vScale);
			noStroke();
			fill(255);
			push();
			translate(x * vScale, y * vScale);
			var a = map(sin(frameCount * 0.05 - y + x), -1, 1, -90, 90);
			rotate(radians(a));
			rect(0, 0, w, w);
			pop();
		}
	}

	//语音识别
	fill(random(255), random(205), random(255));
	if (listening === 1) {
		push();
		translate(380, 650);
		scale(3);
		text("Speak!", 0, 0);
		pop();
	} else if (listening === 2) {
		push();
		translate(380, 650);
		scale(3);
		text(speechRec.resultString, 0, 0);
		pop();
	}
}
