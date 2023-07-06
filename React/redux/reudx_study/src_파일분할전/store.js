import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user11',
  initialState: 'hailey',
  reducers: {
    changeName(state) {
      return 'ham'
    }
  }
})

let user2 = createSlice({
  name: 'user22',
  initialState: { name: 'hailey', age: 1 },
  reducers: {
    changeName2(state) {
      return { name: 'ham', age: 100 };
    },
    changeAge2(state) {
      state.age = 100000;
    }
  }
})

let user3 = createSlice({
  name: 'user33',
  initialState: { name: 'hellohello', age: 99 },
  reducers: {
    changeChange3(state, action) {
      state.age += action.payload //입력 받은 값으로 증가
    }
  }
})

export let { changeName } = user.actions
export let { changeName2, changeAge2 } = user2.actions
export let { changeChange3 } = user3.actions

export default configureStore({
  reducer: {
    userStore: user.reducer, //여기서 등록한 이름으로 useSelector에서 사용
    userStore2: user2.reducer,
    userStore3: user3.reducer
  }
})