import("JavaScript.Document");
import("JavaScript.JQuery");

int fibo(int n){
	if(n<3){
		return 1;
	}
	return fibo(n-1) + fibo(n-2);
}

void main(){
	int n = fibo(10);
	DomNode li = document.createElement("LI");
	DomNode text = document.createTextNode("fibo(10) = "+n);
	li.appendChild(text);
	document.getElementById("myList").appendChild(li);
	jQuery("#myList").append(li);
}


