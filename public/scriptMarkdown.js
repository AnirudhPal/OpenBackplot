window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var canvasArea = document.getElementById('canvas');   

    var convertTextAreaToCanvas = function(){
        var markdownText = pad.value;
        html = converter.makeHtml(markdownText);
        canvasArea.innerHTML = html;
    };

    pad.addEventListener('input', convertTextAreaToCanvas);

    convertTextAreaToCanvas();
};
