var XL_SCREEN = 1200;
var LG_SCREEN = 992;
var MD_SCREEN = 768;
var SM_SCREEN = 576;

var navbar = $("nav").eq(0);
var dropdowns = [];

for(i = 0; i < $(".dropdown-menu").length; i++){
  dropdowns.push($(".dropdown-menu").eq(i));
}

$(window).resize(display);

function display(){
  if($(window).width() >= LG_SCREEN){
    navbar.css("font-size", "40px");
    for(i = 0; i < dropdowns.length; i++){
      dropdowns[i].css("text-align", "center");
    }
  }
  else{
    navbar.css("font-size", "30px");
    for(i = 0; i < dropdowns.length; i++){
      dropdowns[i].css("text-align", "left");
    }
  }
}

display();
