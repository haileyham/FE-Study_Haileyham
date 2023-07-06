import { useSelector, useDispatch } from "react-redux"
import { changeName, changeName2, changeAge2, changeChange3, addCount4 } from "./store/userSlice";
import { addCount5, subCount5 } from "./store/user5Slice";

function App() {

  let a = useSelector((state) => { return state })//configureStore에 등록되어있는 state들 가져옴
  //useSelector에 따라서 state 변경될때마다 재렌더링 여부, 성능개선 가능
  let b = useSelector((state) => { return state.userStore5 })
  console.log(a); //{userCon: 'hailey'}
  console.log(a.userStore); //hailey

  console.log(a.userStore2);
  console.log(a.userStore3);
  console.log(a.userStore4[0]);
  console.log(b[0]);

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
      <h1>{a.userStore4[0].count}</h1>
      <button onClick={() => { dispatch(addCount4(0)) }}>count +1
      </button>
      <h2>{b[0].count}</h2>
      <button onClick={() => { dispatch(addCount5(0)) }}>count +1
      </button>
      <button onClick={() => { dispatch(subCount5(0)) }}>count -1
      </button>
    </div>
  );
}
export default App;
