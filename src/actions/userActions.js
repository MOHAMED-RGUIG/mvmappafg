import axios from 'axios';
export const registerUser=(user) =>async dispatch=>{
    dispatch({type:'USER_REGISTER_REQUEST'})
try{
    const response = await axios.post('https://afgmvmapi2.onrender.com/api/users/register',user,{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    dispatch({type:'USER_REGISTER_SUCCESS'})
}catch(error){
    dispatch({type:'USER_REGISTER_FAILED',payload:error})
}
}

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: 'USER_LOGIN_REQUEST' });  
    try {
      const response = await axios.post('https://afgmvmapi2.onrender.com/api/users/login', user, {
        headers: { 'Content-Type': 'application/json' }
      });  
      const { token, currentUser } = response.data;  
      // Stocker dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));  
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: currentUser });  
      window.location.href = '/menu';  
    } catch (error) {
      dispatch({
        type: 'USER_LOGIN_FAILED',
        payload: error.response ? error.response.data.message : error.message
      });
    }
  };
  

/*Pour gérer la déconnexion des utilisateurs :
-on fait la supprresion des données depuis le stockage du navigateur (localstorage)
-se rederiger vers la page de connexion 
*/
export const logoutUser=()=>dispatch=>{
    localStorage.removeItem('currentUser')
    window.location.href='/'
}
