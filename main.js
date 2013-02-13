//import("Syntax.Null");
//import("JavaScript.Document");
//import("JavaScript.JQuery");
var main = function() {
    var li = document.createElement("LI");
    var text = document.createTextNode("Water");
    li.appendChild(text);
    document.getElementById("myList").appendChild(li);
    jQuery("#myList").append(li);
}
profiler.registMethod(window, "main", "window");
