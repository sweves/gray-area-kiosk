var test = "test";
var title = null;
var author = null;
var sincedate = null;
var quotetext = null;

$( document ).ready(function() {
    console.log( "ready!" );

	$( "#placeholder" ).click(function() {
	  $( ".book" ).fadeIn().delay(5000).fadeOut();
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
	obj[0].title + "<br>" +
	obj[0].author + "<br>" +
	obj[0].since + "<br>" +
	stickerquotes[x];
	//console.log(x);
	//console.log(stickerquotes.length);
	//console.log(stickerquotes[88]);

	var quotestring = "";
	var str = stickerquotes[x];
	var words = str.split(" ");
	words.splice(0, 1);
	for (var i = 0; i < words.length ; i++) {
	    words[i] += " ";
	    if ( (i != 0) && (i % 3 === 0)) {
	    	words[i] += "\n";
	    	quotestring = quotestring + words[i];
	    } else{
	    	quotestring = quotestring + words[i];
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




