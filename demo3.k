import("Type.Float");
import("Syntax.JavaStyleClass");
import("Syntax.CStyleWhile");
import("JavaScript.Math");
import("JavaStyle.Object");
import("JavaScript.Document");


HTMLCanvasElement canvas = document.getElementById("canvas") as HTMLCanvasElement;
CanvasRenderingContext2D context = canvas.getContext("2d");
float n = 0;

float CENTER_X = 200;
float CENTER_Y = 200;


void intervalHandler(){
	context.clearRect(0, 0, 400, 400);
	
	float x = CENTER_X + 100 * Math.cos(n);
	float y = CENTER_Y + 100 * Math.sin(n);
	
	int i = 0;
	while(i < 3) {
		context.beginPath();
		context.lineWidth = 1;
		context.moveTo(20, 20);
		float x = CENTER_X + 100 * Math.cos(n + i * 2.0944);
		float y = CENTER_Y + 100 * Math.sin(n + i * 2.0944);
		context.lineTo(x, y);
		context.stroke();
		i = i + 1;
	}
	
	n = n + 0.025;
}

setInterval(intervalHandler, 16);

