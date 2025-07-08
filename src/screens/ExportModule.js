import React from 'react';
import { Link } from 'react-router-dom';

function ExportModule() {
  const handleExportExcel = () => {
    window.open('https://afgmvmapi2.onrender.com/api/exportExcelCsvRoute/export-module.xlsx', '_blank');
  };

  const handleExportCSV = () => {
    window.open('https://afgmvmapi2.onrender.com/api/exportExcelCsvRoute/export-module.csv', '_blank');
  };

  return (
    <div className="export-module">
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
          <h2 className="text-center mb-0 flex-grow-1">
            EXPORTER MODULE 
            <span className="bi bi-download d-block icon-home pt-1"></span>
          </h2>

          {/* Espace à droite */}
          <div style={{ width: '56px' }}></div>
        </div>
      </div>

      <div className="col-10 col-xs-10 col-xl-4 mx-auto text-center mt-4">
        <button className="btn5 w-100 mt-3" onClick={handleExportExcel}>
          <i className="bi bi-file-earmark-excel-fill me-2"></i>Télécharger le module Excel
        </button>
        <button className="btn5 w-100 mt-3" onClick={handleExportCSV}>
          <i className="bi bi-filetype-csv me-2"></i>Télécharger le module CSV
        </button>
      </div>
    </div>
  );
}

export default ExportModule;
