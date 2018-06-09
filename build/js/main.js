"use strict";

var hentData = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:

                        // definér data
                        data = FooBar.getData();

                        // omdan output/string om til JSON format
                        jsonData = JSON.parse(data);

                        // Definér KØ antal
                        queueData = jsonData.queue.length;

                        // Definér SERVING antal
                        servingData = jsonData.serving.length;

                        console.log("In queue", queueData);
                        console.log("In Service", servingData);

                        // find DOM elementer til modtager og template elementer


                        // udvælg data der skal ind i DOM'en

                        // find 


                        // prop data ud i DOM'en og Kald pågældende funktioner
                        propUdData();
                        circleStyling();

                    case 8:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function hentData() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// globale variabler

var data = void 0;
var jsonData = void 0;
var queueData = void 0;

;

function circleStyling() {

    // find circle 1
    var circle1 = document.querySelector(".circle1");

    // lav condition til skift farve på cirkel 1
    if (queueData < 5) {
        circle1.style.background = "#87ab66";
    } else if (queueData < 10) {
        circle1.style.background = "#e79d3f";
    } else if (queueData < 15) {
        circle1.style.background = "#d94d4d";
    }

    // find circle 2
    var circle2 = document.querySelector(".circle2");

    // lav condition til skift farve på cirkel 2
    if (servingData < 2) {
        circle2.style.background = "#d94d4d";
    } else if (servingData < 3) {
        circle2.style.background = "#e79d3f";
    } else if (servingData < 4) {
        circle2.style.background = "#87ab66";
    }
};

// Funktion til Antal i KØ
function propUdData() {
    document.querySelector("#queue .queueAmount").textContent = queueData;
    document.querySelector("#serving .servingAmount").textContent = servingData;
};

// sæt interval
window.setInterval(hentData, 2000);
hentData();
