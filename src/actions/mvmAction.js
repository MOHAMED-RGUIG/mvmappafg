import axios from 'axios';
export const creationMvm = ( typeMvm,
    quantityMvm,referenceArticle,nOrdre) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_CREATEMVM_REQUEST' });
    const currentUser = getState().loginUserReducer.currentUser;
    try {
        const response = await axios.post('https://afgmvmapi2.onrender.com/api/mvm/creationMvm', {  typeMvm,
        quantityMvm,referenceArticle,nOrdre,currentUser});
        console.log(currentUser);
        console.log(response);
        dispatch({ type: 'PLACE_CREATEMVM_SUCCESS' });
        return Promise.resolve(response.data);
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network error';
        dispatch({ type: 'PLACE_CREATEMVM_FAILED', payload: errorMessage });
        return Promise.reject(error);
    }
};


export const getRefMvm= () => async (dispatch) => {
    dispatch({ type: 'GET_REFMVM_REQUEST' });

    try {
        const response = await axios.get(`https://afgmvmapi2.onrender.com/api/mvm/getRefMvm`, {
           
        });
        dispatch({ type: 'GET_REFMVM_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({
            type: 'GET_REFMVM_FAILED',
            payload: { message: error.message, code: error.code },
        });
    }
};

export const getQtStByRef = (reference) => async (dispatch) => {
    dispatch({ type: 'GET_QTSTBYREF_REQUEST' });

    try {
        const response = await axios.get(`https://afgmvmapi2.onrender.com/api/mvm/qtstbyref`, {
            params: { reference }, // Passer la référence comme paramètre
        });
        dispatch({ type: 'GET_QTSTBYREF_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({
            type: 'GET_QTSTBYREF_FAILED',
            payload: { message: error.message, code: error.code },
        });
    }
};
//////
export const getAllMouvements = () => async dispatch => {
    dispatch({ type: 'GET_MOUVEMENTS_REQUEST' });

    try {
        const response = await axios.get(`https://afgmvmapi2.onrender.com/api/mvm/getallmouvements`);
        dispatch({ type: 'GET_MOUVEMENTS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_MOUVEMENTS_FAILED', payload: error.message });
    }
};

export const getAllMouvementsGraphique = (reference = '') => async dispatch => {
  dispatch({ type: 'GET_MOUVEMENTS_REQUEST' });

  try {
      const response = await axios.get(`https://afgmvmapi2.onrender.com/api/mvm/getallmouvementsgraphique`, {
          params: { reference }, // Passer la référence comme paramètre
      });
      dispatch({ type: 'GET_MOUVEMENTS_SUCCESS', payload: response.data });
  } catch (error) {
      dispatch({ type: 'GET_MOUVEMENTS_FAILED', payload: error.message });
  }
};
/*
export const updateMvm = (idMvm, updatedData) => async (dispatch, getState) => { 
  dispatch({ type: 'UPDATE_MOUVEMENT_REQUEST' });

  try {
    const response = await axios.put(
      `https://afgmvmapi2.onrender.com/api/mvm/updatemouvements/${idMvm}`,
      updatedData
    );

    const updatedMvm = response.data;

    // Met à jour directement le mouvement modifié dans le store (pas besoin de SET_MOUVEMENTS)
    dispatch({
      type: 'UPDATE_MOUVEMENT_SUCCESS',
      payload: updatedMvm,
    });

    // Met à jour la quantité stock de l'article dans le store
    if (updatedMvm.quantityStFinal && updatedMvm.referenceArticle) {
      const { articles } = getState();
      const updatedArticles = articles.map((article) =>
        article.reference === updatedMvm.referenceArticle
          ? { ...article, quantitySt: updatedMvm.quantityStFinal }
          : article
      );

      dispatch({
        type: 'SET_ARTICLES',
        payload: updatedArticles,
      });
    }

  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    console.error("Erreur API updateMvm :", errorMsg);

    dispatch({
      type: 'UPDATE_MOUVEMENT_FAILED',
      payload: errorMsg,
    });
  }
};*/


export const deleteMvm = (idMvm) => async (dispatch) => {
    try {
      dispatch({ type: 'DELETE_MOUVEMENT_REQUEST' });
      await axios.delete(`https://afgmvmapi2.onrender.com/api/mvm/deletemouvement/${idMvm}`);
      dispatch({ type: 'DELETE_MOUVEMENT_SUCCESS', payload: idMvm });
    } catch (error) {
      dispatch({
        type: 'DELETE_MOUVEMENT_FAILED',
        payload: error.response?.data?.message || error.message,
      });
    }
  };
