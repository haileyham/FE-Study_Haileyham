import { createSlice } from '@reduxjs/toolkit'

let user5 = createSlice({
  name: 'user55',
  initialState: [{ id: 0, name: 'count', count: 1 }],
  reducers: {
    addCount5(state, action) {
      state[action.payload].count++
    },
    subCount5(state, action) {
      state[action.payload].count--
    }
  }
})


export let { addCount5, subCount5 } = user5.actions

export { user5 }