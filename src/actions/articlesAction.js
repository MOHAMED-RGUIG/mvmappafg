import axios from 'axios';
export const getAllArticles = () => async dispatch => {
    dispatch({ type: 'GET_ARTICLES_REQUEST' });

    try {
        const response = await axios.get(`https://afgmvmapi2.onrender.com/api/articles/getallarticles`, {          
        });
        dispatch({ type: 'GET_ARTICLES_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_ARTICLES_FAILED', payload: error.message });
    }
};
export const creationArticle = ( title,quantitySt,unit,
  categorie,location,quantitySecurity,dispositionA,dispositionB,articleType,typeMachine,imagePath) => async (dispatch,
     getState) => {
  dispatch({ type: 'PLACE_CREATIONARTICLE_REQUEST' });
  const currentUser = getState().loginUserReducer.currentUser;
  try {
      const response = await axios.post('https://afgmvmapi2.onrender.com/api/articles/creationArticle', {  title ,quantitySt,unit,
      categorie,location,quantitySecurity,dispositionA,dispositionB,articleType,typeMachine,imagePath,currentUser});
      console.log(response);
      dispatch({ type: 'PLACE_CREATIONARTICLE_SUCCESS' });
  } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Network error';
      dispatch({ type: 'PLACE_CREATIONARTICLE_FAILED', payload: errorMessage });
  }
};

export const updateArticle = (idArticle,updatedData) => async (dispatch, getState) => {
    dispatch({ type: 'UPDATE_ARTICLE_REQUEST' });
    try {
        const response = await axios.put(
        `https://afgmvmapi2.onrender.com/api/articles/updatearticles/${idArticle}`,
        updatedData
      );  
      // Ajout des nouvelles données à l'état Redux
      const updatedArticle = response.data; 
      dispatch({
        type: 'UPDATE_ARTICLE_SUCCESS',
        payload: updatedArticle,
      }); 
      // Optionnel : mettre à jour la liste des articles dans le store
      const { articles } = getState();
      const updatedArticles = articles.map((article) =>
        article.idArticle === idArticle ? updatedArticle : article
      );  
      dispatch({
        type: 'SET_ARTICLES',
        payload: updatedArticles,
      });
    } catch (error) {
      dispatch({ type: 'UPDATE_ARTICLE_FAILED', payload: error.message });
    }
  };
export const deleteArticle = (idArticle) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_ARTICLE_REQUEST' });
    await axios.delete(`https://afgmvmapi2.onrender.com/api/articles/deletearticle/${idArticle}`);
    dispatch({ type: 'DELETE_ARTICLE_SUCCESS', payload: idArticle });
  } catch (error) {
    dispatch({
      type: 'DELETE_ARTICLE_FAILED',
      payload: error.response?.data?.message || error.message,
    });
  }
};

