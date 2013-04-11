//import("Type.Float");
//import("Syntax.JavaStyleClass");
//import("Syntax.CStyleWhile");
//import("JavaScript.Math");
//import("JavaStyle.Object");
//import("JavaScript.Document");
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
n = 0.0000;
CENTER_X = 200.0000;
CENTER_Y = 200.0000;
var intervalHandler = function() {
    context.clearRect(0.0000, 0.0000, 400.0000, 400.0000);
    var x_1 = (CENTER_X+(100*Math.cos(n)));
    var y_2 = (CENTER_Y+(100*Math.sin(n)));
    var i_3 = 1;
    while((i_3<4)) {
        context.beginPath();
        context.lineWidth = 1.0000;
        context.moveTo(x_1, y_2);
        var x_1 = (CENTER_X+(100*Math.cos((n+(i_3*2.0944)))));
        var y_2 = (CENTER_Y+(100*Math.sin((n+(i_3*2.0944)))));
        context.lineTo(x_1, y_2);
        context.stroke();
        var i_3 = (i_3+1);
    }
    n = (n+0.0250);
}
setInterval(intervalHandler, 16);
