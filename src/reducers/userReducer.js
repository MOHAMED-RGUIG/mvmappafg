export const registerUserReducer = (state={ loading: false, error: null}, action)=>{
    switch(action.type){
        case 'USER_REGISTER_REQUEST': return{
            ...state,
            loading :true
        }
        case 'USER_REGISTER_SUCCESS': return{
            loading :false,
            success:true,
            error: null
        }
        case 'USER_REGISTER_FAILED': return{
            ...state,
            loading :false,
            error:action.payload
        }
        default : return state
    }
}
export const loginUserReducer = (state = { currentUser: null }, action) => {
    switch (action.type) {
      case 'USER_LOGIN_REQUEST':
        return { loading: true };  
      case 'USER_LOGIN_SUCCESS':
        return {
          loading: false,
          success: true,
          currentUser: action.payload
        };  
      case 'USER_LOGIN_FAILED':
        return {
          loading: false,
          error: action.payload
        };  
      default:
        return state;
    }
  }; 