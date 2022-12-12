//MENU BUTTON FUNCTION
function dropdown(){
    document.getElementById("mydropdown").classList.toggle("showme");
  }

  function playtog(){
    document.getElementById("playbtn").classList.toggle("hideplay");
  }

  function pausetog(){
    document.getElementById("pausebtn").classList.toggle("showme");
  }

  function myFunction(x) {
  x.classList.toggle("change");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  
  window.addEventListener('click', function(e) {
    if (!e.target.classlist.contains('menubtn')&& !e.target.classlist.contains('menubar1') ) {
      var droptoggle=document.getElementById("mydropdown");
      if (droptoggle.classlist.contains('showme')){
        droptoggle.classList.remove("showme");
      }
    }
  })
  /*
  function player(){
    const spotpreview=document.getElementById("spotify").classList;
    spotpreview.add("showme");
  }*/

  function player(){
    const spotpreview=document.getElementById("newplayer").classList;
    spotpreview.add("showme");
  }

  function playtrack(){
    console.log("AH YO");
    /*var x=document.getElementById("newplayer");
    x.play()*/
    document.getElementsByTagName("body")[0].style="background-size:1200px;overflow-y:auto; background-image:url('hands.gif'); background-color:#190114;background-position:center;background-repeat:no-repeat"
  }

  function pausetrack(){
    console.log("AH YO");
    /*var x=document.getElementById("newplayer");
    x.play()*/
    document.getElementsByTagName("body")[0].style="background-size:1200px;overflow-y:auto; background-image:url('hands.jpeg'); background-color:#190114;background-position:center;background-repeat:no-repeat"
  }

    function audiovolume(){
    var x = document.getElementById("hiddenplayer");
    x.volume = 0.0;
    console.log("yo");
    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
    var fadePoint = 25; 

    var fadeAudio = setInterval(()=> {

        // Only fade if past the fade out point or not at zero already
        if ((x.currentTime <= fadePoint) && (x.volume != 0.5)) {
            x.volume += 0.01;
            console.log(x.volume)
        }
        // When volume at zero stop all the intervalling
        if (x.volume >= 0.5) {
            clearInterval(fadeAudio);
        }
    }, 200);


  }
  

  