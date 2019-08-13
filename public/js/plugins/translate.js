//  Hypothesis Customized embedding
//  This hypothesis config function returns a new constructor which modifies
//  annotator for a better integration. Below we create our own EpubAnnotationSidebar
//  Constructor, customizing the show and hide function to take acount for the reader UI.


// This is the Epub.js plugin. Annotations are updated on location change.
EPUBJS.reader.plugins.TranslateController = function (Book) {
  Book.rendition.on("rendered", function(section) {
    let contents = Book.rendition.getContents()[0];
    let body = contents.content;
    body.addEventListener('click',(e)=>{
      let s = contents.window.getSelection();
      var range = s.getRangeAt(0);
      if (range.startOffset != range.endOffset){
        return;
      }
      var initialStartOffset = range.startOffset;
      var node = s.anchorNode;

      while (range.toString().indexOf(' ') != 0 && range.startOffset != 0) {
        range.setStart(node, Math.max(range.startOffset - 1,0));
      }
      range.setStart(node, (range.startOffset==0)?0:range.startOffset + 1);
      do {
          range.setEnd(node, Math.min(range.endOffset + 1,node.length));
      } while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '' && range.endOffset < node.length);
      var str = range.toString().trim();
      console.log(str);
      range.setStart(node, initialStartOffset);
      range.setEnd(node, initialStartOffset);
    });
  });
  return {}
};
