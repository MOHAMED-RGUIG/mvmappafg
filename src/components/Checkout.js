import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creationArticle } from '../actions/articlesAction';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';
import { toast } from 'react-toastify';
function Checkout({     title,quantitySt,unit,
    categorie,location,quantitySecurity,dispositionA,dispositionB,articleType,typeMachine,imagePath,onSuccess}) {
    const creationArticlestate = useSelector(state => state.creationArticleReducer);
    const { loading, error, success } = creationArticlestate;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const dispatch = useDispatch();
    function tokenHandler() {        
        dispatch(creationArticle( title,quantitySt,unit,
        categorie,location,quantitySecurity,dispositionA,dispositionB,articleType,typeMachine,imagePath,currentUser));
        toast.success('Votre article à été avec success!', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false});
        if (typeof onSuccess === 'function') {
            onSuccess(); // ⬅️ Appelle la fonction pour vider les champs
    }}
    return (
        <div className='col-12 col-md-12 text-center justify-content-end' >
            {loading && (<Loading />)}
            {error && (<Error error='merci de tenter une autre fois' />)}
            {success && (<Success success='Votre article été ajouté avec success' />)}
            <button className='btn5 col-11 col-md-11 mt-2 p-2'  onClick={tokenHandler}>AJOUTER</button>
        </div>
    );
}
export default Checkout;
