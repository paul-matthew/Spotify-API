//MENU BUTTON FUNCTION
function dropdown(){
    document.getElementById("mydropdown").classList.toggle("showme");
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
  

  