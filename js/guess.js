var score = 3000;
var jackpotValue = 0;
var currentWord;
var lengthOfCurrentWord;
var displayWord = [];
var countFound = 0;
var wheelSpinning = false;
var turnCount = 0;
var misses = [];

var randomWord = function() {
	var requestStr = "http://randomword.setgetgo.com/get.php";

	$.ajax({
		type: "GET",
		url: requestStr,
		dataType: "jsonp",
		jsonpCallback: 'randomWordComplete'
	});
}

var randomWordComplete = function(data) {
	alert(data.Word);
	currentWord = data.Word;
	//currentWordArray = jQuery.makeArray(currentWord);
	lengthOfCurrentWord = currentWord.length;
	for (i = 0; i < lengthOfCurrentWord; i++) { 
		displayWord.push("_");
	}
	$("#wordDisplay").text(displayWord);
}

var turnsOver = function(){
	console.log("Turn over");
	score = score - jackpotValue;
	resetGame();
}

var checkLetter = function(){
	var letter = $("#divCurrentLetter").val();
	var indices = [];
	var letterPresent = false;
	
	if(turnCount == 5){ 
		turnsOver();
		return;
	}
	
	for(var i=0; i<lengthOfCurrentWord;i++) {
		if (currentWord[i] === letter && displayWord[i]!= letter) {
			indices.push(i);
			countFound = countFound + 1;
			letterPresent = true;
		}
		else if(displayWord[i]== letter){
			letterPresent = true;
		}
		
	}
	if(!letterPresent && $.inArray(letter, misses)==-1){
		turnCount = turnCount + 1;
		misses.push(letter);
	}
	
	if(countFound == lengthOfCurrentWord){
		alert("word found!!"+currentWord)
		score = score + jackpotValue;
		return;
	}
	for(var j=0;j<indices.length;j++){
		displayWord[indices[j]]=letter;
	}
	$("#wordDisplay").text(displayWord);
	$("#divCount").text("Score is: "+score);
	$("#divMisses").text("Misses are: "+misses);
	$("#noOfTurnsLeft").text("No of turns left: "+(5-turnCount));
	console.log(countFound);
}

var startGame = function(){
	$("#letterSection").removeClass("hideSection");
	randomWord();
}
 
var spinWheel = function(speed){
	//if(wheelSpinning){
		$("#canvasContainer").removeClass("wheel_spin");
		$("#canvasContainer").addClass("wheel_stop");
		powerSelected(speed);
		startSpin();
	/*}else{
		$("#canvasContainer").addClass("wheel_spin");
		$("#canvasContainer").removeClass("wheel_stop");
		resetWheel();
		return false;
	}
	wheelSpinning = !wheelSpinning;*/
}
 
var resetGame = function(){
	$("#letterSection").addClass("hideSection");
	$("#divCurrentLetter").value = "";
	jackpotValue = 0;
	currentWord = '';
	lengthOfCurrentWord = '';
	displayWord = [];
	countFound = 0;
	wheelSpinning = false;
	turnCount = 0;
	misses.length = 0;
	$("#divMisses").text("Misses are: "+misses);
	$("#divCount").text("Score is: "+score); 
	resetWheel();
}

$('#arm').click(function(e) {
	var arm = $(this).addClass('clicked');
	delay = setTimeout(function() { arm.removeClass('clicked');}, 500);
	e.preventDefault();
	spinWheel(3);
 });