import { configureStore } from '@reduxjs/toolkit'
import { user, user2, user3, user4 } from './store/userSlice'
import { user5 } from './store/user5Slice'



export default configureStore({
  reducer: {
    userStore: user.reducer, //등록을 해주고 쓰고싶은 곳에서 import 해서 사용 / useSelector에서 받아오는 것이 여기에 등록된 것들
    userStore2: user2.reducer,
    userStore3: user3.reducer,
    userStore4: user4.reducer,
    userStore5: user5.reducer
  }
})