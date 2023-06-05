import { configureStore } from '@reduxjs/toolkit'
import { user, user2, user3, user4 } from './store/userSlice'
import { user5 } from './store/user5Slice'



export default configureStore({
  reducer: {
    userStore: user.reducer,
    userStore2: user2.reducer,
    userStore3: user3.reducer,
    userStore4: user4.reducer,
    userStore5: user5.reducer
  }
})