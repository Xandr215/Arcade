//bird.js
var bird = {img:0,x:0,y:0,w:210,h:260,speed:1,armor:0,flap:0,dead:false,deadTimer:0,special:false,fire:false,pause:false,
				hx:0,hy:0,hw:0,hh:0};
var leftDown = false;
var rightDown = false;
var upDown = false;
var downDown = false;
var facing = true; // right facing

var fireBall = {x:0,y:0,w:0,h:0, go:false};

function moveBird(width, height){
	if (bird.dead){
		bird.deadTimer++;
		if (bird.deadTimer <= 15){
			bird.img = 12;
		}
		else if (bird.deadTimer <= 45){
			bird.img = 13;
		}
		else{
			resetAll();
		}
		return;
	} 
	
	bird.flap++;
	if (bird.flap >= 50){
		bird.flap = 0;
	}
	if (bird.flap <= 25){
		bird.img = 0;
	}
	else { bird.img = 1; }
	
	if (!facing){
		bird.img += 2;
	}
	bird.img += bird.armor*4;
	
	if (bird.pause){ return; }
	if (bird.special && !fireBall.go){
		if (bird.fire){
			bird.special = false;
			bird.fire = false;
			fireBall.go = true;
			fireBall.x = bird.x + bird.w;
			fireBall.y = bird.y + (bird.h * .275);
			
			fireBall.h = height * .05;
			fireBall.w = fireBall.h * (190/110);
		}
	}
	if (fireBall.go){
		if (fireBall.x > width){
			fireBall.go = false;
			bird.fire = false;
		}
		else{
			fireBall.x += bird.speed * 1.25;
		}
	}
	
	if (!tmpPause) {
		if (leftDown){
			bird.x -= bird.speed;
			if (bird.x < 0){ bird.x = 0; }
		}
		if (rightDown){
			bird.x += bird.speed;
			if (wall.x < width){
				if (bird.x + bird.w > wall.x){ bird.x = wall.x - bird.w; }
			}
			if (lastLevel == level) { if (bird.x + bird.w > width){ bird.x = width - bird.w; } }
			if (bird.x > width){ nextLevel(); }
		}
		if (upDown){
			bird.y -= bird.speed;
			if (bird.y < 0){ bird.y = 0; }
		}
		if (downDown){
			bird.y += bird.speed;
			if (bird.y + bird.h > height){ bird.y = height-bird.h; }
		}
	}

	//setting up a smaller hitbox on easy mode
	if (!mode){
		bird.hw = bird.w * 1;
		bird.hh = bird.h * .5;
		bird.hx = (bird.x + (bird.w/2)) - (bird.hw/2);
		bird.hy = (bird.y + (bird.h/2)) - (bird.hh/2);
	}
	else{
		bird.hx = bird.x;
		bird.hy = bird.y;
		bird.hw = bird.w;
		bird.hh = bird.h;
	}

	//colliding
	for (let i = 0; i < projectile.length; i++){
		if (bird.hx + bird.hw >= projectile[i][0] && projectile[i][0] + projectile[i][2] >= bird.hx &&
			bird.hy + bird.hh >= projectile[i][1] && projectile[i][1] + projectile[i][3] >= bird.hy){
			if (projectile[i][4] == 0){//supply box
				bird.armor++;
				if (bird.armor > 2){ bird.armor = 2; }
				projectile[i][6] = true; /*GO lock for box*/
			}
			else if (projectile[i][4] == 14){//supply box2
				bird.special = true;
				projectile[i][6] = true; /*GO lock for box*/
			}
			else if (projectile[i][4] == 9){//cuban missle
				bird.armor = -1;
			}
			else if (projectile[i][4] == 11){//boat
				continue;
			}
			else{
				bird.armor--;
			}
			if (bird.armor == -1){//end game
				bird.armor = 0;
				bird.dead = true;
			}
			projectile[i][5] = false;
		}
	}
}

var wall = { timer:0, x:0, y:0, w:0, h:0, start:0, left:0 }

function runWall(){
	let end = wall.start + (wall.timer * 1000);
	wall.left = Math.floor(((end - Date.now()) / 1000));
	if (wall.left <= 0 || (level == lastLevel && wall.left <= 25)){
		wall.left = 0;
		if (wall.x < width * 1.1){
			wall.x++;
		}
	}
}

var slapThomRect = {x:0,y:0,w:0,h:0,set:false};
function runSlapThom(width, height){
	slapThomRect.h = height * .2;
	slapThomRect.w = slapThomRect.h * (216/108);
	if (!slapThomRect.set){
		slapThomRect.y = height * .25;
		slapThomRect.x = width - (slapThomRect.w);
		slapThomRect.set = true;
	}
	slapThomRect.x += (width * .0025);
}

function endSlapThom(width, height){
	slapThomRect.h = height * .2;
	slapThomRect.w = slapThomRect.h * (216/108);
	if (!slapThomRect.set){
		slapThomRect.y = height * .25;
		slapThomRect.x = width + (slapThomRect.w * .5);
		slapThomRect.set = true;
	}
	if (endTimer < 300){
		slapThomRect.x -= (width * .00125);
	}
	else{
		slapThomRect.x += (width * .00125);
		bird.x += (width * .00125);
		if (bird.y > slapThomRect.y){ bird.y -= (width * .00125); }
		if (bird.x > width * 1.25){
			resetAll();
		}
	}
}


var eBird = {img:0, x:0, y:0, w:0, h:0, set:false, flap:0, dead:false, deadTimer:0, modeX:true, modeY:true, pause:false};
function runEBird(width, height){
	eBird.w = bird.w;
	eBird.h = bird.h;
	if (!eBird.set){
		eBird.x = width * 1.1;
		eBird.y = height * .5;
		eBird.set = true;
		eBird.dead = false;
		eBird.pause = false;
		newProjectile(14);
		projectile[projectile.length-1][6] = true;
	}
	if (eBird.dead){
		eBird.deadTimer++;
		if (eBird.deadTimer <= 15){
			eBird.img = 2;
		}
		else if (eBird.deadTimer <= 45){
			eBird.img = 3;
		}
		else{
			eBird.x = width * 3;
		}
		return;
	}
	
	eBird.flap++;
	if (eBird.flap >= 50){
		eBird.flap = 0;
	}
	if (eBird.flap <= 25){
		eBird.img = 0;
	}
	else { eBird.img = 1; }
	
	if (eBird.pause){ return; }
	let eBirdSpeed = bird.speed * .5;
	if (eBird.modeX){
		eBird.x -= eBirdSpeed;
		if (eBird.x <= width*.4){
			eBird.modeX = false;
		}
	}
	else{
		eBird.x += eBirdSpeed;
		if (eBird.x + eBird.w > width){
			eBird.x = width - eBird.w;
			eBird.modeX = true;
		}
	}
	if (eBird.modeY){
		eBird.y -= eBirdSpeed;
		if (eBird.y <= 0){
			eBird.y = 0;
			eBird.modeY = false;
		}
	}
	else{
		eBird.y += eBirdSpeed;
		if (eBird.y + eBird.h > height){
			eBird.y = height - eBird.h;
			eBird.modeY = true;
		}
	}
	
	//fireball
	let flamer = Math.floor(Math.random() * 40);
	if (flamer == 0){
		newProjectile(10);
		projectile[projectile.length-1][0] = eBird.x - ((height * .05) * (190/110));
		projectile[projectile.length-1][1] = eBird.y + (eBird.h * .275);
		projectile[projectile.length-1][5] = true;
	}
	
	//hitting the eBird
	if (bird.x + bird.w > eBird.x && eBird.x + eBird.w > bird.x &&
		bird.y + bird.h > eBird.y && eBird.y + eBird.h > bird.y){
		bird.dead = true;
		eBird.pause = true;
	}
	if (fireBall.x + fireBall.w > eBird.x && eBird.x + eBird.w > fireBall.x &&
		fireBall.y + fireBall.h > eBird.y && eBird.y + eBird.h > fireBall.y){
		eBird.dead = true;
		bird.pause = true;
		fireBall.go = false;
		bird.fire = false;
		projectile = new Array();
		endGame = true;
		slapThomRect.set = false;
	}
}