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

function generate(booknumber){

	var obj = JSON.parse(books);

	var newstr = obj[booknumber].bookcontent;
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

	var x = Math.floor((Math.random() * stickerquotes.length) + 1);
    //document.getElementById("sentences").innerHTML = stickerquotes[x];

   	document.getElementById("sentences").innerHTML =
	obj[booknumber].title + "<br>" +
	obj[booknumber].author + "<br>" +
	obj[booknumber].since + "<br>" +
	stickerquotes[x];

	var quotestring = "";
	var str = stickerquotes[x];
	var words = str.split(" ");
	words.splice(0, 1);
	for (var i = 0; i < words.length ; i++) {
	    words[i] += " ";
	    if ( i && (i % 3 === 0)) {
	    	words[i] += "\n"
	    	quotestring = quotestring + words[i];
	    } else{
	    	quotestring = quotestring + words[i];
	    }
	}

	
	console.log(quotestring);

	title = obj[booknumber].title;
	author = obj[booknumber].author;
	sincedate = obj[booknumber].since;
	quotetext = quotestring;
	console.log(title);
	console.log(author);
	console.log(sincedate);

}




