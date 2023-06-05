import { useSelector, useDispatch } from "react-redux"
import { changeName, changeName2, changeAge2, changeChange3 } from "./store";

function App() {

  let a = useSelector((state) => { return state })//configureStore에 등록되어있는 state들 가져옴
  console.log(a); //{userCon: 'hailey'}
  console.log(a.userStore); //hailey

  console.log(a.userStore2);
  console.log(a.userStore3);

  let dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => { dispatch(changeName()) }}>이름 바꿩~
      </button>
      <button onClick={() => { dispatch(changeName2()) }}>이름이랑 나이 바꿩~
      </button>
      <button onClick={() => { dispatch(changeAge2()) }}>나이 바꿩~
      </button>
      <button onClick={() => { dispatch(changeChange3(20)) }}>나이 원하는값으로 더해주기 바꿩~
      </button>
    </div>
  );
}
export default App;
