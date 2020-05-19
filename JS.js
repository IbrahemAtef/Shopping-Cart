$(document).ready(function(){
	
})

// Function using setTimeOut to do a function after the giving time 
function showAll(tagId, timeInSec){
	var div = $(tagId);
	setTimeout(function(){
		div.show();
	},timeInSec);
}