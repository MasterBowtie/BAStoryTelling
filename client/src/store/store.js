
import { configureStore } from '@reduxjs/toolkit'
import { applicationReducer } from './application_slice'

export default configureStore({
  reducer: {
    application: applicationReducer,
  },
})