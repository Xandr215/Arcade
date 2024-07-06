//projectile.js

var projectile = new Array();
function newProjectile(type){
	projectile.push([-width,0,0,0,type,false,false,0]);
}
//0 - supply box

function runProjectiles(width, height){
	let pSpeed = width * .0025;
	if (mode){ pSpeed *= 2 }
	let dropIt;
	for (let i = 0; i < projectile.length; i++){
		switch(projectile[i][4]){
		case 0://SUPPLY BOX
			if (!projectile[i][6]){
				projectile[i][2] = projectile[i][3] = height * .05;
				projectile[i][0] -= pSpeed * 1; 
			}
			else{
				let unlock = Math.floor(Math.random()*500);
				if (unlock == 0){ projectile[i][6] = false; }
			}
			break;
		case 1://MISSLE
			projectile[i][3] = height * .025;
			projectile[i][2] = projectile[i][3] * (192/28);
			projectile[i][0] -= pSpeed * 2; 
			break;
		case 2://SUPER MISSLE
			projectile[i][3] = height * .025;
			projectile[i][2] = projectile[i][3] * (192/28);
			projectile[i][0] -= pSpeed * 3; 
			break;
		case 3://SUSHI
			projectile[i][3] = projectile[i][2] = height * .075;
			projectile[i][0] -= pSpeed * 1.25; 
			break;
		case 4://PlaneL
			projectile[i][3] = height * .045;
			projectile[i][2] = projectile[i][3] * (660/160);
			projectile[i][0] -= pSpeed * 1.25; 
			//drop bomb
			dropIt = Math.floor(Math.random()*150);
			if (dropIt == 0){ newProjectile(6);
				projectile[projectile.length-1][0] = projectile[i][0] + projectile[i][2]*.15;
				projectile[projectile.length-1][1] = projectile[i][1] + (projectile[i][3]*.85);
				projectile[projectile.length-1][5] = true;
			}
			break;
		case 5://PlaneR
			projectile[i][3] = height * .045;
			projectile[i][2] = projectile[i][3] * (660/160);
			projectile[i][0] += pSpeed * 1.25; 
			//drop bomb
			dropIt = Math.floor(Math.random()*150);
			if (dropIt == 0){ newProjectile(6);
				projectile[projectile.length-1][0] = projectile[i][0] + projectile[i][2]*.65;
				projectile[projectile.length-1][1] = projectile[i][1] + (projectile[i][3]*.85);
				projectile[projectile.length-1][5] = true;
			}
			break;
		case 6://bomb
			projectile[i][3] = height * .05;
			projectile[i][2] = projectile[i][3] * (220/340);
			projectile[i][1] += pSpeed * 1.25;
			break;
		case 7://submarine
			projectile[i][3] = height * .1;
			projectile[i][2] = projectile[i][3] * (260/410);
			
			if (!projectile[i][5]){
				projectile[i][0] = bird.x;
				projectile[i][1] = height * 1.1;
				projectile[i][5] = true;
				projectile[i][7] = 0;
			}
			if (projectile[i][7] == 0 && projectile[i][1] > height - (projectile[i][3]*.75)){
				projectile[i][1] -= pSpeed*.5;
			}
			else{//shoot 3 
				projectile[i][7]++;
				if (projectile[i][7] == 10 || projectile[i][7] == 17 || projectile[i][7] == 24){
				newProjectile(8);
					projectile[projectile.length-1][0] = projectile[i][0] + projectile[i][2]*.65;
					projectile[projectile.length-1][1] = projectile[i][1] - (projectile[i][3]*.85);
					projectile[projectile.length-1][5] = true;
				}
				else if (projectile[i][7] >= 30){
					projectile[i][1] += pSpeed*.5;
					if (projectile[i][1] >= height * 1.1){ 
						projectile[i][5] = false; 
					}
				}
			}
			break;
		case 8://bullet
			projectile[i][3] = height * .045;
			projectile[i][2] = projectile[i][3] * (50/80);
			projectile[i][1] -= pSpeed * 3;
			break;
		case 9://CUBAN MISSLE
			projectile[i][3] = height * .085;
			projectile[i][2] = projectile[i][3] * (192/28);
			projectile[i][0] -= pSpeed * .75; 
			break;
		case 10://FIRE
			projectile[i][3] = height * .05;
			projectile[i][2] = projectile[i][3] * (190/110);
			projectile[i][0] -= pSpeed * 1.5; 
			break;
		case 11://boat
			projectile[i][3] = height * .3;
			projectile[i][2] = projectile[i][3] * (700/393);
			
			if (!projectile[i][5]){
				projectile[i][0] = width * .25;
				projectile[i][1] = height - projectile[i][3];
				projectile[i][5] = true;
				projectile[i][7] = 0;
			}
			
			if (projectile[i][7] == 0){
				projectile[i][0] -= pSpeed * .35;
				if (projectile[i][0] <= 0){
					projectile[i][0] = 0;
					projectile[i][7] = 1;
				}
			}
			else if (projectile[i][7] == 1){
				projectile[i][0] += pSpeed * .35; 
				if (projectile[i][0] + projectile[i][2] >= width){
					projectile[i][0] = width-projectile[i][2];
					projectile[i][7] = 0;
				}
			}
			dropIt = Math.floor(Math.random()*100);
			if (dropIt == 0){ 
				newProjectile(12);
				projectile[projectile.length-1][0] = projectile[i][0] + projectile[i][2]*.125;
				projectile[projectile.length-1][1] = projectile[i][1] + (projectile[i][3]*.48);
				projectile[projectile.length-1][5] = true;
				
				newProjectile(13);
				projectile[projectile.length-1][0] = projectile[i][0] + projectile[i][2]*.88;
				projectile[projectile.length-1][1] = projectile[i][1] + (projectile[i][3]*.48);
				projectile[projectile.length-1][5] = true;
			}
			break;
		case 12://rocketL
			projectile[i][3] = projectile[i][2] = height * .035;
			projectile[i][1] -= pSpeed * 1;
			projectile[i][0] -= pSpeed * .65;
			break;
		case 13://rocketR
			projectile[i][3] = projectile[i][2] = height * .035;
			projectile[i][1] -= pSpeed * 1;
			projectile[i][0] += pSpeed * .65;
			break;
		case 14://SUPPLY BOX 2
			if (!projectile[i][6]){
				projectile[i][2] = projectile[i][3] = height * .05;
				projectile[i][0] -= pSpeed * 1; 
			}
			else{
				let unlock = Math.floor(Math.random()*1500);
				if (unlock == 0){ projectile[i][6] = false; }
			}
			break;
		case 15://maccau MISSLE
			projectile[i][3] = height * .05;
			projectile[i][2] = projectile[i][3] * (192/28);
			projectile[i][0] -= (pSpeed * .75); 
			break;
		default:
			//nothing
		}
		
		if (projectile[i][0] < -(projectile[i][2]*4) && projectile[i][4] != 5){ projectile[i][5] = false; }
		else if (projectile[i][0] > width * 1.5){ projectile[i][5] = false;}
		else if (projectile[i][1] > height * 1.5){ projectile.splice(i,1); i--; continue; }//mostly for bombs
		else if (projectile[i][1] < -200){ projectile.splice(i,1); i--; continue; }//mostly for bullets
		
		if (!projectile[i][5] && (lastLevel != level || wall.left > 25)){//resetting the projectile
			if (projectile[i][4] == 7 || projectile[i][4] == 11){//submarine || boat
				continue;
			}
			if (projectile[i][4] == 6 || projectile[i][4] == 12 || projectile[i][4] == 13){//bombs || rockets
				projectile.splice(i,1); i--; continue; 
			}
			projectile[i][0] = width * 1.1;
			projectile[i][1] = Math.floor(Math.random() * (height - projectile[i][3]));
			projectile[i][5] = true;
			
			if (projectile[i][4] == 5){ //planeRight
				projectile[i][0] = width * - .5;
			}
		}
		else if (!projectile[i][5] && (lastLevel == level && wall.left <= 25) && 
			(projectile[i][4] == 14 || projectile[i][4] == 0)){
			projectile[i][0] = width * 1.1;
			projectile[i][1] = Math.floor(Math.random() * (height - projectile[i][3]));
			projectile[i][5] = true;
		} 
		else if (!projectile[i][5] && (lastLevel == level && wall.left <= 25)){
			projectile.splice(i,1); i--; continue; 
		}
	}
}