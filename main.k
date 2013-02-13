import("Syntax.Null")
import("JavaScript.Document")
import("JavaScript.JQuery")

void main(){
	DomNode li = document.createElement("LI");
	DomNode text = document.createTextNode("Water");
	li.appendChild(text);
	document.getElementById("myList").appendChild(li);
	jQuery("#myList").append(li);
}


