const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);
let currentOffset = 0
let duration;
let strokeHSLColor;
let colorIncrement;
let currentHue;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
        strokeHSLColor = circle.getAttribute('stroke');
        colorIncrement = 180 / (duration * 100);
        currentHue = strokeHSLColor.split('(');
        currentHue = currentHue[1].split(',');
        currentHue = currentHue[0] - colorIncrement;
        circle.setAttribute('stroke', `hsl(${currentHue},100%,50%)`);
    },
    onComplete() {
        circle.setAttribute('stroke', 'hsl(180,100%,50%)');
    }
});