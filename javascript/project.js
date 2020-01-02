var XL_SCREEN = 1200;
var LG_SCREEN = 992;
var MD_SCREEN = 768;
var SM_SCREEN = 576;

var cards = [];
var hidden_rows = [];

for(i = 0; i < $(".hidden-card").length; i++){
  cards.push($(".hidden-card").eq(i));
}

for(i = 0; i < $(".hidden-row-card").length; i++){
  hidden_rows.push($(".hidden-row-card").eq(i));
}

$(window).resize(display);

function display(){
  if($(window).width() >= XL_SCREEN){
    for(i = 0; i < hidden_rows.length; i++){
      hidden_rows[i].css("display", "none");
    }
    for(i = 0; i < cards.length; i++){
      cards[i].css("display", "block");
    }
  }
  else{
    for(i = 0; i < hidden_rows.length; i++){
      hidden_rows[i].css("display", "block");
    }
    for(i = 0; i < cards.length; i++){
      cards[i].css("display", "none");
    }
  }
}

display();
