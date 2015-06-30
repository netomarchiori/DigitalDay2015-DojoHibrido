window.onload = function() {

    // Initialize Phaser, and creates a 320x480px game
    var game = new Phaser.Game(320, 480, Phaser.CANVAS);
    // Bird Object
    var bird;
    // bird gravity, will make bird fall if you don't flap
    var birdGravity = 800;
    // horizontal bird speed
    var birdSpeed = 125;
    // flap thrust
    var birdFlapPower = 300;
    // milliseconds between the creation of two pipes
    var pipeInterval = 2000;
    // hole between pipes, in puxels
    var pipeHole = 120;
    var pipeGroup;
    var score=0;
    var scoreText;
    var topScore;

    // Creates a new 'play' state that will contain the game
    var play = function(game){};
    play.prototype = {

        // Function called first to load all the assets
        preload:function(){
            // Change the background color of the game
            game.stage.backgroundColor = "#87CEEB";

            // Load the bird sprite
            game.load.image("bird", "bird.png");

            // Load the pipe sprite
            game.load.image("pipe", "pipe.png");
        },

        // Fuction called after 'preload' to setup the game
        create:function(){

            // Set the physics system
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Display the bird on the screen
            bird = game.add.sprite(80,240,"bird");
            bird.anchor.set(0.5);

            // Enable Physics for the Bird
            game.physics.arcade.enable(bird);
            // Add gravity to the bird to make it fall
            bird.body.gravity.y = birdGravity;

            // Call the 'jump' function when tap on screen
            game.input.onDown.add(flap, this);

            //Create the pipes
            pipeGroup = game.add.group();
            addPipe();

            // Timer that calls 'addPipe' ever pipeInterval seconds
            game.time.events.loop(pipeInterval, addPipe);

            // Init the score and load the topScore
            score = 0;
            topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");

            // Add a score label on the top left of the screen
            scoreText = game.add.text(10,10,"-",{
                font:"bold 16px Arial"
            });

            //Update the scoreText
            updateScore();


            //By default if the browser tab loses focus the game will pause. You can stop that behaviour by setting this property to true.
            game.stage.disableVisibilityChange = true;
        },

        // This function is called 60 times per second
        update:function(){
            // If the bird overlap any pipes, call 'die'
            game.physics.arcade.collide(bird, pipeGroup, die);

            // If the bird is out of the world (too high or too low), call the 'die' function
            if(bird.y>game.height){
                die();
            }
        }
    }

    game.state.add("Play",play);
    game.state.start("Play");

    //Update the scoreText
    function updateScore(){
        scoreText.text = "Score: "+score+"\nBest: "+topScore;
    }

    // Make the bird jump
    function flap(){
        bird.body.velocity.y = -birdFlapPower;
    }

    //Add the upper and lower pipes while leaving a hole for the bird
    function addPipe(){
        //Get the hole position
        var pipeHolePosition = game.rnd.between(50,430-pipeHole);

        //Create new Pipe object for the upper pipe
        var upperPipe = new Pipe(game,320,pipeHolePosition-480,-birdSpeed);
        //Add the pipe to the game and the pipeGroup
        game.add.existing(upperPipe);
        pipeGroup.add(upperPipe);

        //Create new Pipe object for the lower pipe
        var lowerPipe = new Pipe(game,320,pipeHolePosition+pipeHole,-birdSpeed);
        //Add the pipe to the game and the pipeGroup
        game.add.existing(lowerPipe);
        pipeGroup.add(lowerPipe);
    }

    //Save highscore and restart the game
    function die(){
        localStorage.setItem("topFlappyScore",Math.max(score,topScore));
        game.state.start("Play");
    }

    //Define the Pipe Object
    Pipe = function (game, x, y, speed) {
        //Load the Pipe sprite
        Phaser.Sprite.call(this, game, x, y, "pipe");
        //Enable Physics
        game.physics.enable(this, Phaser.Physics.ARCADE);
        //Give it a velocity
        this.body.velocity.x = speed;

        //Create flag to control the score
        this.giveScore = true;
    };

    Pipe.prototype = Object.create(Phaser.Sprite.prototype);
    Pipe.prototype.constructor = Pipe;

    //Updates the score a pipe life cycle
    Pipe.prototype.update = function() {
        //Update score if bird has passed the pipe
        if(this.x+this.width<bird.x && this.giveScore){
            score+=0.5;
            updateScore();
            this.giveScore = false;
        }
        //Destroy the pipe if it has gone off screen
        if(this.x<-this.width){
            this.destroy();
        }
    };
}