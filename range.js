var KotSlider = function (inputId) {


    if (!document.getElementById(inputId) || !document.getElementById(inputId).tagName == 'INPUT') throw '"' + inputId + '" 라는 id의 input이 없습니다.';

    var defaultOptions = {

        max: 5,
        min: 0,
        step: 1,
        duration: 1000
    };
    this.id = inputId;
    this.min = defaultOptions.min;
    this.max = defaultOptions.max;
    this.step = defaultOptions.step;
    this.duration = defaultOptions.duration;
    this.t = defaultOptions.min;

    this.init();
}

KotSlider.prototype.init = function () {

    var slider = document.getElementById(this.id);

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

    makeSliderBtn("startBtn", "start", this.id);
    makeSliderBtn("stopBtn", "stop", this.id);
    makeSliderBtn("beforeBtn", "before", this.id);
    makeSliderBtn("afterBtn", "after", this.id);

    this.setSlider(this.id);

    function makeSliderBtn(name, action, id) {
        var name = document.createElement('button');

        name.id = action + id;
        name.setAttribute('class', action);
        name.value = action;
        divChild1.append(name);
    }


}

KotSlider.prototype.setMax = function (max) {

    this.max = max;
    this.setSlider(this.id);

}

KotSlider.prototype.setMin = function (min) {

    this.min = min;
    this.setSlider(this.id);

}

KotSlider.prototype.setStep = function (step) {

    this.step = step;
    this.setSlider(this.id);

}

KotSlider.prototype.setDuration = function (duration) {

    this.duration = duration;
    this.setSlider(this.id);

}

KotSlider.prototype.setSlider = function (id) {

    var sliderObject = document.getElementById(id);

    console.log(this.step);
    var t = this.min;
    var startButton = document.getElementById("start" + id);
    var stopButton = document.getElementById("stop" + id);
    var beforeButton = document.getElementById("before" + id);
    var afterButton = document.getElementById("after" + id);
    var timer;
    var max = this.max;
    var min = this.min;
    var step = this.step;
    var duration = this.duration;

    sliderObject.value = t;
    sliderObject.type = 'range';
    sliderObject.max = max;
    sliderObject.min = min;
    sliderObject.step = step;
    sliderObject.className = 'slider';

    startButton.onclick = start;
    beforeButton.onclick = before;
    afterButton.onclick = after;
    sliderObject.onclick = clickValue;

    function clickValue() {
        t = new Number(sliderObject.value);
    }

    function start() {
        startButton.onclick = null;
        stopButton.onclick = stop;

        timer = setInterval(function () {

            if (t + step >= max) {
                clearInterval(timer);
                t = min;
                sliderObject.value = t;
                startButton.onclick = start;

            } else {
                t = (t + step);
                sliderObject.value = t;

            }
        }, duration);
    }
    function stop() {
        clearInterval(timer);
        startButton.onclick = start;
    }
    function before() {

        if (t - min <= max && t - step >= min) {

            t = t - step

        }

        sliderObject.value = t;
    }
    function after() {

        if (t + step <= max) {

            t = t + step;

        }

        sliderObject.value = t;

    }
}
