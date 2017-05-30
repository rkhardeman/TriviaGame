
// do not load until dom is ready
$(document).ready(function(){

//this will hold the game itself
var triviaGame = {
    //questions to be displayed
    questionsArray:[{
      question: "What is the registry number of the USS Enterprise?",
        answer1:"NCC-1701",
        answer2:"NCC-1702",
        answer3:"NCC-1703",
        answer4:"NCC-1704",
    },

    {
      question: "What is Captain Kirks middle name?",
        answer1:"Thomas",
        answer2:"Tim",
        answer3:"Taylor",
        answer4:"Tiberius",
    },

    {
      question: "Who is the caption of the Enterprise-D?",
        answer1:"Picard",
        answer2:"Archer",
        answer3:"Harriman",
        answer4:"Garrett",
    },

    {
      question: "Who was responsible for building Deep Space Nine?",
        answer1:"Bajorans",
        answer2:"Cardassians",
        answer3:"Klingons",
        answer4:"The Dominion",
    },

    {
      question: "What was the name of the genetically-engineered humanoid race used by the Dominion as their primary military force?",
        answer1:"Borg",
        answer2:"Romulans",
        answer3:"Jem\'Hadar",
        answer4:"The Dominion",
    }],

    //store correct answers here
    correctAnswers: ["NCC-1701","Tiberius","Picard","Cardassians","Jem\'Hadar"],
    //users answers will be stored here
    userAnswers: [],

    //keep track of questions asked
    questionCount: 0,

    beginInt: 0,

    timer: 30,
    btnClicked: false,
    numberCorrect: 0,
    numberIncorrect: 0,
    // playMusic: new Audio("../sounds/star-trek.m4a"),

    //function to begin game
    beginGame: function(){
    //end game if questionCount is equal to questionsArry length
    if(triviaGame.questionCount == triviaGame.questionsArray.length){
      // call gameFinished funtion
      triviaGame.gameFinished();
      triviaGame.timer = 30;
    //run else if questionCount does not equal questionsArry length
    } else {

      if(triviaGame.questionCount >= 1){
        clearInterval(triviaGame.displayNextInt);
        $('#gameStart').show();
        $('#divAnswers').hide();
        triviaGame.timer = 30;
        $('#time').html(triviaGame.timer);
      }

      $('p.questions').html(triviaGame.questionsArray[triviaGame.questionCount].question);
      $('button.answer1').html(triviaGame.questionsArray[triviaGame.questionCount].ans1);
      $('button.answer2').html(triviaGame.questionsArray[triviaGame.questionCount].answer2);
      $('button.answer3').html(triviaGame.questionsArray[triviaGame.questionCount].answer3);
      $('button.answer4').html(triviaGame.questionsArray[triviaGame.questionCount].answer4);

      triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);
    }
  },//end of beginGame

  //function for countdown timer
  countDown: function(){

    triviaGame.timer--;
    $('#time').html(triviaGame.timer);
    //if game timer is equak to zero call out of time
    if(triviaGame.timer == 0){

      triviaGame.oufOfTime();
      //if a button is clicked and the answer is correct excute answersCorrect().
   } else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] == triviaGame.userAnswers[triviaGame.questionCount]){
    
      triviaGame.answersCorrect();
      //if a button is clicked and the answer is incorrect excute answersWrong().
    } else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){

      triviaGame.answersWrong();
    }

  },// end of countDown

// this function is called if the answer clicked is correct
  answersCorrect: function(){

    $('#divAnswers').show();
    $('#gameStart').hide();
    $('#outOfTime').hide();
    $('#wrongMsg').hide();  
    $('#correctMsg').show();
    $('#pCorrectAnswer').hide();  
    $('#answers').css('display', 'block');
    $('#timeRemaining').css('display', 'block');
    $('#elapsedTime').html(triviaGame.timer);

    clearInterval(triviaGame.beginInt);
    triviaGame.btnClicked = false;
    triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 3000);
    triviaGame.numberCorrect++;
    triviaGame.questionCount++;

  },// end of correctAnswer

// this function is called if the answer clicked is incorrect
answersWrong: function(){

    $('#divAnswers').show();
    $('#gameStart').hide();
    $('#outOfTime').hide();
    $('#wrongMsg').show();
    $('#correctMsg').hide();
    $('#pCorrectAnswer').show();
    $('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
    $('#timeRemaining').css('display', 'block');
    $('#elapsedTime').html(triviaGame.timer);
    $('#incorrectAnswers').html(triviaGame.incorrectAnswers);

    clearInterval(triviaGame.beginInt);
    triviaGame.btnClicked = false;
    triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
    triviaGame.numberIncorrect++;
    triviaGame.questionCount++;
  },// end of answerWrong

// this functon is called when player runs out of time
oufOfTime: function(){

    triviaGame.userAnswers.push(""); 
    $('#divAnswers').show();
    $('#gameStart').hide();
    $('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
    $('#pCorrectAnswer').show();
    $('#correctMsg').hide();
    $('#wrongMsg').hide();    
    $('#timeRemaining').css('display', 'block');
    $('#elapsedTime').html(triviaGame.timer); 
    $('#incorrectAnswers').html(triviaGame.incorrectAnswers);
    clearInterval(triviaGame.beginInt);
    triviaGame.numberIncorrect++;
    triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
    triviaGame.questionCount++;


  },// end of outOfTime

// this function is called when the player click 'restart'
restart: function(){

    triviaGame.questionCount = 0;
    triviaGame.userAnswers.length = 0;
    $('#time').html("30");

    triviaGame.beginGame();
    $('#gameStart').show();
    $('#gameComplete').hide();
    $('#restartPlaceholder').css('display', 'none');
    clearInterval(triviaGame.displayNextInt);
    $('#elapsedTime').empty();
    triviaGame.numberCorrect = 0;
    triviaGame.numberIncorrect = 0;
  },//end of restart

// reset after game ends 
gameFinished: function(){

    $('#restartPlaceholder').css('display', 'block');
    $('#divAnswers').hide();
    $('#gameStart').hide();

    $('#gameComplete').css('display', 'block');

    $('#gameOverCorrect span').html(triviaGame.numberCorrect);
    $('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
    triviaGame.timer = 30;
  }// end of gameFinished




  }//end of var triviaGame

// start the game on click
  $('#begin').on('click', function(){

    $("#gameStart").css('display', 'block');
    $("#btnWrapper").css('display', 'none');
    $(".questions").html(triviaGame.beginGame);

  });


  $('.answers').on('click', function(){

    triviaGame.userAnswers.push($(this).text());
    triviaGame.btnClicked = true;

  });

// On click call the reset function to restart the game
  $('#restartBtn').on('click', function(){

    triviaGame.restart();
    
  });



});// end of doc ready

