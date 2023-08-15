//HTML 태그 이름을 이용한 선택
console.log("aaa");
var selectedItem = document.getElementsByTagName("li"); // 모든 <li> 요소를 선택함.
console.log(selectedItem);
console.log(selectedItem.length);
for (var i = 0; i < selectedItem.length; i++) {
    selectedItem.item(i).style.color = "red"; // 선택된 모든 요소의 텍스트 색상을 변경함.
    console.log(selectedItem.item(i));
}
