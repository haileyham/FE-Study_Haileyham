import { createSlice } from '@reduxjs/toolkit'

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
      state.age += action.payload
    }
  }
})

let user4 = createSlice({
  name: 'user44',
  initialState: [{ id: 0, name: 'White and Black', count: 2 }],
  reducers: {
    addCount4(state, action) {
      state[action.payload].count++
    }
  }
})

export let { changeName } = user.actions
export let { changeName2, changeAge2 } = user2.actions
export let { changeChange3 } = user3.actions
export let { addCount4 } = user4.actions

export { user, user2, user3, user4 }//아까는 store한 파일에서 관리했는데, 지금은 export해서 store.js 파일에 변수들 연결해줘야함