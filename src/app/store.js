import { configureStore } from '@reduxjs/toolkit'
import wearherSlice from '../features/counter/counter'

export default configureStore({
  reducer: {weather: wearherSlice},
})