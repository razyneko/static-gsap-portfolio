const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;
function flattenPointer() {
    let xScale = 1, yScale = 1;
    let xPrev = 0, yPrev = 0;
    let lastTime = performance.now()

    window.addEventListener('mousemove', function(dets) {
        clearTimeout(timeout);

        const currentTime = performance.now()
        const timeDiff = currentTime - lastTime;
        lastTime = currentTime;

        const xDiff = dets.clientX - xPrev;
        const yDiff = dets.clientY - yPrev;

        const speed = Math.sqrt(xDiff*xDiff + yDiff*yDiff) / timeDiff;

        xScale = gsap.utils.clamp(0.8, 1.2, Math.abs(xDiff) / 10);
        yScale = gsap.utils.clamp(0.8, 1.2, Math.abs(yDiff) / 10);

        xPrev = dets.clientX;
        yPrev = dets.clientY;

        const pointer = document.querySelector('#pointer-circle');
        pointer.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`;

        const distanceToTop = dets.clientY;
        const opacityThreshold = 10;
        const speedFactor = 3;
        const adjustedOpacity = gsap.utils.clamp(0, 1, 1 - (speed * speedFactor) - (opacityThreshold - distanceToTop) / opacityThreshold);

       gsap.to(pointer, {
            opacity: adjustedOpacity,
            ease: Power3.easeOut, // For smoothness
        });
        
        timeout = setTimeout(() => {
            pointer.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
            xScale = 1;
            yScale = 1;
        }, 100);

       
    });
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

document.querySelectorAll(".org")
.forEach(function (elem){
    var rotate = 0;
    var diffRot = 0;
    elem.addEventListener("mousemove", function(dets){
        
        var imgDist = dets.clientY - elem.getBoundingClientRect().top
        diffRot = dets.clientX - rotate;
        rotate = dets.clientX;
        
       
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease:Power3,  // for smoothness
            top: imgDist - 130,
            left: dets.clientX,
            rotate:  gsap.utils.clamp(-20,20,diffRot*0.4),

        })
      
    })

    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease:Power3,  // for smoothness
        })
      
    })
});

heroAnimation();
flattenPointer();