//images.js
var allImages = 0;
function createImage(src){
	var img = document.createElement("IMG");
	img.src = src;
	allImages++;
	return img;
}


var birdImg = new Array();
birdImg.push(createImage("./img/bird/b0.png"));
	birdImg.push(createImage("./img/bird/b1.png"));
	birdImg.push(createImage("./img/bird/b2.png"));
	birdImg.push(createImage("./img/bird/b3.png"));

	birdImg.push(createImage("./img/bird/b4.png"));
	birdImg.push(createImage("./img/bird/b5.png"));
	birdImg.push(createImage("./img/bird/b6.png"));
	birdImg.push(createImage("./img/bird/b7.png"));

	birdImg.push(createImage("./img/bird/b8.png"));
	birdImg.push(createImage("./img/bird/b9.png"));
	birdImg.push(createImage("./img/bird/b10.png"));
	birdImg.push(createImage("./img/bird/b11.png"));

	birdImg.push(createImage("./img/projectile/eSmall.png"));
	birdImg.push(createImage("./img/projectile/eBig.png"));
function resizeImages(width, height){
	/*createBirdImage("./img/bird/b0.png",0);
	createBirdImage("./img/bird/b1.png",1);
	createBirdImage("./img/bird/b2.png",2);
	createBirdImage("./img/bird/b3.png",3);
	createBirdImage("./img/bird/b4.png",4);
	createBirdImage("./img/bird/b5.png",5);
	createBirdImage("./img/bird/b6.png",6);
	createBirdImage("./img/bird/b7.png",7);
	createBirdImage("./img/bird/b8.png",8);
	createBirdImage("./img/bird/b9.png",9);
	createBirdImage("./img/bird/b10.png",10);
	createBirdImage("./img/bird/b11.png",11);
	createBirdImage("./img/projectile/eSmall.png",12);
	createBirdImage("./img/projectile/eBig.png",13);*/
	return true;
}

function createBirdImage(src, order){
	var img = document.createElement("IMG");
	img.src = src;
	allImages++;
	birdImg.push(null);
	img.onload = function(){
		var can = document.createElement("CANVAS");
		can.width = (height * .15) * (210/260);
		can.height = height * .15;
		can.getContext('2d').drawImage(img,0,0, (height * .15) * (210/260), height * .15);
		birdImg[order] = can;
	};
}



var projectileImg = new Array();
projectileImg.push(createImage("./img/projectile/upgrade.png"));
projectileImg.push(createImage("./img/projectile/Missle.png"));
projectileImg.push(createImage("./img/projectile/SuperMissle.png"));
projectileImg.push(createImage("./img/projectile/Sushi.png"));
projectileImg.push(createImage("./img/projectile/planeL.png"));
projectileImg.push(createImage("./img/projectile/planeR.png"));
projectileImg.push(createImage("./img/projectile/bomb.png"));
projectileImg.push(createImage("./img/projectile/submarine.png"));
projectileImg.push(createImage("./img/projectile/bullet.png"));
projectileImg.push(createImage("./img/projectile/cuban.png"));
projectileImg.push(createImage("./img/projectile/fire.png"));
projectileImg.push(createImage("./img/projectile/boat.png"));
projectileImg.push(createImage("./img/projectile/rocketL.png"));
projectileImg.push(createImage("./img/projectile/rocketR.png"));
projectileImg.push(createImage("./img/projectile/upgrade2.png"));
projectileImg.push(createImage("./img/projectile/oumen.png"));

var slapThomImg = createImage("./img/other/slapThom.png");

var fireBallImg = createImage("./img/projectile/fire2.png");

var eBirdImg = new Array();
eBirdImg.push(createImage("./img/eBird/eBup.png"));
eBirdImg.push(createImage("./img/eBird/eBdown.png"));
eBirdImg.push(birdImg[12]);
eBirdImg.push(birdImg[13]);


var titleImg = new Array();
titleImg.push(createImage("./img/titleE.png"));
titleImg.push(createImage("./img/titleKh.png"));
var startImg = createImage("./img/start.png");

var wallImg = createImage("./img/other/gate.png");

var modeImg = new Array();
modeImg.push(createImage("./img/easy.png"));
modeImg.push(createImage("./img/hard.png"));

var arrowImg = new Array();
arrowImg.push(createImage("./img/other/0.png"));
arrowImg.push(createImage("./img/other/1.png"));
arrowImg.push(createImage("./img/other/2.png"));
arrowImg.push(createImage("./img/other/3.png"));
arrowImg.push(null);
arrowImg.push(createImage("./img/other/5.png"));
arrowImg.push(createImage("./img/other/6.png"));
arrowImg.push(createImage("./img/other/7.png"));
arrowImg.push(createImage("./img/other/8.png"));
