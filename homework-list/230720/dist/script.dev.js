"use strict";

{
  (function () {
    var tags = document.querySelectorAll("#tags > ul > li");

    var _loop = function _loop(i) {
      tags[i].addEventListener("click", function () {
        tags[i].classList.toggle("checked");
      });
    };

    for (var i = 0; i < tags.length; i++) {
      _loop(i);
    }
  })();
}
//# sourceMappingURL=script.dev.js.map
