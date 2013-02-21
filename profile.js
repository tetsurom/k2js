var Record = (function () {
    function Record(name) {
        this.name = "";
        this.userAgent = navigator.userAgent;
        this.count = 0;
        this.total = 0;
        this.max = 0;
        this.min = 0;
        this.average = 0;
        this.name = name;
    }
    return Record;
})();
var Profiler = (function () {
    function Profiler() {
        this.keys = [];
        this.records = [];
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
        this.records[key] = new Record(key);
        object[property] = (function (__method, __record) {
            return function () {
                var start = (new Date()).getTime();
                var rv = __method.apply(_this, arguments);
                var time = ((new Date()).getTime() - start);
                __record.count++;
                __record.total += time;
                __record.max = __record.max > time ? __record.max : time;
                __record.min = __record.min > 0 && __record.min < time ? __record.min : time;
                return rv;
            }
        })(object[property], this.records[key]);
    };
    Profiler.prototype.registObject = function (object, name) {
        for(var property in object) {
            this.registMethod(object, property, name);
        }
    };
    Profiler.prototype.getResult = function (key) {
        var rec = this.records[key];
        if(rec.count > 0) {
            rec.average = rec.total / rec.count;
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
    Profiler.prototype.encodeFormComponent = function (value) {
        return encodeURIComponent(value).replace(/%20/g, "+");
    };
    Profiler.prototype.encodeFormParam = function (name, value) {
        return this.encodeFormComponent(name) + "=" + this.encodeFormComponent(value);
    };
    Profiler.prototype.encodeHTMLForm = function (data) {
        var params = [];
        for(var property in data) {
            params.push(this.encodeFormParam(property, data[property].toString()));
        }
        return params.join("&");
    };
    Profiler.prototype.sendLog = function (obj, target) {
        var request = new XMLHttpRequest();
        request.open("POST", target);
        request.send(JSON.stringify({
            method: "DumpJSLog",
            params: obj
        }));
    };
    Profiler.prototype.sendLogByForm = function (obj, target) {
        var iframe = document.createElement("iframe");
        var uniqueStr = "IFRAME_" + ((new Date()).getTime());
        document.body.appendChild(iframe);
        iframe.style.display = "none";
        iframe.contentWindow.name = uniqueStr;
        var form = document.createElement("form");
        form.target = uniqueStr;
        form.action = target;
        form.method = "POST";
        var input = document.createElement("imput");
        input.type = "hidden";
        input.value = JSON.stringify({
            method: "DumpJSLog",
            params: obj
        });
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    };
    return Profiler;
})();
var profiler = new Profiler();
