function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
(async function() {
  while(typeof document.getElementsByClassName('pull-left ticket-editor__actions')[0]=='undefined')
  {
    await sleep(1);
  }
  var x=document.getElementsByClassName('description-subject text--antialias');
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:9200/optica/_search?q=content:"+x[0].innerHTML,false);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send();
  var results = JSON.parse(xhr.responseText);
	var button = document.createElement('button');
	button.innerHTML =Object.keys(results.hits.hits).length;
	button.style.backgroundColor = "#008080";
	button.style.position = "relative";
	button.style.bottom = "5px;";
	button.style.left  = "8px";
	//button.style.paddingTop = "5px";
  button.style.borderRadius= "50%";

  button.onclick="myFunction()";
	var elements = document.getElementsByClassName('pull-left ticket-editor__actions');
//while(true){
  //if(elements[0].querySelector("#search_button") == null){
    elements[0].appendChild(button);


  button.addEventListener ("click", function() {



  var mymodal=document.createElement('div');
  mymodal.class="modal";
  mymodal.id="modal1"

 mymodal.style.display="block"; /* Hidden by default */
 mymodal.style.position= "fixed"; /* Stay in place */
 mymodal.style.zIndex= "1"; /* Sit on top */
 mymodal.style.paddingTop= "300px"; /* Location of the box */
 mymodal.style.left= "0";
 mymodal.style.top= "0";
 mymodal.style.width= "60%"; /* Full width */
 mymodal.style.height= "80%"; /* Full height */
 mymodal.style.overflow= "auto"; /* Enable scroll if needed */
 mymodal.style.color="#008080	";

  var mcontent=document.createElement('div');
  mcontent.class="modal-content";
  mcontent.style.backgroundColor= "#fafafa";
  mcontent.style.margin= "auto";
  mcontent.style.padding= "20px";
  mcontent.style.border= "1px";
  mcontent.style.width= "80%";
  //mcontent.style.backgroundColor = 'rgb(0.1,0.7,0.5)';
  //mcontent.style.backgroundColor = 'rgba(0,0,0,.2)';

  var cross=document.createElement('span');
  cross.class="close";
  cross.id="closemodal"
  cross.innerHTML="&times;";
  cross.style.color= "#aaaaaa";
  cross.style.float= "right";
  cross.style.fontSize= "28px";
  cross.style.fontWeight= "bold";



  var list = document.createElement('ul');
	list.id = "mylist";
  var obj=results.hits;
  for(var i=0;i<Object.keys(results.hits.hits).length;i++) {
    var p = document.createElement("li");
    p.style.display = "block-inline";
    p.style.height = "38px";
    p.style.overflowY="hidden";
    p.id=i;
    p.style.cursor="pointer";
    p.innerHTML=results.hits.hits[i]._source.content;
    list.appendChild(p);
    var br = document.createElement("br");
    list.appendChild(br);
}
mcontent.appendChild(cross);
mcontent.appendChild(list);
mymodal.appendChild(mcontent);

  if(document.getElementsByClassName("ticket-editor__bodytext")[0].querySelector("#modal1") == null)
  document.getElementsByClassName("ticket-editor__bodytext")[0].appendChild(mymodal);
  document.getElementById("mylist").addEventListener("click",function(e) {
					var mytext=document.createElement('div');
					var qna=e.target.innerText;
          var answer = qna.split("?")[1];
          mytext.innerHTML=answer;
            document.getElementsByClassName("fr-element fr-view")[0].innerHTML='';
						document.getElementsByClassName("fr-element fr-view")[0].appendChild(mytext);
						//document.getElementsByClassName("fr-element fr-view")[0].appendChild(button);
            mymodal.parentNode.removeChild(mymodal);
      });
      document.getElementById("closemodal").addEventListener("click",function(e) {
          mymodal.parentNode.removeChild(mymodal)
        });

});
//}
//else
//await sleep(10000);
//}

})();
