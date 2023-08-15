"use strict";

document.querySelectorAll("input").forEach(function (input) {
  input.addEventListener("invalid", function () {
    // 검증 후 폼 요소에 was-validated 클래스로 표시해 둔다
    document.forms[0].classList.add("was-validated");
  });
});
var validityMessage = {
  badInput: "잘못된 입력입니다.",
  patternMismatch: "패턴에 맞게 입력하세요",
  rangeOverflow: "범위를 초과하였습니다",
  rangeUnderflow: "범위에 미달하였습니다",
  stepMismatch: "간격에 맞게 입력하세요",
  tooLong: "최대 글자 미만으로 입력하세요",
  tooShort: "최소 글자 미만으로 입력하세요",
  typeMismatch: "형식에 맞게 입력하세요",
  valueMissing: "이 필드를 반드시 입력하세요"
}; // validity 객체를 받아 메세지 맵에서 오류 메세지를 찾는다

function getMessage(validity) {
  for (var key in validityMessage) {
    if (validity[key]) {
      return validityMessage[key];
    }
  }
}

function showError(input) {
  input.setCustomValidity(getMessage(input.validity) || "");
}

input.addEventListener("invalid", function () {
  showError(input);
});
//# sourceMappingURL=form.dev.js.map
