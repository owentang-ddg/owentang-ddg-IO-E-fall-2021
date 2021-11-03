let video;
let skeleton;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  const poseNet = ml5.poseNet(video, { flipHorizontal: true });

  poseNet.on("pose", (newPoses) => {
    poses = newPoses;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  drawKeypoints(poses);
  drawSkeleton(poses);
}

function drawKeypoints(poses) {
  for (let pose of poses) {
    for (let keypoint of pose.pose.keypoints) {
      if (keypoint.score > 0.5) {
				if (keypoint.part == "leftEye" || keypoint.part == "rightEye")
				{
					fill(255, 255, 255);
        	noStroke();
        	ellipse(keypoint.position.x, keypoint.position.y, 40, 20);
					fill(0, 0, 0);
					ellipse(keypoint.position.x, keypoint.position.y, 12, 12);
				} else if (keypoint.part == "leftEar" || keypoint.part == "rightEar")
				{
					fill(255, 255, 255);
        	noStroke();
        
				} else if (keypoint.part == "nose")
				{
					fill(255, 0, 0);
        	noStroke();
        	ellipse(keypoint.position.x, keypoint.position.y, 40, 40);
					
				} else
				{
        	fill(255, 255, 255);
        	noStroke();
        	ellipse(keypoint.position.x, keypoint.position.y, 20, 20);
                    
      	}
			}
    }
  }
}

function drawSkeleton(poses) {
  for (let pose of poses) {
    for (let skeleton of pose.skeleton) {
      let p1 = skeleton[0];
			let p2 = skeleton[1];
			strokeWeight(10);
      stroke(135, 206, 235);
      line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
        
        
    }
  }
}