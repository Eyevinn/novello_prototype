$(document).ready(function () {

	var randomColor;
	
	function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    	for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    	}
    	return color;
	}

    $(".channels").click(function() {   	
  		var channelID = $(this).attr("id");
  		console.log(channelID);
  		$(this).css('background-color', 'rgba(0, 0, 0, 0.1)');
	});
	
	$("#redirect-to-add-new-channel-button").click(function() {   	
  		window.location.href = '/addchannel';
	});
	$("#redirect-to-remove-channel-button").click(function() {   	
  		window.location.href = '/removechannel';
	});
	
	randomColor = getRandomColor();
	console.log("Random color = "+randomColor);

	var totalChannels = $('.channels').length;
	$('.channels').each(function(){
		$(this).css('background-color', getRandomColor());
		console.log(randomColor);
 	});

});
