import "./App.css";
import { useState } from "react";

function App() {
  let [글제목, 글제목변경] = useState([
    "남자코트 추천",
    "강남 우동맛집",
    "파이썬 독학",
  ]);

  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  // 현재 UI 상태를 state에 저장해둠 0이면 0번째보이도록 1이면 1번째보이도록
  // 밑에 function Modal(props){}안에 let[title]만들수도있지만 상위컴포넌트에서도 쓸수있기 때문에 
  // [중요] state 만드는 곳은 state 사용하는 컴포넌트들 중 최상위 컴포넌트에 만들기(헷갈리면 그냥 App에 만드샴)

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button
        onClick={() => {
          let copy = [...글제목];
          글제목변경(copy);
        }}
      >
        글수정
      </button>


      {[...글제목].map(function (a,i) {
        return ( 
          <div className="list" key={i}>
            <h4 onClick={() => {setModal(!modal); setTitle(i)}}>
              {글제목[i]}
              <span onClick={()=>{
                let copy = [...따봉];
                copy[i] = copy[i] + 1;
                따봉변경(copy) 
              }}>👍</span>{따봉[i]} 
            </h4> 
            <p>2월 17일 발행</p>
          </div>
        );
      })}

      {modal === true ? <Modal color={'pink'} 작명={글제목} 글제목변경={글제목변경} title={title} ></Modal> : null}
      {/* props로 보내서 색상 변경도 가능 */}
    </div>    
  );

      /*
  props로 부모 -> 자식 state 전송하는 법 
  2개의 step을 따라주시면 됩니다.
  1. 자식컴포넌트 사용하는 곳에 가서 <자식컴포넌트 작명={state이름} /> 
  2. 자식컴포넌트 만드는 function으로 가서 props라는 파라미터 등록 후 props.작명 사용

  (참고1) props는 <Modal 이런거={이런거}  저런거={저런거}> 이렇게 10개 100개 1000개 무한히 전송이 가능합니다.
  (참고2) 꼭 state만 전송할 수 있는건 아닙니다. 
  <Modal 글제목={변수명}> 일반 변수, 함수 전송도 가능하고 
  <Modal 글제목="강남우동맛집"> 일반 문자전송은 중괄호 없이 이렇게 해도 됩니다.

  ▲ 자식 → 부모 패륜방향 전송은 불가능합니다.
  ▲ 옆집 컴포넌트로의 불륜전송도 불가능합니다. 

  props는 함수 파라미터 문법이랑 똑같습니다
*/
  function Modal(props) {
    return (
      <div className="modal" style={{background: props.color}}> 
      {/* style={{background:'skyblue'}} 일일이 해도 되지만, props로 받아서 색상 변경도 편함
      전송은 다 Modal에다가 넣음(근데 삼항연산자로했으니 거기에다가)*/}
        {/* <h4>{props.작명[0]}</h4> 
        이렇게 하면 0번째만 계속보임*/}
        <h4>{ props.작명[props.title] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={()=>{ props.글제목변경(["여자코트 추천","강남 우동맛집","파이썬 독학"])}}>글수정</button>
        {/* 이렇게하면 하드코딩이기때문에 해당사항마다 바꿀수있도록 다시짜기 */}
      </div>
    );
  }
}
export default App;
