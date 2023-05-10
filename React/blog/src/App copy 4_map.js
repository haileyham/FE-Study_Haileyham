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

  // function 따봉실행함수() {
  //   따봉변경(따봉 + 1);
  // }

  function Modal() {
    return (
      <div className="modal">
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    );
  }

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

      {/* <div className="list">
        <h4>
          {글제목[0]} <span onClick={따봉실행함수}>👍</span>
          {따봉}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={() => {
            setModal(!modal);
          }}> {글제목[2]}
        </h4>
        <p>2월 17일 발행</p>
      </div> */}


      {/* 비슷한 html 반복생성하려면 map()쓰면 됨 */}
      {[...글제목].map(function (a,i) {//글제목 length만큼 돌고, a는 글제목 하나하나고, i는 글제목의 index임(반복문돌때마다 0부터 1씩 증가하는 정수)
        return ( //return 안에 있는 것을 array로 담아줌
          <div className="list" key={i}>
            <h4 onClick={() => {setModal(!modal);}}>
              {글제목[i]} {글제목[0]} 
              <span onClick={()=>{
                let copy = [...따봉];
                copy[i] = copy[i] + 1; //각 index 들어감
                따봉변경(copy) //1씩 더해준 값들 따봉변경으로 useState들어감
              }}>👍</span>{따봉[i]} 
            </h4> 
            {/* {글제목[i]}대신에 <h4>{a}</h4> 해도됨 */}
            {/* 따봉 각각 올리기위해서 */}
            <p>2월 17일 발행</p>
          </div>
        );
      })}

      {modal === true ? <Modal></Modal> : null}
      {/* {modal && <Modal/>} */}
    </div>
  );
}
export default App;
