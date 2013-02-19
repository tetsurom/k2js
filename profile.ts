class Record{
	name  : string = "";
	userAgent : string = navigator.userAgent;
	count : number = 0;
	total : number = 0;
	max : number = 0;
	min : number = 0;
	average : number = 0;
	constructor(name : string){
		this.name = name;
	}
}

class Profiler {
	keys :string[] = [];
	records : Record[] = [];
	
	registMethod(object: Object, property : string, name : string) : void{
		if(!name){
			name = ""+typeof(object);
		}
	
		if(typeof object[property] != "function") return;
		var key = name + "." + property;
		this.keys.push(key);
		this.records[key] = new Record(key);
		object[property] = ((__method, __record: Record) =>
		    () => {
				var start = (new Date).getTime();
				var rv = __method.apply(this, arguments);
				var time = ((new Date).getTime() - start);
				__record.count++;
				__record.total += time;
				__record.max = __record.max > time ? __record.max : time;
				__record.min = __record.min > 0 && __record.min < time ? __record.min : time;
				return rv;
			})(object[property], this.records[key]);
    }

    registObject(object: Object, name : string) : void{
        for(var property in object){
			this.registMethod(object, property, name);
		}
    }
	
	getResult(key : string) : Record{
		var rec = this.records[key];
		if(rec.count > 0){
			rec.average = rec.total / rec.count;
		}
		return rec;
	}
	
	getAllResults() : Record[]{
		var recs = <Record[]>[];
		for(var i = 0; i < this.keys.length; i++){
			recs.push(this.getResult(this.keys[i]));
		}
		return recs;
	}

	encodeFormComponent(value : string) : string{
		return encodeURIComponent(value).replace(/%20/g, "+");
	}

	encodeFormParam(name : string, value : string) : string{
		return this.encodeFormComponent(name) + "=" + this.encodeFormComponent(value);
	}
	
	encodeHTMLForm(data : Object) : string{
		var params = [];
		for(var property in data){
			params.push(this.encodeFormParam(property, data[property].toString()));
		}
		return params.join("&");
	}

	sendLog(obj : Object, target : string) : void{
		var request = new XMLHttpRequest();
		request.open("POST", target);
		//request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//request.send(this.encodeHTMLForm(obj));
		request.send(JSON.stringify({method:"DumpJSLog", params:obj}));
	}
}

var profiler = new Profiler;
