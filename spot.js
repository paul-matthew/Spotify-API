//MENU BUTTON FUNCTION
function dropdown(){
    document.getElementById("mydropdown").classList.toggle("showme");
  
  }
  function myFunction(x) {
    x.classList.toggle("change");
  }


  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.menubtn') && !e.target.matches('.menubar')) {
    var myDropdownop = document.getElementById("mydropdown");
      if (myDropdownop.classList.contains('showme')) {
        myDropdownop.classList.remove('showme');
      }
    }
  }