$(document).ready(function () {

    console.log( "ready!" );

    $(".channels").click(function() {   	
  		var channelID = $(this).attr("id");
  		console.log(channelID);
  		$(this).css('background-color', 'rgba(190, 0, 190, 0.05)');
	});
	
	$("#redirect-to-add-new-channel-button").click(function() {   	
  		window.location.href = '/addchannel';
	});
	$("#redirect-to-remove-channel-button").click(function() {   	
  		window.location.href = '/removechannel';
	});

});
