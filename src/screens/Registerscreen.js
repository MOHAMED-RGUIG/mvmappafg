import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../actions/userActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';
import { Link } from 'react-router-dom'
export default function Registerscreen() {
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [cpassword,setcpassword] = useState('')
    const registerstate = useSelector(state=>state.registerUserReducer)
    const userstate = useSelector(state => state.loginUserReducer);
    const { currentUser } = userstate;
    const { error , loading,success} = registerstate;
    const dispatch = useDispatch()
    function register(){
        if(password!==cpassword)
            {alert("passwords not matched")}
            else{
                const user={
                    name,
                    email,
                    password
                }
                console.log(user);
                dispatch(registerUser(user));}}
  return (
    <div className="login-page">
        <div className='row justify-content-center mt-5'>
        {loading && <Loading />}
        {success && <Success success="Utilisateur enregistré avec succès !" />}
        {error && <Error error={registerstate.error.message || 'Erreur lors de l’enregistrement'} />}
            <div className='col-md-7 col-10 text-start '>
                    <Link to={currentUser ? '/menu' : '/'}
                      className="btn20 btn-primary d-flex align-items-center justify-content-center"
                      style={{ width: '56px', height: '56px', borderRadius: '50%' }}
                    >
                      <i className="bi bi-arrow-left text-white" style={{ fontSize: '25px' }}></i>
                    </Link>
                     <h2 className="text-center mt-3 flex-grow-1 headerhomescreen">CRÉATION DU COMPTE</h2>
                <div>
                    <input required type='text' placeholder='name' className='form-control' 
                     value={name} onChange={(e)=>{setname(e.target.value)}}
                    />
                    <input required type='text' placeholder='email' className='form-control'
                     value={email} onChange={(e)=>{setemail(e.target.value)}}
                    />
                    <input required type='password' placeholder='password' className='form-control' 
                    value={password} onChange={(e)=>{setpassword(e.target.value)}}
                    />
                    <input required type='password' placeholder='confirm password' className='form-control'
                    value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}
                    />
                    <button onClick={register} className='btn5 mt-3 mb-2 col-12 col-md-12 w-100 h-2' style={{height:'50px'}}>VALIDER </button>
                    <br/>
                    <Link to='/' className='col-12 col-md-12 mx-auto text-center pt-4' 
                    style={{textDecoration: 'none',margin: '0 auto',color: '#183F7F',fontSize: '18px',whiteSpace: 'nowrap'}}>
                    <span className="bi bi-person-circle icon-home p-3 d-inline d-sm-inline d-md-inline d-lg-inline small"></span> 
                    <span className="d-inline d-sm-inline d-md-inline d-lg-inline small">Cliquer ici pour se connecter</span> </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
