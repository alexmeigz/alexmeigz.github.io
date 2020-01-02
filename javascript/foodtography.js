var captions = [];
var dict = {"one":1, "two":2, "three":3, "four":4, "five":5};

for(i = 0; i < 10; i++){
  captions.push($(".homemade-caption").eq(i));
}

for(i = 0; i < 5; i++){
  $(".ind").eq(i).click(changeCaption);
}

function changeCaption(){
  var id = 2*(parseInt(this.id) - 1);
  for(i = 0; i < captions.length; i++){
    if(i == id || i == id + 1){
      captions[i].css("display", "inline");
    }
    else{
      captions[i].css("display", "none");
    }
  }
}
