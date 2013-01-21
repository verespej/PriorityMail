//Fire a request to Gmail RSS feed
var req = new XMLHttpRequest();
var data = "not yet";
req.open(
    "GET",
    "https://mail.google.com/mail/feed/atom",
    true);
req.onload = showMails;
req.send(null);

function showMails() {
  var allEmailsInFeed = req.responseXML.getElementsByTagName("title");

  for (var i = 0; email = allEmailsInFeed[i]; i++) {
	$('#masterDiv').append('<div class="card">' + email.textContent + '</div>');
  }
  refreshCards();
}

function allowDrop(e) {
  e.preventDefault();
}
function drag(e) {
  e.dataTransfer.setData("Text", e.target.id);
}
function drop(e) {
  // Receive the id of the element and append the element to the dest
  e.preventDefault();
  var data = e.dataTransfer.getData("Text");
  e.target.appendChild(document.getElementById(data));
}

document.addEventListener('DOMContentLoaded', function () {
refreshCards();
});


function refreshCards() {
 $(".board").each(function(i) {
    this.ondrop = function(e) { drop(e); };
    this.ondragover = function(e) { allowDrop(e); };
  });
  var cardCount = 0;

  $(".card").each(function(i) {
    this.id = "card" + cardCount.toString();
    this.draggable = true;
    this.ondragstart = function(e) { drag(e); };
    cardCount++;
  });

}
