
var game = new Phaser.Game(window.innerWidth*0.8, window.innerHeight*0.85, Phaser.CANVAS, 'game', { update: update, preload: preload, create: create, render: render });

var barSpace;
var barWidth;

var bar01;
var bar02;
var barFilled01;
var barFilled02;
var barRs;

var lines01 = [];
var lines02 = [];
var linesRs = [];

num01 = 1;
den01 = 2;

num02 = 1;
den02 = 3;

numRs = num01*den02 + num02*den02;
denRs = den01*den02;


var frac01 = num01/den01;
var frac02 = num02/den02;
var fracRs = frac01+frac02;

$('#num01').keyup(function(e) {
    num01 = $("#num01").val();
});

function preload() {
//	game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
}

function create() {
	barSpace = 0.15*game.world.width;
	barWidth = game.world.width/10;

    this.game.stage.backgroundColor = '#1189C2';

    bar01       = new Phaser.Rectangle(                           0,                              0, barWidth, game.world.height         );
    barFilled01 = new Phaser.Rectangle(                           0, game.world.height * (1-frac01), barWidth, game.world.height * frac01);
    bar02       = new Phaser.Rectangle(    barWidth + barSpace,                              0, barWidth, game.world.height         );
    barFilled02 = new Phaser.Rectangle(    barWidth + barSpace, game.world.height * (1-frac02), barWidth, game.world.height * frac02);
    barRs       = new Phaser.Rectangle(2*(barWidth + barSpace),                              0, barWidth, game.world.height         );
    // barFilledRs = new Phaser.Rectangle(2*(barWidth + barSpace), game.world.height * (1-fracRs), barWidth, game.world.height * fracRs);
    barFilledR1 = new Phaser.Rectangle(2*(barWidth + barSpace), game.world.height * (1-frac01), barWidth, game.world.height * frac01);
    barFilledR2 = new Phaser.Rectangle(2*(barWidth + barSpace), game.world.height * (1-frac02 - frac01), barWidth, game.world.height * frac02);

    for (var i = den01 - 1; i >= 0; i--) {
    	y = i*game.world.height/den01;
    	lines01[i] = new Phaser.Line(0, y, barWidth, y);
    }
    for (var i = den02 - 1; i >= 0; i--) {
    	y = i*game.world.height/den02;
    	lines02[i] = new Phaser.Line(barWidth + barSpace, y, 2*barWidth + barSpace, y);
    }


	drawAllLines = false;
	var xRs0;
    if (drawAllLines) {
    	xRs0 = 0;
    } else {
    	xRs0 = 2*(barWidth + barSpace);
    }
    for (var i = 100; i >= 0; i--) {
    	y = i*game.world.height/denRs;
    	linesRs[i] = new Phaser.Line(xRs0, y, 3*barWidth + 2*barSpace, y);
    }

    game.input.keyboard.onDownCallback = function(e) {
    	if(e.keyCode == Phaser.Keyboard.UP) {
    		denRs++;
    	} else if(e.keyCode == Phaser.Keyboard.DOWN){
    		denRs--;
    	}

    };


//    button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
}

function update() {
	if (game.input.mousePointer.isDown) {
		lines01[0].setTo(0, game.input.y, game.world.width, game.input.y);

    }

	// var mdcRs = mdc(game.input.y, game.world.height);
    for (var i = denRs; i >= 0; i--) {
    	y = i*game.world.height/denRs;
    	linesRs[i].setTo(0, y, 3*barWidth + 2*barSpace, y);
    }
}

function render () {

    game.debug.geom(bar01,'#ffffff');
    game.debug.geom(barFilled01,'#ffff0f');

    game.debug.geom(bar02,'#ffffff');
    game.debug.geom(barFilled02,'#00ffff');

    game.debug.geom(barRs,'#ffffff');
    // game.debug.geom(barFilledRs,'#00ffff');
    game.debug.geom(barFilledR1,'#ffff0f');
    game.debug.geom(barFilledR2,'#00ffff');


    for (var i = denRs - 1; i >= 0; i--) {
    	game.debug.geom(linesRs[i], '#000099');
    }

    for (var i = den01 - 1; i >= 0; i--) {
    	game.debug.geom(lines01[i], '#ff0000');
    }

    for (var i = den02 - 1; i >= 0; i--) {
    	game.debug.geom(lines02[i], '#ff0000');
    }

}



function mdc(n1, n2) {
	var gr;
	var lr;
	if(n1 > n2) {
		gr = n1;
		lr = n2;
	} else {
		gr = n2;
		lr = n1;
	}

	rest = gr%lr;
	if(rest == 0) {
		return lr;
	}	
	return mdc(rest, gr);
}


