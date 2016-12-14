$(document).ready(function(){
  console.log("streamer script loaded");

  $('video').on('ended',function(){
    console.log('Video has ended!');
    console.log($(this).children().first().attr("src"));
    $.post( "/video", { seen: true, video: $(this).children().first().attr("src")} );
  });

  $("input:file").change(function(){
    console.log("fileinput changed");
  })




});
