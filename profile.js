var Recode = (function () {
    function Recode() {
        this.name = "";
        this.count = 0;
        this.total = 0;
    }
    return Recode;
})();
var Profiler = (function () {
    function Profiler() {
        this.keys = [];
        this.recodes = [];
    }
    Profiler.prototype.registMethod = function (object, property, name) {
        var _this = this;
        if(!name) {
            name = "" + typeof (object);
        }
        if(typeof object[property] != "function") {
            return;
        }
        var key = name + "." + property;
        this.keys.push(key);
        this.recodes[key] = [];
        object[property] = (function (__method, __timeRecord) {
            return function () {
                var start = (new Date()).getTime();
                var rv = __method.apply(_this, arguments);
                __timeRecord.push((new Date()).getTime() - start);
                return rv;
            }
        })(object[property], this.recodes[key]);
    };
    Profiler.prototype.registObject = function (object, name) {
        for(var property in object) {
            this.registMethod(object, property, name);
        }
    };
    Profiler.prototype.getResult = function (key) {
        var rec = new Recode();
        var recs = this.recodes[key];
        rec.name = key;
        rec.count = recs.length;
        for(var i = 0; i < recs.length; i++) {
            rec.total += recs[i];
        }
        return rec;
    };
    Profiler.prototype.getAllResults = function () {
        var recs = [];
        for(var i = 0; i < this.keys.length; i++) {
            recs.push(this.getResult(this.keys[i]));
        }
        return recs;
    };
    return Profiler;
})();
var profiler = new Profiler();
