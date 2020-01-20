var KotSlider = function (id) {

    var defaultOptions = {
        max: 5,
        min: 0,
        step: 1,
        duration: 1000
    };

    this.id = id;
    this.max = defaultOptions.max;
    this.min = defaultOptions.min;
    this.step = defaultOptions.step;
    this.duration = defaultOptions.duration;
    this.t = defaultOptions.min;

    this.init(id);
}


KotSlider.prototype.init = function (id) {

    if (document.getElementById(id) != null) {

        var input = document.getElementById(id);

        if (input.tagName == 'INPUT') {

            var slider = document.getElementById(id);
            var div = document.createElement('div');
            var divChild1 = document.createElement('div');
            var divChild2 = document.createElement('div');
            div.setAttribute('class', 'rangeWrap');
            divChild1.setAttribute('class', 'rangeWrapChild button');
            divChild2.setAttribute('class', 'rangeWrapChild slide');
            divChild2.append(slider);
            div.append(divChild1);
            div.append(divChild2);
            document.body.appendChild(div);
    
            var max = this.max;
            var min = this.min;
            var step = this.step;
            var duration = this.duration;

            makeSliderBtn("startBtn", "start");
            makeSliderBtn("stopBtn", "stop");
            makeSliderBtn("beforeBtn", "before");
            makeSliderBtn("afterBtn", "after");

            setSlider(id, max, min, step, duration);

            function makeSliderBtn(name, action) {
                var name = document.createElement('input');
                // var div = document.createElement('div');

                // div.setAttribute('class', 'gaiaBtn');

                name.id = action + id;
                name.type = "button";
                name.setAttribute('class', action);
                name.value = action;
                divChild1.append(name);
            }

            


        } else {
            throw '"' + id + '" 라는 id의 input이 없습니다.';
        }

    } else {
        throw '"' + id + '" 라는 id의 input이 없습니다.';
    }
}

KotSlider.prototype.setMax = function (max) {
    this.max = max;

    var max = max;
    var min = this.min;
    var step = this.step;
    var duration = this.duration;

    setSlider(this.id, max, min, step, duration);

}

KotSlider.prototype.setMin = function (min) {
    this.min = min;

    var max = this.max;
    var min = min;
    var step = this.step;
    var duration = this.duration;

    setSlider(this.id, max, min, step, duration);

}

KotSlider.prototype.setStep = function (step) {
    this.step = step;

    var max = this.max;
    var min = this.min;
    var step = step;
    var duration = this.duration;

    setSlider(this.id, max, min, step, duration);

}

KotSlider.prototype.setDuration = function (duration) {
    this.duration = duration;

    var max = this.max;
    var min = this.min;
    var step = this.step;
    var duration = duration;

    setSlider(this.id, max, min, step, duration);

}

var setSlider = function (id, max, min, step, duration) {

    var slider = document.getElementById(id);

    var t = min;
    var startButton = document.getElementById("start" + id);
    var stopButton = document.getElementById("stop" + id);
    var beforeButton = document.getElementById("before" + id);
    var afterButton = document.getElementById("after" + id);
    var timer;

    slider.value = t;
    slider.type = 'range';
    slider.max = max;
    slider.min = min;
    slider.step = step;
    slider.className = 'slider';

    startButton.onclick = start;
    beforeButton.onclick = before;
    afterButton.onclick = after;
    slider.onclick = clickValue;

    function clickValue() {
        t = new Number(slider.value);
    }

    function start() {
        startButton.onclick = null;
        stopButton.onclick = stop;

        timer = setInterval(function () {

            if (t + step >= max) {
                clearInterval(timer);
                t = min;
                slider.value = t;
                startButton.onclick = start;

            } else {
                t = (t + step);
                slider.value = t;

            }
        }, duration);
    }
    function stop() {
        clearInterval(timer);
        startButton.onclick = start;
    }
    function before() {
        if (t - step <= max & t - step >= min) {

            t = t - step;
        }
        console.log(t);
        slider.value = t;
    }
    function after() {
        if (t + step <= max) {

            t = t + step;
        }
        console.log(t);
        slider.value = t;

    }
}
