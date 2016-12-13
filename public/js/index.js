$(document).ready(function () {
	
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

});
