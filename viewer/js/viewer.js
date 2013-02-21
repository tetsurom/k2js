
$(document).ready(function(){
	jQuery.getJSON("log.json", function(log){
		var index = { name: null, count: 0, total: 0, max: 0, min: 0, average: 0, userAgent: null };
		var header = $("#logTableHead > tr");
		header.empty();
		for(var prop in index){
			header.append("<th>"+prop+"</th>")
		}
		var body = $("#logTableBody");
		body.empty();
		for(var i = 0; i < log.length; i++){
			for(var j = 0; j < log[i].length; j++){
				var oneLog = log[i][j];
				var tr = ["<tr>"];
				for(var prop in index){
					tr.push("<td>");
					tr.push(oneLog[prop]);
					tr.push("</td>");
				}
				tr.push("</tr>");
				body.append(tr.join(""));
			}
		}
	});
});

