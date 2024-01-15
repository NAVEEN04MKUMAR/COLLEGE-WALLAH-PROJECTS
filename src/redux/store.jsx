
//configure store will helpful to the streamlin way to setup the redux store compare with manual(createstore)

import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/authslice';
import coursereducer from './slices/courseslice';


const store=configureStore({
   reducer: {
      auth:authReducer,
      course:coursereducer,
      //lecture:lectureSlice.reducer
   },
   devTools:true
});


export default store;
