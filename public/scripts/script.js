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


	var rando = Math.abs(Math.floor((Math.random() * 2) - 1));;
	console.log(rando);

		var obj = JSON.parse(books);

	var newstr = obj[rando].bookcontent;
	var result = newstr.match( /[^\.!\?]+[\.!\?]+/g );

	console.log( result.length);
	//console.log(result);

	var stickerquotes = [];


	for (var i = 0; i < result.length; i++) {

		if (result[i].length > 10 && result[i].length < 100){
			result[i] = result[i].replace(/"/g, "");
			stickerquotes.push(result[i]);
		} 
	    
	}

	console.log(stickerquotes.length);

	var x = Math.floor((Math.random() * stickerquotes.length) + 1);
	console.log(stickerquotes[x]);
    //document.getElementById("sentences").innerHTML = stickerquotes[x];

   	document.getElementById("sentences").innerHTML =
	obj[rando].title + "<br>" +
	obj[rando].author + "<br>" +
	obj[rando].since + "<br>" +
	stickerquotes[x];

	var str = stickerquotes[x];
	var words = str.split(" ");
	for (var i = 0; i < words.length - 1; i++) {
	    words[i] += " ";
	}
	console.log(words);

	title = obj[rando].title;
	author = obj[rando].author;
	sincedate = obj[rando].since;
	quotetext = stickerquotes[x];
	console.log(title);


});




