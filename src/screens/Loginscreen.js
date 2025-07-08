import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';
import { Link } from 'react-router-dom';
export default function Loginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const loginstate = useSelector(state => state.loginUserReducer);
  const { loading, error,success } = loginstate;
  const dispatch = useDispatch();
  const login = () => {
    const user = { email, password };
    console.log('Login attempt:', user); // Log the login attempt
    dispatch(loginUser(user));}
  return (
    <div className="login-page col-lg-9 mx-auto">
          <div className='col-md-12 col-12  login-logo mx-auto'>
              <img src="./logo.png" alt="Afriqua gaz logo" /></div>  
      <div className='row justify-content-center col-md-7 col-10 col-lg-7 mx-auto'>
        <div className=' text-start mt-5'>
          <h2 className='text-center m-2 pb-4' style={{ fontSize: '30px'}}>Bienvenue !</h2>
          {loading && (<Loading />)}
          {success && <Success success="Utilisateur connecter avec succès !" />}
          {error && (<Error error='Nom dutilisateur ou mot de passe incorrect. Veuillez réessayer' />)}
          <div className='container mt-4'>
            <input required type='email' placeholder='Utilisateur' className='form-control'
              value={email} onChange={(e) => { setemail(e.target.value) }}/>
            <input required type='password' placeholder='Mot de passe' className='form-control'
              value={password} onChange={(e) => { setpassword(e.target.value) }}
            /><button onClick={login} className='btn5 mt-3 mb-2 col-12 col-md-12 w-100 h-2' style={{height:'50px'}}>SE CONNECTER </button> <br />
            <div className='col-12 col-md-12'>
            <Link to='/register' className='col-12 col-md-12 mx-auto text-center pt-4'  style={{textDecoration: 'none',
             margin: '0 auto',color: '#183F7F',fontSize: '18px',whiteSpace: 'nowrap'}}>
            <span className="bi bi-person-fill-add icon-home p-3 d-inline d-sm-inline d-md-inline d-lg-inline small"> 
            </span><span className="d-inline d-sm-inline d-md-inline d-lg-inline small">Cliquer ici pour s'enregistrer
            </span></Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*  
  first useEffect:
  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const userFromUrl = urlParams.get('user');

  if (userFromUrl) {
    const user = JSON.parse(decodeURIComponent(userFromUrl));
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '/menu'; // Rediriger vers la page d'accueil
  } else if (localStorage.getItem('currentUser')) {
    window.location.href = '/menu'; // Rediriger si déjà connecté
  }
}, []); */
/*second effect
 /* useEffect(() => {
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
      }, timeout);} }}, []);*/