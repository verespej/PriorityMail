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
  var titleNode = getAtomFeedNode(req.responseXML, "/atom:feed/atom:title");
  $(".title").text(titleNode.textContent);

  var emailNodes = getAtomFeedNodeIterator(req.responseXML, "/atom:feed/atom:entry/atom:title");
  var count = 0;
  while (email = emailNodes.iterateNext()) {
    $("#unassignedEmailPile").append(
      "<div class='email' id='email" + count++ + "'>" + email.textContent + "</div>"
      );
  }

  $(".email").each(function(i) {
    this.draggable = true;
    this.ondragstart = function(e) { drag(e); };
  });
}

var atomNsResolver = function(prefix) { return "http://purl.org/atom/ns#"; };

function getAtomFeedNode(xmlDoc, path) {
  return xmlDoc.evaluate(
    path, xmlDoc, atomNsResolver, XPathResult.ANY_UNORDERED_NODE_TYPE, null
    ).singleNodeValue;
}

function getAtomFeedNodeIterator(xmlDoc, path) {
  return xmlDoc.evaluate(
    path, xmlDoc, atomNsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null
    );
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

