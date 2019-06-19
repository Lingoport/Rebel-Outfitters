var partJson = {
    "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": false,
            "value_area": 1442.1574675714858
          }
        },
        "color": {
          "value": "#bffff1"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.8172225649571753,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.5,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "bubble"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 109.5503566472722,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "bubble": {
            "distance": 200,
            "size": 5,
            "duration": 1,
            "opacity": 0.4,
            "speed": 3
          },
          "repulse": {
            "distance": 113.60777726383783,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
};
var jsonUri = "data:text/plain;base64,"+window.btoa(JSON.stringify(partJson));
particlesJS.load('particles-js', jsonUri, afterParticlesLoaded);