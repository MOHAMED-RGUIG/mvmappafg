import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creationMvm } from '../actions/mvmAction.js';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import Error from '../components/Error';
import Success from '../components/Success';
function CheckoutMvm({  typeMvm,
    quantityMvm,referenceArticle,nOrdre, onSuccess }) {
    const creationMvmstate = useSelector(state => state.creationMvmReducer);
    const { loading, error, success } = creationMvmstate;  
    const dispatch = useDispatch();
    async function tokenHandler() {
        if (typeMvm.trim() && quantityMvm.trim() && referenceArticle.trim() && nOrdre.trim()) {
            try {
                await dispatch(creationMvm(typeMvm, quantityMvm, referenceArticle, nOrdre));
                toast.success('Votre inventaire a été ajouté avec succès !', {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false
                });
                if (typeof onSuccess === 'function') {
                    onSuccess(); // ⬅️ Appelle la fonction pour vider les champs
                  }
            } catch (error) {
                toast.error(`Erreur : ${error.response?.data?.message || error.message}`, {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false
                });
            }
        } else {
            toast.error('Oops ! Merci de remplir le formulaire !', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false
            });
        }
    }
    return (
        <div className='col-12 col-md-12 text-center justify-content-end' >
            {loading && (<Loading />)}
            {error && (<Error error={error} />)}
            {success && (<Success success='Votre inventaire été ajouté avec success' />)}
            <button className='btn5 col-11 col-md-11 mt-2 p-2'  onClick={tokenHandler}>AJOUTER </button>
          
        </div>
    );
}

export default CheckoutMvm;
