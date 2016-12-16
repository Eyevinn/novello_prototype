$(document).ready(function () {
  var activeChannelID;
  var oldChannelID;
	
 $("#fileUpload").on('change', function() {
         console.log('modal ska poppas upp!!!');
         $('#myModal').modal('show');
  });

  $(".channels").click(function() {   	
  	//channelID = $(this).attr("id");
  	//console.log(channelID);
  	$(this).css('background-color', 'rgba(0, 0, 0, 0.1)');
	});

  $(".channel-list").on('click', function() {
    if (oldChannelID) {
      oldChannelID.removeClass("change-background"); 
    }
    var $this = $(this);
    activeChannelID = $(this).attr("id");


    $("#change-channelname").val(activeChannelID);

    console.log("You're clicking on: " + activeChannelID); 
    $(this).addClass("change-background");

    oldChannelID = $this;
 
    $("#send-to-channel-button").show();
  });

  $("#send-to-channel-button").click(function() {  
    channel = activeChannelID;   
    //$.post( "/upload", { channel: channel } );
    $(".upload-form").submit();
  });

});
