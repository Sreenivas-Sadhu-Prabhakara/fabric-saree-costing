/* Textile unit-costing calculator — logic. No dependencies, no network. */
(function () {
  "use strict";

  var byId = function (id) { return document.getElementById(id); };

  var cur = "INR";          // INR | PHP
  var unitMode = "metre";   // metre | piece

  var SYM = { INR: "₹", PHP: "₱" };     // ₹ / ₱
  var LOCALE = { INR: "en-IN", PHP: "en-PH" };
  var BANDS = [10, 20, 30, 40];

  function money(n) {
    if (!isFinite(n)) { n = 0; }
    try {
      return new Intl.NumberFormat(LOCALE[cur], {
        style: "currency", currency: cur,
        minimumFractionDigits: 2, maximumFractionDigits: 2
      }).format(n);
    } catch (e) {
      return SYM[cur] + n.toFixed(2);
    }
  }

  // Read a numeric field: empty/NaN -> 0; negatives clamped to 0.
  function val(id) {
    var el = byId(id);
    if (!el) { return 0; }
    var v = parseFloat(el.value);
    if (!isFinite(v)) { return 0; }
    if (v < 0) { v = 0; }
    return v;
  }

  function compute() {
    var warp = val("warp"), weft = val("weft"), rate = val("rate"), wastage = val("wastage");
    var dyeing = val("dyeing"), embroidery = val("embroidery");
    var labour = val("labour"), overhead = val("overhead"), margin = val("margin");

    var yarnCost = (warp + weft) / 1000 * rate;
    var wastageAmt = yarnCost * (wastage / 100);
    var yarnAfter = yarnCost + wastageAmt;               // yarnCost * (1 + wastage/100)
    var jobwork = dyeing + embroidery;
    var trueCost = yarnAfter + jobwork + labour + overhead;
    var marginAmt = trueCost * (margin / 100);
    var price = trueCost + marginAmt;                    // trueCost * (1 + margin/100)

    byId("r-yarn").textContent = money(yarnCost);
    byId("r-wastage").textContent = money(wastageAmt);
    byId("r-dyeing").textContent = money(dyeing);
    byId("r-embroidery").textContent = money(embroidery);
    byId("r-labour").textContent = money(labour);
    byId("r-overhead").textContent = money(overhead);
    byId("r-truecost").textContent = money(trueCost);
    byId("r-margin").textContent = money(marginAmt);
    byId("r-price").textContent = money(price);

    byId("out-price").textContent = money(price);
    byId("out-sub").textContent =
      "true cost " + money(trueCost) + " · break-even " + money(trueCost);

    for (var i = 0; i < BANDS.length; i++) {
      var b = BANDS[i];
      byId("b-" + b).textContent = money(trueCost * (1 + b / 100));
      byId("band-" + b).className = (margin === b) ? "total" : "";
    }
  }

  function setCurrency(c) {
    cur = c;
    var btns = document.querySelectorAll("[data-cur]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-cur") === c ? "true" : "false");
    }
    var pres = document.querySelectorAll(".inp .pre");
    for (var j = 0; j < pres.length; j++) { pres[j].textContent = SYM[c]; }
    compute();
  }

  function setUnit(u) {
    unitMode = u;
    var btns = document.querySelectorAll("[data-unit]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-unit") === u ? "true" : "false");
    }
    byId("out-k").textContent = "Selling price per " + (u === "piece" ? "piece" : "metre");
    compute();
  }

  function wire() {
    var numbers = document.querySelectorAll('input[type="number"]');
    var i;
    for (i = 0; i < numbers.length; i++) {
      numbers[i].addEventListener("input", compute);
    }

    var curBtns = document.querySelectorAll("[data-cur]");
    for (i = 0; i < curBtns.length; i++) {
      (function (btn) {
        btn.addEventListener("click", function () { setCurrency(btn.getAttribute("data-cur")); });
      })(curBtns[i]);
    }

    var unitBtns = document.querySelectorAll("[data-unit]");
    for (i = 0; i < unitBtns.length; i++) {
      (function (btn) {
        btn.addEventListener("click", function () { setUnit(btn.getAttribute("data-unit")); });
      })(unitBtns[i]);
    }

    var printBtn = byId("print");
    if (printBtn) { printBtn.addEventListener("click", function () { window.print(); }); }

    var resetBtn = byId("reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        for (var k = 0; k < numbers.length; k++) { numbers[k].value = ""; }
        compute();
      });
    }

    setCurrency("INR");
    setUnit("metre");
    compute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
