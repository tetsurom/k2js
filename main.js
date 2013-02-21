// JSM params prof=main
// JSM profile target = main
//import("JavaScript.Document");
//import("JavaScript.JQuery");
var fibo = function(n) {
    if((n<3)) {
        return 1;
        
    }
    return (fibo((n-1))+fibo((n-2)));
    
}
var main = function() {
    var n = fibo(10);
    var li = document.createElement("LI");
    var text = document.createTextNode(("fibo(10) = "+n));
    li.appendChild(text);
    document.getElementById("myList").appendChild(li);
    jQuery("#myList").append(li);
}
profiler.registMethod(window, "main", "window");
