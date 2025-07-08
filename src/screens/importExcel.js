import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function ImportExcel() {
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Veuillez sélectionner un fichier Excel');
            return;
        }
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user?.idUser) {
            alert("Utilisateur non authentifié. Veuillez vous reconnecter.");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('currentUser', JSON.stringify(user));
        try {
            const response = await axios.post('http://localhost:3000/api/excel/import-excel', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert('Échec de l\'importation du fichier Excel');
        }
    };

    return (
        <div className="import-excel">
                     <div className="container mt-5 mb-3 headerhomescreen">
               <div className="d-flex align-items-center justify-content-between">
                 
                 {/* Bouton retour */}
                 <Link
                   to="/menuImportation"
                   className="btn20 btn-primary d-flex align-items-center justify-content-center"
                   style={{ width: '56px', height: '56px', borderRadius: '50%' }}
                 >
                   <i className="bi bi-arrow-left text-white" style={{ fontSize: '25px' }}></i>
                 </Link>
             
                 {/* Titre centré */}
                 <h2 className="text-center mb-0 flex-grow-1">IMPORTER EXCEL <span className="bi bi-file-earmark-excel d-block icon-home pt-1"></span></h2>
             
                 {/* Bouton menu */}
             
               </div>
             </div>
             <form onSubmit={handleSubmit1} className='pt-4 col-10 col-xs-10 col-xl-4 mx-auto'>
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
                <button className='btn5 w-100 col-3 col-xl-3 mt-3' type="submit">       <i className="bi bi-file-earmark-excel me-2"></i>Importer en Excel</button>
            </form>
        </div>
    );
}

export default ImportExcel;
