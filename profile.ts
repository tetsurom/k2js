class Recode{
	name  : string = "";
	count : number = 0;
	total : number = 0;
}

class Profiler {
	keys :string[] = [];
	recodes : number[][] = [];
	
	registMethod(object: Object, property : string, name : string) : void{
		if(!name){
			name = ""+typeof(object);
		}
		if(typeof object[property] != "function") return;
		var key = name + "." + property;
		this.keys.push(key);
		this.recodes[key] = [];
		object[property] = ((__method, __timeRecord: number[]) =>
		    () => {
				var start = (new Date).getTime();
				var rv = __method.apply(this, arguments);
				__timeRecord.push((new Date).getTime() - start);
				return rv;
			})(object[property], this.recodes[key]);
    }

    registObject(object: Object, name : string) : void{
        for(var property in object){
			this.registMethod(object, property, name);
		}
    }
	
	getResult(key : string) : Recode{
		var rec = new Recode();
		var recs = <number[]>this.recodes[key];
		rec.name = key;
		rec.count = recs.length;
		for(var i = 0; i < recs.length; i++){
			rec.total += recs[i];
		}
		return rec;
	}
	
	getAllResults() : Recode[]{
		var recs = <Recode[]>[];
		for(var i = 0; i < this.keys.length; i++){
			recs.push(this.getResult(this.keys[i]));
		}
		return recs;
	}
	
}

var profiler = new Profiler;
