$(document).ready(function () {

    console.log( "ready!" );

    $(".channels").click(function() {   	
  		var channelID = $(this).attr("id");
  		alert(channelID);
  		channelID.css('background-color', 'blue');
	});
	
	$("#redirect-to-add-new-channel-button").click(function() {   	
  		window.location.href = '/addchannel';
	});
	$("#redirect-to-remove-channel-button").click(function() {   	
  		window.location.href = '/removechannel';
	});

});
