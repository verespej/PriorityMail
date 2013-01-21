//Fire a request to Gmail RSS feed
var req = new XMLHttpRequest();
var data = "not yet";
req.onload = showMails;
req.open(
  "GET",
  "https://mail.google.com/mail/feed/atom",
  true);
req.send(null);

function showMails() {
  var emails = req.responseXML.getElementsByTagName("title");
  for (var i = 0; i < emails.length; i++) {
    $("#unassignedEmailPile").append("<div class='email' id='email" + i + "'>" + emails[i].textContent + "</div>");
  }

  $(".email").each(function(i) {
    this.draggable = true;
    this.ondragstart = function(e) { drag(e); };
  });
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
  refresh();
});

function refresh() {
  var pileWidth = 100 * (1 / $(".emailPile").length) + "%";
  $(".emailPile").each(function(i) {
    this.ondrop = function(e) { drop(e); };
    this.ondragover = function(e) { allowDrop(e); };
    this.width = pileWidth;
  });
}

