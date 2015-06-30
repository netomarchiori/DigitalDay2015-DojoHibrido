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
    var scoreText; //Holds Reference to the onScreen text element
    var topScore;

    // Creates a new 'play' state that will contain the game
    var play = function(game){}
    play.prototype = {

        // Function called first to load all the assets
        preload:function(){
            // Change the background color of the game to #87CEEB

            // Load the bird sprite

            // Load the pipe sprite
        },

        // Fuction called after 'preload' to setup the game
        create:function(){

            // Set the physics system

            // Display the bird on the screen

            // Enable Physics for the Bird

            // Add gravity to the bird to make it fall


            // Call the 'jump' function when tap on screen


            //Create the pipes
            pipeGroup = game.add.group();
            addPipe();

            // Timer that calls 'addPipe' ever pipeInterval seconds

            // Init the score and load the topScore

            // Add a score label on the top left of the screen

            //Update the scoreText
            updateScore();


            //By default if the browser tab loses focus the game will pause. You can stop that behaviour by setting this property to true.
            game.stage.disableVisibilityChange = true;
        },

        // This function is called 60 times per second
        update:function(){
            // If the bird overlap any pipes, call 'die'

            // If the bird is out of the world (too high or too low), call the 'die' function
        }
    }

    //Define the Game State and start it
    game.state.add("Play",play);
    game.state.start("Play");

    //Update the scoreText
    function updateScore(){
    }

    // Make the bird jump
    function flap(){
    }

    //Add the upper and lower pipes while leaving a hole for the bird
    function addPipe(){
        //Get the hole position

        //Create new Pipe object for the upper pipe

        //Add the pipe to the game and the pipeGroup


        //Create new Pipe object for the lower pipe

        //Add the pipe to the game and the pipeGroup

    }

    //Save highscore and restart the game
    function die(){

    }

    //Define the Pipe Object
    Pipe = function (game, x, y, speed) {
        //Load the Pipe sprite

        //Enable Physics

        //Give it a velocity


        //Create flag to control the score
        this.giveScore = true;
    };

    Pipe.prototype = Object.create(Phaser.Sprite.prototype);
    Pipe.prototype.constructor = Pipe;

    //Updates the score a pipe life cycle
    Pipe.prototype.update = function() {
        //Update score if bird has passed the pipe


        //Destroy the pipe if it has gone off screen

        
    };
}