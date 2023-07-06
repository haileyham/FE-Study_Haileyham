import { createSlice } from '@reduxjs/toolkit'

let user5 = createSlice({
  name: 'user55',
  initialState: [{ id: 0, name: 'count', count: 1 }],
  reducers: {
    addCount5(state, action) { //첫번째 파라미터 : 기존 state 받아옴 / 두번째 파라미터 : 아규먼트타고 슝슝 받아옴
      state[action.payload].count++ //버튼 누를때마다 기존state 배열의 [입력받은값이 index 몇번째~]의 count를 하나씩 증가
    },
    subCount5(state, action) {
      state[action.payload].count--
    }
  }
})


export let { addCount5, subCount5 } = user5.actions //변경함수 사용할 수 있도록 export

export { user5 } //store.js 의 configureStore에 등록하기 위해서 export