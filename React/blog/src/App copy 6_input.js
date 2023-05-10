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
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      {[...글제목].map(function (a,i) {
        return ( 
          <div className="list" key={i}>
            <h4 onClick={() => {setModal(!modal); setTitle(i)}}>
              {글제목[i]}
              <span onClick={(e)=>{
                e.stopPropagation();
                let copy = [...따봉];
                copy[i] = copy[i] + 1;
                따봉변경(copy) 
              }}>👍</span>{따봉[i]} 
            </h4> 
            <p>2월 17일 발행</p>
          </div>
        );
      })}

      <input onChange={(e)=>{입력값변경(e.currentTarget.value); console.log(입력값)}} type="text" />
      {/* onChange / onInput 유저가 타이핑할때마다 실행 
      onMouseOver / onScroll  여러가지 이벤트핸들러 존재(서른개정도)
      <input>에 입력한 값 가져오는 법 e.currentTarget.value (e.currentTarget만쓰면 현재 이벤트 발생한 곳 보여줌)

      만약에 위의 span을 눌렀을때 실제로는 3개가 클릭이 되는데 span태그랑 h4랑 div 3개가 클릭됨. 그래서 span을 눌러도 모달창이 뜨는 것임. 왜냐고? 클릭이벤트는 상위 html로 퍼지기 때문. 이것을 '이벤트 버블링'이라고 함.
      >> 만약 이벤트버블링을 막고 싶으면, (e) 파라미터에 집어넣고, e.stopPropagation() 입력 
      
      입력값변경(e.currentTarget.value); console.log(입력값)
      useState값을 (e.currentTarget.value)input에 입력하는값으로 변경해주고, 변경된 입력값을 console.log로 출력
      
      [비동기처리]
      (정보) state 변경함수는 늦게처리됨(리액트 만든사람이...정함)
      그래서 실제로 input에 한글자 입력했을때는 console.log에 반영이안되고 2글자부터 출력되는데, 그 이유는 비동기처리(늦게처리)되기 때문임
      즉, 입력값변경(e.currentTarget.value); 이거 완료되기 전에
      console.log(입력값); 다음 줄을 먼저 실행해줌



      1. input에 뭐 입력하고 발행버튼누르면 블로그에 글이 하나 추가되는 기능을 만들어보십시오. 
      2. 글마다 옆에 삭제버튼 하나씩 만들어놓고 삭제버튼누르면 글이 없어지는 기능을 만들어보십시오.

      (힌트)
      - html 직접 만질 필요는 없습니다. 지금 글제목 state만 바꾸면 html도 알아서 바뀌지 않겠습니까 
      - array에 자료를 추가하거나 삭제하는 문법은 모르면 구글찾아봐야지 생각한다고 나오는 것은 아닙니다. 
      */}


      {modal === true ? <Modal color={'pink'} 작명={글제목} 글제목변경={글제목변경} title={title} ></Modal> : null}
    </div>    
  );

  function Modal(props) {
    return (
      <div className="modal" style={{background: props.color}}> 
        <h4>{ props.작명[props.title] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={()=>{ props.글제목변경(["여자코트 추천","강남 우동맛집","파이썬 독학"])}}>글수정</button>
      </div>
    );
  }
}
export default App;
