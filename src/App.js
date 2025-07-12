import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import React,{ useEffect }  from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import CreationArticle from './screens/CreationArticle';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Menuscreen from './screens/menuscreen';
import CreationMvm from './screens/CreationMvm';
import MenuImportation from './screens/menuImportation';
import Importcsv from './screens/importCsv.js';
import ImportExcel from './screens/importExcel';
import ExportModule from './screens/ExportModule';
import Statistique from './screens/statistique';
import ListArticles from './screens/listArticle';
import ListMvm from './screens/listMvm';

const AppContent = () => {
  const location = useLocation();  
  const isLoginScreen = location.pathname === '/';
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const expiry = decoded.exp * 1000;
      const now = Date.now();  
      if (now >= expiry) {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        window.location.href = '/';
      } else {
        const timeout = expiry - now;
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          window.location.href = '/';
        }, timeout);
      }
    }
  }, []);  
  return (
    <div className="App">
   {!isLoginScreen && <Navbar />}
      <Routes>
      <Route path='/' element={<Loginscreen />} />
        <Route path='/register' element={<Registerscreen />} />
      <Route path='/menu' element={
          <ProtectedRoute><Menuscreen /></ProtectedRoute>} />
        <Route path='/menuImportation' element={
          <ProtectedRoute><MenuImportation /></ProtectedRoute>} />
        <Route path='/csv' element={
          <ProtectedRoute><Importcsv /></ProtectedRoute>} />
        <Route path='/excel' element={
          <ProtectedRoute><ImportExcel /></ProtectedRoute>} />
        <Route path='/ExportModule' element={
          <ProtectedRoute><ExportModule /></ProtectedRoute>} />
        <Route path='/creationArticle' element={
          <ProtectedRoute><CreationArticle /></ProtectedRoute>} />
        <Route path='/creationMvm' element={
          <ProtectedRoute><CreationMvm /></ProtectedRoute>} />
        <Route path='/listArticle' element={
          <ProtectedRoute><ListArticles /></ProtectedRoute>} />
        <Route path='/listMvm' element={
          <ProtectedRoute><ListMvm /></ProtectedRoute>} />
  {currentUser.TYPUSR === 'admin' &&
        <Route path='/statistique' element={
          <ProtectedRoute><Statistique /></ProtectedRoute>}/>  }       
      </Routes>    
    </div>);}
const App = () =>{
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>);}
export default App;
