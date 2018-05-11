function addCandidateDiv(obj) {
  $("#result").html("");
  for(var i in obj.hits){
  $("#result").append('<p id="result'+i+'"style= "max-height: 30px; overflow-y: hidden;">'+obj.hits[i]._source.content+'</p>');
  $("#result").append('<button class="show" id="'+(1+i)+'" style= "float:right;" >show</button>');
  $("#result").append('<button class="copy" id="'+i+'" style= "float:right;" >copy</button><br>');
}
}
function getResult(x) {
var xhr = new XMLHttpRequest();
 xhr.open("GET", "http://localhost:9200/paytm/_search?q=content:"+x+"&size=3",false);
 xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
 xhr.send();
 result = JSON.parse(xhr.responseText)
 addCandidateDiv(result.hits);
 //return false;
var els = document.getElementsByClassName("copy");
var show = document.getElementsByClassName("show");
Array.prototype.forEach.call(els, function(el) {
 el.addEventListener('click', function() {
   var id=el.id
   var element = document.getElementById("result"+id);
     var $temp = $("<input>");
     $("body").append($temp);
     $temp.val($(element).text()).select();
     document.execCommand("copy");
     $temp.remove();
   //copyText.select();
   //document.execCommand("Copy");
 });
});
Array.prototype.forEach.call(show, function(el) {
 el.addEventListener('click', function() {
   var modal = document.getElementById('myModal');
   var id=el.id
   var element = document.getElementById("result"+id[1]);
   var body = document.getElementById('mbody');
   body.innerHTML=element.innerHTML;
   var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      span.onclick = function() {
       modal.style.display = "none";
   }
   window.onclick = function(event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
   }
 });
});
}
document.addEventListener('DOMContentLoaded', () => {
  var x;
chrome.tabs.executeScript( {
  code: "window.document.getElementsByClassName('description-subject text--antialias')[0].innerHTML.toString();"
}, function(selection) {
  //document.getElementById("output").value = selection[0];
   x = selection[0];
   getResult(x);
});
  $('#btn1').click(function() {
    var x=document.getElementById("txt1").value;
    getResult(x);
    return false;
  });

});
