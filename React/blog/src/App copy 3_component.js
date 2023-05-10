import "./App.css";
import { useState } from "react";

function App() {
  let [글제목, 글제목변경] = useState([
    "남자코트 추천",
    "강남 우동맛집",
    "파이썬 독학",
  ]);
  /*
  [state변경함수 특징]
  - 기존state == 신규state 의 경우 변경을 하지 않음.
  */
  let [따봉, 따봉변경] = useState(0);
  let [modal, setModal] = useState(false);//형식은 자유 모달창상태만 표현하면 됨. 0,1, 보임닫힘 등..

  function 따봉실행함수() {
    따봉변경(따봉 + 1);
  }

  function Modal() {//컴포넌트
    return (
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    );
  }

  return (
    //return() 안에 두개의 html 태그 나란히 적기 안됨. return()내부는 하나의 태그로 시작해서 하나의 태그로 끝나야함. 그래서 굳이 <div>두개를 나란히 적고 싶다면, <div>로 한번 더 감싸줘야함. 의미없는 div쓰기 싫으면 <></>이걸로 감싸도 됨. = fragment문법------------------------------
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button
        onClick={() => {
          // 글제목[0] = '여자코트 추천'  / 이렇게 코드를 짤 경우 영구적으로 수정해버림. (참고) array/object다룰 때는 원본데이터 보존하는게 좋음
          let copy = [...글제목]; //그냥 글제목하면 한개만 가져온거임.
          글제목변경(copy); //
        }}
      >
        글수정
      </button>

      <div className="list">
        <h4>
          {글제목[0]} <span onClick={따봉실행함수}>👍</span>
          {따봉}
        </h4>
        {/* 따봉실행함수로 따봉변경하면 따봉도 재랜더링됨. 변수가 아니기때문 */}
        {/* <h4>{글제목[0]} <span onClick={()=>{따봉변경(따봉+1)}}>👍</span>{따봉}</h4> //함수 바로 사용해도 상관없음*/}
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        {/* <h4 onClick={()=>{modal === false ? setModal(true) : setModal(false)}}>{글제목[2]}</h4> */}
        {/* 위에처럼 짤 수도 있지만 밑에가 더 간단...후 */}
        <h4 onClick={()=>{setModal(!modal)}}>{글제목[2]}</h4>
        {/* 이렇게 생각하려고 노력하자!!! */}
        <p>2월 17일 발행</p>
      </div>


      {
        modal === true ? <Modal></Modal> : null
      }
      {/* {modal && <Modal/>} */}
      {/* wow && 연산자로도 가능하네 */}
      {/* 중괄호안에는 if문 쓸 수 없음. HTML적는 것이기 때문에. 문은 불가하고 값만 가능해서 삼항연산자 씀. */}
      {/* //null은 비어있는 html용으로 자주사용 */}
      {/* 조건부인데 왜 계속 떠있지 했는데...밑에 Modal 해놨었음 */}

      {/* 리액트에서 동적인 UI 만드는 step
      1. html css로 미리 UI 디자인을 다 해놓고
      2. UI의 현재 상태를 state로 저장해두고
      3. state에 따라서 UI가 어떻게 보일지 조건문 등으로 작성 */}


      {/* <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div> */}

      {/* <Modal></Modal> */}

      {/* state가 true면 보여주셈 */}
      {/* Component 문법------------------------------
        return() 내부에 html코드 짤 때 코드가 길어지기 때문에 한단어로 깔끔하게 치환해서 넣을 수 있는 문법 제공 = Component
        이를 이용하면 함수,변수 만들 듯이 HTML을 깔끔하게 한 단어로 치환하여 원하는 곳에 넣을 수 있음. 밑의 HTML과 <Modal/>은 같은 것임. 
        
        줄이는 법은
        1. function을 이용해서 함수를 하나 만들어주고 작명합니다. 
        2. 그 함수 안에 return () 안에 축약을 원하는 HTML을 담으면 됩니다.
        3. 그럼 원하는 곳에서 <함수명></함수명> 사용하면 아까 축약한 HTML이 등장합니다.
        > 이렇게 축약한 HTML 덩어리를 Component라고 부름.


        [Component 만들 때 주의점 ]
        1. component 작명할 땐 영어대문자로 보통 작명합니다.
        2. return () 안엔 html 태그들이 평행하게 여러개 들어갈 수 없습니다.
        3. function App(){} 내부에서 만들면 안됩니다. 왜냐면 function App(){} 이것도 다시보니 컴포넌트 생성문법이죠? component 안에 component 를 만들진 않습니다. 
        4. <컴포넌트></컴포넌트> 이렇게 써도 되고 <컴포넌트/> 이렇게 써도 됩니다. 


        [arrow function 써도 됩니다]
        function Modal(){
          return ( <div></div> )
        }

        let Modal = () => {
          return ( <div></div>) 
        }

        
        [어떤 HTML들을 Component 만드는게 좋을까]
        기준은 없습니다만 관습적으로 어떤 부분을 주로 Component화 하냐면
        - 사이트에 반복해서 출현하는 HTML 덩어리들은 Component로 만들면 좋습니다.
        - 내용이 매우 자주 변경될 것 같은 HTML 부분을 잘라서 Component로 만들면 좋습니다.
        - 다른 페이지를 만들고 싶다면 그 페이지의 HTML 내용을 하나의 Component로 만드는게 좋습니다.
        - 또는 다른 팀원과 협업할 때 웹페이지를 Component 단위로 나눠서 작업을 분배하기도 합니다. 

        (함수문법 언제씁니까)
        1. 긴 코드 축약할 때 2. 다른 곳에서 코드 재사용할 때 3. 복잡한 코드를 작은 기능으로 나눌 때 쓰지 않습니까 
        컴포넌트는 그냥 함수 문법이랑 똑같아서 용도도 똑같습니다. 


        [Component의 단점]

        일단 HTML 깔끔하게 쓰려고 Component를 수백개 만들면 그것 만으로도 관리가 힘듭니다. 예를 들어서 function Modal 안에서 글제목 state를 쓰고싶어서 {글제목} 이렇게 쓰면 잘 안되는데 왜냐면 당연히 자바스크립트에선 한 function 안에 있는 변수를 다른 function에서 맘대로 쓸 수 없어서 그렇습니다.(A함수에 있는 변수는 B에서 맘대로 가져다 쓸 수 없듯) props라는 문법을 이용해 state를 <Modal>까지 전해줘야 비로소 사용가능합니다.

        props를 배우진 않았지만 듣기만 해도 귀찮죠?
        > 그러니까 리액트 갓 배운 초보처럼 막 온갖 잡다한걸 Component로 쪼개지 말고 꼭 필요한 곳만 Component로 쪼개시길 바랍니다.
        */}
    </div>
  );
}
export default App;
