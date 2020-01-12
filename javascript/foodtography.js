var IMAGES = {"homemade":["rose_and_lychee.jpeg", "steak_and_lobster.jpeg", "strawberry_lemonade.jpeg", "beef_wellington.jpeg", "french_toast.jpeg"],
"restaurant":["tamarind_wings.JPG", "swan_puffs.JPG", "tuna_salad.JPG", "lobster_roll.JPG", "boba.JPG"],
"sunset":["beach1.JPG", "beach2.JPG", "beach3.JPG", "beach4.JPG", "beach5.JPG"],
"hiking":["wuyishan1.JPG", "wuyishan2.JPG", "wuyishan3.JPG", "hike1.JPG", "hike2.JPG"],
}

var HEADERS = {

}

var DESCRIPTIONS = {

}

var NUM_BUTTONS = 4;
var category="homemade"
var captions = [];
var dict = {"one":1, "two":2, "three":3, "four":4, "five":5};

for(i=0; i<NUM_BUTTONS; i++){
  $(".btn-info").eq(i).click(changeCategory);
}

function changeCategory(){
  category = this.id;
  for(i=0; i<1; i++){
    if($(".foodtography").eq(i).attr("id") == category){
      $(".foodtography").eq(i).css("display", "inline-block");
    }
    else{
      $(".foodtography").eq(i).css("display", "none");
    }
  }
}

for(i = 0; i < 10; i++){
  captions.push($(".homemade").eq(i));
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
