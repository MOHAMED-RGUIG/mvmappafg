import React from 'react'
import { Link } from 'react-router-dom'
function MenuImportation() {
  return (
    <div className='col-9 col-md-9 col-xs-9 mx-auto mt-5 pt-1 mb-5' >  
              <div className="container mt-5 mb-3 headerhomescreen">
       <div className="d-flex align-items-center justify-content-between">  
         {/* Bouton retour */}
         <Link
           to="/menu"
           className="btn20 btn-primary d-flex align-items-center justify-content-center"
           style={{ width: '50px', height: '56px', borderRadius: '50%' }}
         >
           <i className="bi bi-arrow-left text-white" style={{ fontSize: '25px' }}></i>
         </Link>
         {/* Titre centré */}
         <h2 className="text-center mb-0 flex-grow-1 col-8 px-3">IMPORTATION</h2>
         {/* Bouton menu */}
       </div>
     </div>
          <div className="container Body-Home">
          
  <div className="row">
  <div className="col-md-6">
      <Link to="/csv" className="home-link link-lstinv">
        <span className="bi bi-filetype-csv d-block icon-home"></span>
        <h5>Importer fichier Csv</h5>
        <span className="bi bi-arrow-right arrow-crea-inv"></span>
      </Link>
    </div>
    <div className="col-md-6 col-6">
      <Link to="/excel" className="home-link  link-lstinv ">
      <span className="bi bi-file-earmark-excel d-block icon-home"></span>
        <h5>Importer fichier Excel</h5>
        <span className="bi bi-arrow-right arrow-crea-inv "></span>
      </Link>
    </div>
    <div className="col-md-6 col-6">
      <Link to="/ExportModule" className="home-link  link-lstinv">
      <span className="bi bi-cloud-arrow-down-fill d-block icon-home"></span>
        <h5>Exporter Module Excel/Csv</h5>
        <span className="bi bi-arrow-right arrow-crea-inv"></span>
      </Link>
    </div>
    {/* Row for the first two buttons */}
  </div>
  </div>       
  </div>
    
  )
}

export default MenuImportation