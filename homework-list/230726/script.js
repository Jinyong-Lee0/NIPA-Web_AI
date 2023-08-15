// 요구사항
// - this. 를 안 붙이면 reference Error가 뜬다. 위에 선언을 했음에도 불구하고 왜 에러가 뜨는지 원인 찾아보기

var person = {
    name: "홍길동", // 이름 프로퍼티를 정의함.
    birthday: "030219", // 생년월일 프로퍼티를 정의함.
    age: 30,
    pId: "1234567", // 개인 id 프로퍼티를 정의함.
    fullId: function (birthday, pId) {
        // 생년월일과 개인 id를 합쳐서 주민등록번호를 반환함.
        return birthday + pId;
    },
};

console.log(person.fullId("030219", "1234567"));

// 파악된 사항
// 1. object 내 함수(= 메서드)는 자신이 속한 함수블럭( = function() {} )만 바라볼 수 있다. 즉, person이 가지고 있는 birthday, pId를 가져올 수 없다.
// 2. 그러나 this를 사용하게 되면 자신을 호출한 객체의 값을 가져오게 된다. 즉, person의 값에서 birthday라는 변수를 가져오게 되는 것이다.
// 3. function() { return birthday + pId } 라는 형태로 사용하고자 한다면, function(birthday, pId) {return birthday + pId} 형태가 되어야 맞다.
// 참고 링크 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Working_with_objects#%EC%83%9D%EC%84%B1%EC%9E%90_%ED%95%A8%EC%88%98_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
