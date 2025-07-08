import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {getAllArticlesReducer,updateArticleReducer,deleteArticleReducer,creationArticleReducer} from './reducers/articlesReducers';
import {loginUserReducer,registerUserReducer} from './reducers/userReducer';
import {getRefMvmReducer,getQtStByRefReducer,creationMvmReducer,getAllMouvementsReducer,deleteMvmReducer,getAllMouvementsGraphiqueReducer} from './reducers/mvmReducer';
const middleware = [thunk];
const rootReducer = combineReducers({
  articles: getAllArticlesReducer, // Use meaningful key like 'allProducts'
  registerUserReducer:registerUserReducer,
  loginUserReducer:loginUserReducer, 
  creationArticleReducer:creationArticleReducer,
  getRefMvmReducer:getRefMvmReducer,
  getQtStByRefReducer:getQtStByRefReducer,
  creationMvmReducer:creationMvmReducer,
  mouvements:getAllMouvementsReducer,
  updateArticleReducer:updateArticleReducer,
  deleteArticleReducer:deleteArticleReducer,
  deleteMvmReducer:deleteMvmReducer,
  getAllMouvementsGraphiqueReducer:getAllMouvementsGraphiqueReducer});
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) :null;
const initialState = {
  loginUserReducer : {
    currentUser: currentUser}}
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
});
export default store;




