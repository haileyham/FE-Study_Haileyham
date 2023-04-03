// [함수 선언문]
// unction 키워드 다음에 오는 식별자로 함수를 호출.
function 식별자(){}

function gugudan(){
  for(let i = 1; i<=0; i++){
    console.log(`3 * ${i} = ${3 * i}`);
  }
}

// 함수 실행
// 함수명();
gugudan();





// [함수 표현식]
//함수는 객체에서 파생된 자료형. JS에서 자료형은 변수에 할당할 수 있어야 함. 따라서 함수도 변수에 할당 가능하고 이를 이용한 함수 정의 방법.
// 함수 선언문과 다르게 function 키워드 다음에 오는 식별자로 함수를 호출하지 않고, 할당한 변수명으로 호출. 
const gugudan = function(){}; //익명 함수
const gugudan = function 식별자(){}; //네이밍 함수

const gugudan = function gugudan(){
  for(let i = 1; i<=0; i++){
    console.log(`3 * ${i} = ${3 * i}`);
  }
}
gugudan(); //함수호출


//주의할 점
const gugudan = function (){
  for(let i = 1; i<=0; i++){
    console.log(`3 * ${i} = ${3 * i}`);
  }
}
gugudan(); //함수 호출 문제 없음

const gugudan = function naming(){
  for(let i = 1; i<=0; i++){
    console.log(`3 * ${i} = ${3 * i}`);
  }
}
naming(); //함수 호출 > ReferenceError : naming is not defined
// naming 변수가 정이되지 않았다는 참조 오류 발생. 함수표현식으로 함수를 정의할 때는 function 키워드 다음에 오는 식별자가 아니라 변수명으로 호출해야 함.
// 함수 표현식으로 함수를 정의할 경우 const 주로 사용. 보통 함수는 일관된 목적을 가진 코드 집합이라서 재정의, 재할당해서는 안 되는 경우가 많기 때문.





// [화살표 함수]
//화살표 함수는 익명 함수로만 정의. 호출하려면 정의된 함수를 변수에 할당하는 방법인 함수 표현식을 사용.

() => {};

const gugudan = () => {
  for(let i = 1; i<=0; i++){
    console.log(`3 * ${i} = ${3 * i}`);
  }
}
gugudan(); 
