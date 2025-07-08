import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Importcsv() {
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        if (!file) return alert('Please select a file');
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user?.idUser) {
            alert("Utilisateur non authentifié. Veuillez vous reconnecter.");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('currentUser', JSON.stringify(user));
        try {
            const response = await axios.post('http://localhost:3000/api/csv/importcsv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to import CSV');
        }
    };

    return (
        <div>
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
           <h2 className="text-center mb-0 flex-grow-1">IMPORTER CSV <span className="bi bi-filetype-csv d-block icon-home pt-1"></span></h2>
           {/* Bouton menu */}
         </div>
       </div>
            <form onSubmit={handleSubmit1} className='pt-4 col-10 col-xs-10 col-xl-4 mx-auto'>
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <button className='btn5 w-100 col-3 col-xl-3 mt-3' type="submit"><i className="bi bi-filetype-csv me-2"></i>Importer en Csv</button>
            </form>
        </div>
    );
}
export default Importcsv;
