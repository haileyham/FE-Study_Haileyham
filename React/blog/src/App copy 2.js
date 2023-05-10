import logo from './logo.svg';
import './App.css';
//(참고) css파일 쓰려면 상단에서 import 'css 파일 경로'
import { useState } from 'react';
//밑에 useState 자동완성으로 생긴것

function App() {

  let post = '서울 맛집'; //자료 잠깐 저장할 땐 변수
  //react에서 자료 잠깐 저장할 땐 state써도 됨
  let [a, b] = useState('코트 추천')
  //State 사용법(자료 잠깐 저장)
  //1. import{useState}
  //2. useState(보관할자료)
  //3. let[작명, 작명]  : 사용하고 싶을 때 형식맞춰서 쓰면 됨
  // a 는 state에 보관했던 자료 나옴 {a} 이런식으로
  // b 는 state 변경 도와주는 함수

  //왜 state 써야 함?
  //변수 변경 됐을 때
  //state는 쓰던 html 자동 변경 (state쓰던 html은 자동 재렌더링됨)
  //변동시 자동으로 html에 반영되게 만들고 싶을 때 state사용

  //자주변경될 것 같은 데이터들은 state에 저장했다가 html에 {데이터바인딩} 해놓으십시오
  // 1. 변경할 일이 없는 데이터들
  // 2. 굳이 html에 표기가 필요없는 데이터들은 그냥 변수에 저장해도 됩니다. 

  let [글제목, c] = useState(['코트 추천','오늘의 하루','행복해지기'])
  //c로 하는 이유는 위에서 a,b각각 되어있기 때문에 안됨;
  //array로 만들어서 사용 가능



  //참고 JS에 Destructuring문법
  //let num = [1,2];  / num에 1,2 보관 / 1,2를 유용해서 변수로 빼고 싶을 때는
  //let a = num[0]; //a를 num의 0번째 인덱스로 해주세요 / a는 1 됨
  //let c = num[1]; //c를 num의 1번째 인덱스로 해주세요 / c는 2 됨
  //이걸 편하게 쓰기 위해서는 
  //let [a,c] = [1, 2]; / 이러면 a라는 변수는 1되고, c라는 변수는 2됨
  //이걸 destructuring 문법이라고 함 : array 안에 있던 자료들을 각각 변수로 빼주는 것임
  //위에서 useState('코트 추천') 여기에서도 [?,?] 남음 / ['코트 추천',함수]이렇게 남아서 위에처럼 쓸 수 있는 것임.


  return (
    <div className="App">
      <div className="black-nav">
        <div>ReactBlog</div>
      </div>
      <div className="list">
        <h4>{글제목[0]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[2]}</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
