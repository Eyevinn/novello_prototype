$(document).ready(function () {
  var activeChannelID;
  var oldChannelID;

<<<<<<< HEAD
=======
	//Popup when there is a video to be uploaded
>>>>>>> b59e4a7f811bc09a5ec1caa22b6454e0ba30cf8b
 $("#fileUpload").on('change', function() {
         console.log('modal ska poppas upp!!!');
         $('#myModal').modal('show');
  });

<<<<<<< HEAD
  $(".channels").click(function() {
  	//channelID = $(this).attr("id");
  	//console.log(channelID);
  	$(this).css('background-color', 'rgba(0, 0, 0, 0.1)');
=======
  // Change opacity when clicking on a channel
  $(".channels").click(function() { 
    console.log($(this).color);  	
  	$(this).css('opacity', '0.2');
>>>>>>> b59e4a7f811bc09a5ec1caa22b6454e0ba30cf8b
	});

  // Popup - choose which channel to send video to
  $(".channel-list").on('click', function() {
    if (oldChannelID) {
      oldChannelID.removeClass("change-background");
    }

    var $this = $(this);
    activeChannelID = $(this).attr("id");

<<<<<<< HEAD


    $("#change-channelname").val(activeChannelID);

    console.log("You're clicking on: " + activeChannelID);

=======
>>>>>>> b59e4a7f811bc09a5ec1caa22b6454e0ba30cf8b
    $(this).addClass("change-background");

    oldChannelID = $this;

    $("#send-to-channel-button").show();
    $("#change-channelname").val(activeChannelID);
  });

<<<<<<< HEAD

  $("#send-to-channel-button").click(function() {
    channel = activeChannelID;
    //$.post( "/upload", { channel: channel } );
=======
  $("#send-to-channel-button").click(function() {  
    channel = activeChannelID;   
>>>>>>> b59e4a7f811bc09a5ec1caa22b6454e0ba30cf8b
    $(".upload-form").submit();

  });

});
