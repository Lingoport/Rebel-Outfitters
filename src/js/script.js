console.log("js linked!");

var droidArray = droids;

$(document).ready(function () {
    loadDroids();

    // particlesJS.load('particles-js', 'plugins/assets/particlesjs-config.json', function() {
    //     console.log('callback - particles.js config loaded');
    // });

    $('.cartSlider').slideReveal({
        trigger: $('.cartIcon'),
        push: false,
        position: 'right'
    });

    //profile hover drop down
    $('.dropdown').hover(function() {
        console.log("hovering");
        $('.dropdown-content').slideToggle(100);
        $('.dropbtn').toggleClass('activeDrop');
    });

});

function loadDroids() {
    //build display grid from droid object array
    for (let cur of droidArray) {

        //iv to hold price text and symbol
        let priceBox = document.createElement("div");
        priceBox.classList.add("gridPrice");

        //create price element
        let price = document.createElement("h4");
        price.innerHTML = cur.price;

        //create symbol and set source
        let symbol = document.createElement("img");
        symbol.setAttribute("src", "img/bSymbol.svg");
        symbol.classList.add("symbol");

        //append to price box
        priceBox.appendChild(symbol);
        priceBox.appendChild(price);

        //create description box
        let title = document.createElement("h3");
        title.innerHTML = cur.title;

        let des = document.createElement("div");
        des.classList.add("gridDes");

        des.appendChild(title);
        des.appendChild(priceBox);

        let image = document.createElement("img");
        image.setAttribute("src", cur.imageURL);
        image.classList.add("gridImage");

        let gridBox = document.createElement("article");
        gridBox.appendChild(image);
        gridBox.appendChild(des);

        let container = document.getElementById("droidGrid");
        container.appendChild(gridBox);
    }
}

var partJson = {
    "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
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
particlesJS.load('particles-js', jsonUri, function() {
    console.log('callback - particles.js config loaded');
  });