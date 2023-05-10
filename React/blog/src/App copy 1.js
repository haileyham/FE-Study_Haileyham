import logo from './logo.svg';
import './App.css';
//(참고) css파일 쓰려면 상단에서 import 'css 파일 경로'

function App() {

  let post = '서울 맛집'; //서버에서 가져온 데이터라고 치부
  // document.querySelector('h4').innerHTML = post;  바닐라자바로 넣을때

  return (//밑의 div는 JSX //.js파일에서 쓰는 html 대용품/원래 리액트에서 div만드려면 React.createElement('div',null,'Hello World')해야함
    <div className="App"> 
      <div className="black-nav">
        <h4 style={{color:'pink', fontSize:'16px'}}>블로그</h4>
      </div>
      <h4>{post}</h4>
    </div>
  );
}
//JSX 문법1. class사용시 className 사용해야 함
//JSX 문법2. 변수 넣을 땐 {중괄호}  : 데이터 바인딩
//<h4>블로그글 제목</h4> 블로그글 제목으로 만들고 싶음 / 실제서비스면 서버에서 가져와서 보여줘야함 / let post 변수를 서버에서 가져온 데이터라고 가정하고 {post} 넣으면 가져옴.
//id={post}해도됨. 어디든 쓸 수 있음 > id = "서울 맛집"; 이렇게 됨
//JSX 문법3. style 넣을 땐 style={}
//style={{color:'pink', fontSize:'16px'}} 원래 style="color:pink;"이런식인데 {}중괄호안에 객체형식으로 집어넣음. 
//style ={{스타일명:'값'}}

export default App;
