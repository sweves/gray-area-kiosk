var test = "test";
var title = null;
var author = null;
var sincedate = null;
var quotetext = null;

$( document ).ready(function() {
    console.log( "ready!" );

	$( "#placeholder" ).click(function() {
	  $( ".book" ).show({duration: 0, queue: true})
    .delay(9000000)
    .hide({duration: 0, queue: true});
	});


	// var rando = Math.abs(Math.floor((Math.random() * 2) - 1));;
	// console.log(rando);

	// generate(rando);

	

});


function generate(){

	//console.log(piano);

	var options = [eyes, sketches, time, catpj, piano, bestss, fish, jerry, pilgrim];
	var optionr = Math.floor((Math.random() * 9) );
	console.log(optionr);

	var obj = JSON.parse(options[optionr]);


	if (optionr === 0){
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/eyes.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else if (optionr === 1) {
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/sketches.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else if (optionr === 2) {
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/time.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else if (optionr === 3) {
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/catpj.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else if (optionr === 4) {
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/piano.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else if (optionr === 5) {
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/bestss.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else if (optionr === 6) {
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/fish.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else if (optionr === 7) {
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/jerry.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else if (optionr === 8) {
		$(".book").css('background-image', 'url(' + "//localhost:3000/img/pilgrim.jpg" + ')');
		$(".book").css('background-size', '20%');
	} else {
		console.log("background null");
	}

	var newstr = obj[0].bookcontent;
	var result = newstr.match( /[^\.!\?]+[\.!\?]+/g );

	//console.log( result.length);
	//console.log(result);

	var stickerquotes = [];


	for (var i = 0; i < result.length; i++) {

		if (result[i].length > 10 && result[i].length < 100){
			result[i] = result[i].replace(/"/g, "");
			stickerquotes.push(result[i]);
		} 
	    
	}

	//console.log(stickerquotes.length);

	var x = Math.floor((Math.random() * (stickerquotes.length-1)) + 1);
    //document.getElementById("sentences").innerHTML = stickerquotes[x];

   	document.getElementById("sentences").innerHTML =
	"<h1 class='subh'>" + obj[0].title + "</h1>" +
	"<p class='detail1'>" + obj[0].author + "</p>" +
	"<p class='detail2'>Forgotten Since:" + obj[0].since + "</p>"
	//"<br>" +
	//stickerquotes[x];
	//console.log(x);
	//console.log(stickerquotes.length);
	//console.log(stickerquotes[88]);

	var quotestring = "";
	var str = stickerquotes[x];
	var words = str.split(" ");
	//words.splice(0, 1);
	// delete words[0];
	// words[0] = "";
	for (var i = 0; i < words.length ; i++) {
	    words[i] += " ";
	    if( i > 0){
		    if ( (i != 0) && (i % 3 === 0)) {
		    	words[i] += "\n";
		    	quotestring = quotestring + words[i];
		    } else{
		    	quotestring = quotestring + words[i];
		    }
		}
	}

	
	console.log(quotestring);

	title = obj[0].title;
	author = obj[0].author;
	sincedate = obj[0].since;
	quotetext = quotestring;
	console.log(title);
	console.log(author);
	console.log(sincedate);

}




