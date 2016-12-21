$(document).ready(function () {
  var activeChannelID;
  var oldChannelID;


 $("#fileUpload").on('change', function() {
         console.log('modal ska poppas upp!!!');
         $('#myModal').modal('show');
  });


  
  // Change opacity when clicking on a channel
  $(".channels").click(function() {
    console.log($(this).color);
    $(this).css('background-color', 'rgba(0, 0, 0, 0.1)');
  	$(this).css('opacity', '0.2');

	});

  // Popup - choose which channel to send video to
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
    $("#change-channelname").val(activeChannelID);
  });



  $("#send-to-channel-button").click(function() {
    channel = activeChannelID;

    $(".upload-form").submit();

  });

});
