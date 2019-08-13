//  Hypothesis Customized embedding
//  This hypothesis config function returns a new constructor which modifies
//  annotator for a better integration. Below we create our own EpubAnnotationSidebar
//  Constructor, customizing the show and hide function to take acount for the reader UI.


// This is the Epub.js plugin. Annotations are updated on location change.
EPUBJS.reader.plugins.TranslateController = function (book) {
  book.spine.hooks.content.register((contents,view)=>{
    console.log("Rendering..");
    let body = contents.body;
    var textNodes = [];
    walkDOM(body,function(n){
        if (n.nodeType == 3) {
            textNodes.push(n);
        }
    });

    var id_count = 1;
    for (var i=0; i<textNodes.length; i++) {
        var n = textNodes[i];
        var txt = n.nodeValue;
        var words = txt.split(' ');

        // Insert span surrounded words:
        insertBefore(makeSpan(words[0],{id:id_count++}),n);
        for (var j=1; j<words.length; j++) {
            insertBefore(makeText(' '),n); // join the words with spaces
            insertBefore(makeSpan(words[j],{id:id_count++}),n);
        }
        // Now remove the original text node:
        removeElement(n);
    }
  }) // Section has been loaded and parsed

  book.rendition.hooks.render.register((contents,view)=>{
    let body = contents.document.body;

    body.addEventListener('click',handleClick);
  });

  // Book.rendition.on("rendered", function(section) {
    // let contents = book.rendition.getContents()[0];
    // let body = contents.content;
    // console.log(contents);
    // body.addEventListener('click',(e)=>{
    //   let s = contents.window.getSelection();
    //   var range = s.getRangeAt(0);
    //   if (range.startOffset != range.endOffset){
    //     return;
    //   }
    //   var initialStartOffset = range.startOffset;
    //   var node = s.anchorNode;
    //
    //   while (range.toString().indexOf(' ') != 0 && range.startOffset != 0) {
    //     range.setStart(node, Math.max(range.startOffset - 1,0));
    //   }
    //   range.setStart(node, (range.startOffset==0)?0:range.startOffset + 1);
    //   do {
    //       range.setEnd(node, Math.min(range.endOffset + 1,node.length));
    //   } while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '' && range.endOffset < node.length);
    //   var str = range.toString().trim();
    //   console.log(str);
    //   range.setStart(node, initialStartOffset);
    //   range.setEnd(node, initialStartOffset);
    // });
  // });
  return {}
};

function walkDOM (node,callback) {
    if (node.nodeName != 'SCRIPT') { // ignore javascript
        callback(node);
        for (var i=0; i<node.childNodes.length; i++) {
            walkDOM(node.childNodes[i],callback);
        }
    }
}
function insertBefore (new_element, element) {
    element.parentNode.insertBefore(new_element,element);
}
function removeElement (element) {
    element.parentNode.removeChild(element);
}
function makeSpan (txt, attrs) {
    var s = document.createElement('span');
    for (var i in attrs) {
        if (attrs.hasOwnProperty(i)) s[i] = attrs[i];
    }
    s.appendChild(makeText(txt));
    return s;
}
function makeText (txt) {return document.createTextNode(txt)}

function handleClick(e){
  if (e.target.tagName == 'SPAN'){
    console.log('yay');
    console.log(e.target.textContent);
  }
  // console.log(e);
}
