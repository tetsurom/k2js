import("Type.Float");
import("Syntax.JavaStyleClass");
import("Syntax.CStyleWhile");
import("JavaScript.Math");
import("JavaStyle.Object");
import("JavaScript.Document");

int FPS = 60;
float FRAME_MSEC = 1000 / FPS >> 0;
int CENTER_X = 235;
int CENTER_Y = 235;
int MAX = 220;

HTMLCanvasElement canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
CanvasRenderingContext2D context = canvas.getContext("2d");
float n = 0;

String getColorHSV(int h){
	h = h % 360;
	if(h < 0){
		h = h + 360;
	}
	float ht = h / 60.0;
	int hi = ht;
	int r;
	int g;
	int b;
	if(hi == 0){
		r = 255;
		g = (0.5 + 255 *(ht-hi));
		b = 0;
	}else if(hi == 1){
		g = 255;
		r = (0.5 + 255 *(1-(ht-hi)));
		b = 0;
	}else if(hi == 2){
		g = 255;
		b = (0.5 + 255 *(ht-hi));
		r = 0;
	}else if(hi == 3){
		b = 255;
		g = (0.5 + 255 *(1-(ht-hi)));
		r = 0;
	}else if(hi == 4){
		b = 255;
		r = (0.5 + 255 *(ht-hi));
		g = 0;
	}else{
		r = 255;
		b = (0.5 + 255 *(1-(ht-hi)));
		g = 0;
	}
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

void intervalHandler(){
	context.clearRect(0, 0, 465, 465);
	
	float oldX = CENTER_X;
	float oldY = CENTER_Y;
	
	int i = 0;
	while(i < MAX) {
		context.beginPath();
		context.lineWidth = 1;
		context.strokeStyle = getColorHSV(i / MAX * 360 + n * 4000);
		context.moveTo(oldX, oldY);
		oldX = CENTER_X + (i * Math.cos(i + (i * n)));
		oldY = CENTER_Y + (i * Math.sin(i + (i * n)));
		context.lineTo(oldX, oldY);
		context.stroke();
		i = i + 1;
	}
	
	n = n + 0.00025;
}

setInterval(intervalHandler, FRAME_MSEC);

