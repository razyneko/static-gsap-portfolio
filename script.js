const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function flattenPointer() {
    //scaleX and scaleY should be less than 1 to flatten in x or y
    //define default scal evalue
    var xScale = 1
    var yScale = 1

    var xPrev = 0;
    var yPrev = 0;

    window.addEventListener('mousemove', function(dets){
        clearTimeout(timeout);
        var xDiff = dets.clientX - xPrev;
        var yDiff = dets.clientY - yPrev
       
        // to convert scale between 0.8 and 1.2 use gsap.utils.clamp()
        
        xScale = gsap.utils.clamp(0.8,1.2, xDiff)
        yScale = gsap.utils.clamp(0.8,1.2, yDiff)

        xPrev = dets.clientX
        yPrev = dets.clientY

        pointerFollower(xScale, yScale);
        timeout = setTimeout(function(){
             document.querySelector('#pointer-circle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
             xScale = 1
             yScale = 1
        }, 100)
    });
}
function pointerFollower(xScale, yScale) {
    window.addEventListener("mousemove", function(dets) {
        document.querySelector('#pointer-circle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`

    })
}

function heroAnimation() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.2,
        ease: Expo.easeInOut
    })

    .to(".bound-elem" , {
        y: 0,
        ease: Expo.easeInOut,
        delay: -1.3,
        duration: 2,
        stagger: .2
    })

    .from("#hero-footer", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

pointerFollower();
heroAnimation();
flattenPointer();