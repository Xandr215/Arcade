/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		start();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

document.addEventListener('contextmenu', event => event.preventDefault());

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;//-20;
  canvas.height = window.innerHeight;//-20;
var scale = 5;


createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
	
	if (resizeImages(width, height)){
		start();
	}
}

createHiDPICanvas(canvas.width, canvas.height, 5);
var width = canvas.width/scale;
var height = canvas.height/scale;


var level = 0;
var intervalLoop;
var loopRate = 16;
function start(){
	intervalLoop = window.setInterval(run, loopRate);
	resetAll();
}

function resetAll(){
	level = 0;
	bird.dead = false;
	bird.deadTimer = 0;
	bird.armor = 0;
	endGame = false;
	endTimer = 0;
	eBird = {img:0, x:0, y:0, w:0, h:0, set:false, flap:0, dead:false, deadTimer:0, modeX:true, modeY:true, pause:false};
	fireBall = {x:0,y:0,w:0,h:0, go:false};
	bird.pause = false;
	bird.special = false;
	levelColor = "#696969";
}


var startRect = {x:0,y:0,w:0,h:0};
var easyRect = {x:0,y:0,w:0,h:0};
var hardRect = {x:0,y:0,w:0,h:0};
var mode = false; // = too easy
var mobile = false;
var mobileRect = new Array();
for (let i = 0; i < 9; i++){ mobileRect.push({x:0,y:0,w:0,h:0}); }

var lastSecond = 0;
var frameRate = 0;
var lastFrameRate = 0;

var addFrame = 0;
var secondFrameRate = 0;
var countTen = 0;

function run(){
	//ctx.clearRect(0,0,width,height);
	
	ctx.fillStyle = levelColor;
	ctx.fillRect(0,0,width,height);
	if (lastLevel == level){
		if (wall.left == 29){
			ctx.fillStyle = "#696969";
			ctx.fillRect(0,0,width,height);
		}
		else if (wall.left == 27){
			ctx.fillStyle = "#696969";
			ctx.fillRect(0,0,width,height);
		}
		else if (wall.left <= 25){
			ctx.fillStyle = "#696969";
			ctx.fillRect(0,0,width,height);
		}
	}
	
	//calculating frame rate
	if (lastSecond == 0){
		lastSecond = Date.now();
	}
	else if (Date.now() > lastSecond + 1000){
		countTen++;
		if (countTen == 10){countTen = 0; secondFrameRate = addFrame; addFrame = 0; }
		addFrame += frameRate;
		
		lastFrameRate = frameRate;
		frameRate = lastSecond = 0;
		
		if (lastFrameRate < 50){
			clearInterval(intervalLoop);
			--loopRate;
			if (loopRate <= 1){ loopRate = 16; }
			intervalLoop = window.setInterval(run, loopRate);
		}
		else if (lastFrameRate >= 70){
			clearInterval(intervalLoop);
			++loopRate;
			intervalLoop = window.setInterval(run, loopRate);
		}
	}		
	frameRate++;
	ctx.fillStyle = "#000000";
	//ctx.fillText(loopRate + ", " + secondFrameRate, 100, 100);
	//ctx.drawImage(birdImg[0],0,0);
	//delete above to comment
	
	/*ctx.fillStyle="#000000";
	ctx.strokeStyle="blue";
	ctx.strokeRect(0,0,width,height);*/
	
	ctx.lineWidth = 5;
	
	bird.h = height * .15;
	bird.w = bird.h * (210/260);
	
	
	if (level == 0){//title
		let titleRectHeight = height * .5; 
		let titleRectWidth = titleRectHeight * (1216 / 791);
		ctx.drawImage(titleImg[0], (width/2) - (titleRectWidth/2), 0, titleRectWidth, titleRectHeight);
		
		//start rect
		startRect.w = width * .25;
		startRect.h = height * .25;
		startRect.x = (width/2) - (startRect.w/2);
		startRect.y = (height*.5);
		ctx.fillStyle="#000000";
		ctx.fillRect(startRect.x,startRect.y,startRect.w,startRect.h);
		ctx.drawImage(startImg,startRect.x,startRect.y - ((startRect.h * (105/310))/2) + (startRect.h/2),
		startRect.w,startRect.h * (105/310));
		ctx.strokeStyle="#FFFFFF";
		ctx.strokeRect(startRect.x,startRect.y,startRect.w,startRect.h);
		
		//easy rect
		easyRect.w = startRect.w * .75;
		easyRect.h = height * .1;
		easyRect.x = (width*.75);
		easyRect.y = (height * .55);
		ctx.fillStyle = "#000000";
		ctx.fillRect(easyRect.x,easyRect.y,easyRect.w,easyRect.h);
		ctx.drawImage(modeImg[0], easyRect.x,easyRect.y,easyRect.w,easyRect.h);
		
		hardRect.w = startRect.w * .75;
		hardRect.h = height * .1;
		hardRect.x = (width*.75);
		hardRect.y = (height * .65);
		ctx.fillStyle = "#000000";
		ctx.fillRect(hardRect.x,hardRect.y,hardRect.w,hardRect.h);
		ctx.drawImage(modeImg[1], hardRect.x,hardRect.y,hardRect.w,hardRect.h);
		if (!mode){
			ctx.strokeStyle="#FFFFFF";
			ctx.strokeRect(easyRect.x,easyRect.y,easyRect.w,easyRect.h);
		}
		else{
			ctx.strokeStyle="#FFFFFF";
			ctx.strokeRect(hardRect.x,hardRect.y,hardRect.w,hardRect.h);
		}
		
		return;
	}
	//begining text
	if (!message.done){
		message.timer++;
		if (message.timer >= 5){
			message.timer = 0;
			message.index++;
			if (message.index > message.sa.length){
				message.index = message.sa.length;
				message.fTimer++;
				if (message.fTimer == 30){
					message.done = true;
				}
			}
		}
		let fs = Math.floor(height * .05);
		ctx.textAlign = "left";
		ctx.font = fs.toString() + "px Arial";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText(message.sa.substr(0,message.index), width * .1, height * .3);
	
		if (level == 1){
			runSlapThom(width, height);
			ctx.drawImage(slapThomImg, slapThomRect.x, slapThomRect.y, slapThomRect.w, slapThomRect.h);
		}
	}
	//projectiles:
	if (!tmpPause) { runProjectiles(width,height); }
	else if (tmpPause && level == 2){//this is for the boat
		projectile[3][3] = height * .3;
		projectile[3][2] = projectile[3][3] * (700/393);
		projectile[3][0] = width * .25;
		projectile[3][1] = height - projectile[3][3];
		ctx.drawImage(projectileImg[11],projectile[3][0],projectile[3][1],projectile[3][2],projectile[3][3]);
	}
	for (let i = 0; i < projectile.length; i++){//if (projectile[i][4] == 11){continue;}
		ctx.drawImage(projectileImg[projectile[i][4]],projectile[i][0],projectile[i][1],projectile[i][2],projectile[i][3]);
	}
	
	//last known good
	//drawing the bird
	bird.speed = width * .0050;//bird.h * .1; alert(bird.speed/width);
	
	if (dontMove){
		leftDown = false;
		rightDown = false;
		upDown = false;
		downDown = false;
	}
	
	moveBird(width, height);
	ctx.drawImage(birdImg[bird.img],bird.x,bird.y,bird.w,bird.h);
	
	
	if (lastLevel == level && wall.left <= 25){
		runEBird(width, height);
		ctx.drawImage(eBirdImg[eBird.img],eBird.x,eBird.y,eBird.w,eBird.h);
	}
	
	if (fireBall.go){
		ctx.drawImage(fireBallImg,fireBall.x,fireBall.y,fireBall.w,fireBall.h);
	}
	
	//wall
	if (!tmpPause) { runWall(); }
	if (wall.x < width){
		let wallHeight = (90 / wall.w) * wall.h;
		ctx.drawImage(wallImg, 0,0,90,wallHeight, wall.x,wall.y, wall.w, wall.h);
		//ctx.drawImage(wallImg, wall.x,wall.y, wall.w, wall.h);
		//ctx.fillStyle = "#482c01";
		//ctx.fillRect(wall.x,wall.y, wall.w, wall.h);
	}
	ctx.textAlign = "center";
	ctx.fillStyle="white";
	if (level > 2){ ctx.fillStyle="black"; }
	if (lastLevel != level || (lastLevel == level && wall.left > 25)){
		let txt = wall.left.toString();
		if (wall.left == 0){ txt = "GO!"; }
		ctx.fillText(txt, (width/2), height * .1);
	}
	
	if (bird.special && !fireBall.go){
		ctx.fillText("FIRE",width * .1, height * .3);
	}
	
	//end animation
	if (endGame){
		endTimer++;
		endSlapThom(width, height);
		ctx.drawImage(slapThomImg, slapThomRect.x, slapThomRect.y, slapThomRect.w, slapThomRect.h);
		return;
	}
	
	if (mobile){
		ctx.globalAlpha = .25;
		let high = calculateMobileHighlights();
		for (let i = 0; i < mobileRect.length; i++){
			mobileRect[i].h = height * .2;
			mobileRect[i].w = mobileRect[i].h * 1.4;
			mobileRect[i].x = (width - (mobileRect[i].w*3)) + (mobileRect[i].w * Math.floor(i/3));
			mobileRect[i].y = (height - (mobileRect[i].h*3)) + mobileRect[i].h * (i%3);
			
			if (i != 4){
				if (high[i]){ ctx.globalAlpha = 1;}
				ctx.drawImage(arrowImg[i], mobileRect[i].x, mobileRect[i].y, mobileRect[i].h, mobileRect[i].h);
				if (high[i]){ ctx.globalAlpha = .25; }
			}
			else if (i == 4 && high[i]){
				ctx.globalAlpha = 1;
				let mathRect = [0,0,190,110];
				mathRect[2] = mobileRect[i].w * .9;
				mathRect[3] = mathRect[2] * (110/190);
				mathRect[0] = (mobileRect[i].x + mobileRect[i].w * .05);
				mathRect[1] = (mobileRect[i].y + (mobileRect[i].h/2)) - (mathRect[3]/2);
				ctx.drawImage(fireBallImg,mathRect[0],mathRect[1],mathRect[2],mathRect[3]);
				ctx.globalAlpha = .25;
			}
		}
		ctx.globalAlpha = 1;
	}
}

function calculateMobileHighlights(){
	let highLights = new Array();
	if (leftDown && upDown){ highLights.push(true); } else { highLights.push(false); }
	if (leftDown && !downDown && !upDown){ highLights.push(true); } else { highLights.push(false); }
	if (leftDown && downDown){ highLights.push(true); } else { highLights.push(false); }
	
	if (upDown && !leftDown && !rightDown){ highLights.push(true); } else { highLights.push(false); }
	if (bird.special){ highLights.push(true); } else { highLights.push(false); }
	if (downDown && !leftDown && !rightDown){ highLights.push(true); } else { highLights.push(false); }
	
	if (rightDown && upDown){ highLights.push(true); } else { highLights.push(false); }
	if (rightDown && !downDown && !upDown){ highLights.push(true); } else { highLights.push(false); }
	if (rightDown && downDown){ highLights.push(true); } else { highLights.push(false); }
	return highLights;
}

var levelColor = "#696969";
var tmpPause = true;
var message = {sa:"", showingNow:"", index:0, timer:0, done:false};

const lastLevel = 5;

var endGame = false;
var endTimer = 0;

function nextLevel(){
	level+=1;
	projectile = new Array();
	bird.x = 0;
	bird.y = (height / 2) - (bird.h/2)
		newProjectile(0);
	if (level == 1){
		levelColor = "#696969";
		newProjectile(1);
		newProjectile(2);
		newProjectile(3);
		message = {sa:"Return to me my son...", showingNow:"", index:0, timer:0, done:false, fTimer:0};
	}
	else if (level == 2){
		levelColor = "#1000c4";
		newProjectile(1);
		newProjectile(2);
		newProjectile(11);
		if (mode) { newProjectile(15); }
		message = {sa:"Those darn Macanese are it again...", showingNow:"", index:0, timer:0, done:false, fTimer:0};
	}
	else if (level == 3){
		levelColor = "#669999";
		newProjectile(1);
		newProjectile(2);
		newProjectile(4);
		newProjectile(5);
		message = {sa:"Sometimes you need to find\na happy medium", showingNow:"", index:0, timer:0, done:false, fTimer:0};
	}
	else if (level == 4){
		levelColor = "#aadee9";
		newProjectile(2);
		newProjectile(7);
		newProjectile(9);
		message = {sa:"I am with you always...", showingNow:"", index:0, timer:0, done:false, fTimer:0};
	}
	else if (level == 5){
		levelColor = "#eafefc";
		newProjectile(1);
		newProjectile(2);
		newProjectile(4);
		newProjectile(5);
		newProjectile(7);
	}
	wall.w = width * .05;
	wall.h = height;
	wall.x = width - wall.w;
	wall.timer = 50;//change this one for real timer
	wall.left = 50;
	tmpPause = true;
	
	leftDown = false;
	rightDown = false;
	upDown = false;
	downDown = false;
	slapThomRect.set = false;
	eBird.set = false;
	
	bird.pause = true;
}


window.addEventListener("keydown",keyDown);
window.addEventListener("keyup",keyUp);
window.addEventListener("click",click);

function keyDown(e){
	//alert(e.keyCode);
	if (tmpPause){ 
		tmpPause = false; 
		wall.start = Date.now();
		return;
	}
	
	if (e.keyCode == 37 || e.keyCode == 65){//left
		leftDown = true;
		facing = false;
	}
	else if (e.keyCode == 38 || e.keyCode == 87){//up
		upDown = true;
	}
	else if (e.keyCode == 39 || e.keyCode == 68){//right
		rightDown = true;
		facing = true;
	}
	else if (e.keyCode == 40 || e.keyCode == 83){//down
		downDown = true;
	}
	else if (bird.special && e.keyCode == 32){//shoot ball
		bird.fire = true;
	}
	if (bird.pause && !endGame){ 
		bird.pause = false; 
		rightDown = false;
		leftDown = false;
		upDown = false;
		downDown = false;
	}
}

function keyUp(e){
	if (e.keyCode == 37 || e.keyCode == 65){//left
		leftDown = false;
	}
	else if (e.keyCode == 38 || e.keyCode == 87){//up
		upDown = false;
	}
	else if (e.keyCode == 39 || e.keyCode == 68){//right
		rightDown = false;
	}
	else if (e.keyCode == 40 || e.keyCode == 83){//down
		downDown = false;
	}
}

function click(e){
	let rect = canvas.getBoundingClientRect();
	let cX = event.clientX - rect.left;
	let cY = event.clientY - rect.top;
	processClick(cX, cY, true);
}

window.addEventListener('touchstart', event => {
	mobile = true;
	let touches = event.touches;
	for (let i = 0; i < touches.length; i++){
		let rect = canvas.getBoundingClientRect();
		let cX = touches[i].clientX - rect.left;
		let cY = touches[i].clientY - rect.top;
		if (processClick(cX, cY, true)){
			mobileTouches.push({t:touches[i].identifier, x:cX, y:cY});
			dontMove = false;
		}
	}
});

function processClick(cX, cY, origin){
	if (level == 0){
		if (cX > startRect.x && cX < startRect.x + startRect.w &&
			cY > startRect.y && cY < startRect.y + startRect.h){
			if (level == 0){ nextLevel(); return }
		}
		else if (cX > easyRect.x && cX < easyRect.x + easyRect.w &&
			cY > easyRect.y && cY < easyRect.y + easyRect.h){
			mode = false;
		}
		else if (cX > hardRect.x && cX < hardRect.x + hardRect.w &&
			cY > hardRect.y && cY < hardRect.y + hardRect.h){
			mode = true;
		}
	}
	
	if (mobile){//mobile controls	
		for (let i = 0; i < mobileRect.length; i++){
			if (cX > mobileRect[i].x && cX < mobileRect[i].x + mobileRect[i].w &&
				cY > mobileRect[i].y && cY < mobileRect[i].y + mobileRect[i].h){
				clickDown(i, origin);
				return true;
			}
		}
	}
}

function clickDown(i, origin){
	if (tmpPause){ 
		tmpPause = false; 
		wall.start = Date.now();
		return;
	}
	
	if (i <= 2){//left
		leftDown = true;
		facing = false;
	}
	if (i == 0 || i == 3 || i == 6){//up
		upDown = true;
	}
	if (i >= 6){//right
		rightDown = true;
		facing = true;
	}
	if (i == 2 || i == 5 || i == 8){//down
		downDown = true;
	}
	if (bird.special && origin && i == 4){//shoot ball
		bird.fire = true;
	}
	if (bird.pause && !endGame){ 
		bird.pause = false; 
		rightDown = false;
		leftDown = false;
		upDown = false;
		downDown = false;
	}
}

var mobileTouches = new Array();

window.addEventListener('touchmove', event => {
	let touches = event.touches;
	for (let i = 0; i < touches.length; i++){
		let rect = canvas.getBoundingClientRect();
		let cX = touches[i].clientX - rect.left;
		let cY = touches[i].clientY - rect.top;
		for (let j = 0; j < mobileTouches.length; j++){
			if (touches[i].identifier == mobileTouches[j].t){
				mobileTouches[j].x = cX;
				mobileTouches[j].y = cY;
				rightDown = false;
				leftDown = false;
				upDown = false;
				downDown = false;
				processClick(cX, cY, false);
			}
		}
	}
});

var dontMove = false;
window.addEventListener('touchend', event => {
	//event.preventDefault();
	//so if the touches length is 0 cancel it all
	//otherwise we can still detect where the current touches are and keep calling them
	
	
	let touches = event.touches;
	if (touches.length == 0){
		leftDown = false;
		rightDown = false;
		upDown = false;
		downDown = false;
		mobileTouches = new Array();
		dontMove = true;
	}
});
window.addEventListener('touchcancel', event => {
	//event.preventDefault();
	let touches = event.touches;
	if (touches.length == 0){
		leftDown = false;
		rightDown = false;
		upDown = false;
		downDown = false;
		mobileTouches = new Array();
		dontMove = true;
	}
});