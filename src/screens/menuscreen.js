



/*import React from 'react'
import { Link } from 'react-router-dom'
function menuscreen() {
  return (
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            <div className="container Body-Home">
              <div className="row">
              <div className="col-md-6">
      <Link to="/creationMvm" className="home-link link-lstinv">
        <span className="bi bi-database-add icon-home"></span>
        <h5>CREATION MOUVEMENT</h5>
        <span className="bi bi-arrow-right arrow-crea-inv"></span>
      </Link>
               </div>
              <div className="col-md-6">
                <Link to="/creationArticle" className="home-link  link-lstinv">
                <span className="bi bi-window-plus d-block icon-home"></span>
                  <h5>CREATION ARTICLE</h5>
                  <span className="bi bi-arrow-right arrow-list-inv"></span>
                </Link>
              </div>

    <div className="col-md-6">
      <Link to="/listArticle" className="home-link link-creinv">
        <span className="bi bi-box-fill icon-home"></span><br></br>
        <h5>LISTE ARTICLES</h5>
        <span className="bi bi-arrow-right arrow-list-inv"></span>
      </Link>
    </div>
    <div className="col-md-6">
      <Link to="/listMvm" className="home-link link-creinv">
        <span className="bi bi-list-columns-reverse icon-home"></span><br></br>
        <h5>LISTE MOUVEMENT</h5>
        <span className="bi bi-arrow-right arrow-crea-inv"></span>
      </Link>
    </div>
  
  </div>

  <div className="row">

  <div className="col-md-6">
    {currentUser?.TYPUSR === 'admin' ? (
      <Link to="/statistique" className="home-link  link-valinv">
        <span className="bi bi-bar-chart d-block icon-home"></span>
        <h5>STATISTIQUES</h5>
        <span className="bi bi-arrow-right arrow-val-inv"></span>
      </Link>
    ) : (
      <div
        className="list-group-item bg-light text-muted pt-4"
        style={{ cursor: 'not-allowed', opacity: 0.6 }}
        title="Accès réservé aux administrateurs"
      >
        <span className="bi bi-bar-chart d-block icon-home"></span>
        <h5>STATISTIQUES</h5>
        <span className="bi bi-arrow-right arrow-val-inv"></span>
      </div>
    )}
  </div>


  <div className="col-md-6">
    <Link to="/menuImportation" className="home-link link-expinv">
      <span className="bi bi-upload d-block icon-home"></span>
      <h5>IMPORTER <br />DES ARTICLES</h5>
      <span className="bi bi-arrow-right arrow-export-inv"></span>
    </Link>
  </div>
  {/* <div className="row">
   
 
    <div className="col-md-6">
   {currentUser?.TYPUSR === 'admin'? (
      <Link to="/statistique" className="home-link  link-valinv">
        <span className="bi bi-bar-chart d-block icon-home"></span>
        <h5>STATISTIQUES</h5>
        <span className="bi bi-arrow-right arrow-val-inv"></span>
      </Link> ) : ( 
 <div
          className="list-group-item bg-light text-muted pt-4"
          style={{ cursor: 'not-allowed', opacity: 0.6 }}
          title="Accès réservé aux administrateurs"
        > <span className="bi bi-bar-chart d-block icon-home"></span>
   <h5>STATISTIQUES</h5>
  <span className="bi bi-arrow-right arrow-val-inv"></span>
          )} </div>

            
    </div>
    <div className="col-md-6">
      <Link to="/menuImportation" className="home-link link-expinv">
        <span className="bi bi-upload d-block icon-home"></span>
        <h5>IMPORTER <br></br>DES ARTICLES</h5>
        <span className="bi bi-arrow-right arrow-export-inv"></span>
      </Link>
    </div>
  </div>
  </div>
</div>
        
  )
}

export default menuscreen */
import React from 'react';
import { Link } from 'react-router-dom';

function menuscreen() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // 👈 récupère l'utilisateur depuis localStorage, adapte selon ton app

  return (
    <div className="container Body-Home">
      <div className="row">
        <div className="col-md-6">
          <Link to="/creationMvm" className="home-link link-lstinv">
            <span className="bi bi-database-add icon-home"></span>
            <h5>CREATION MOUVEMENT</h5>
            <span className="bi bi-arrow-right arrow-crea-inv"></span>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/creationArticle" className="home-link link-lstinv">
            <span className="bi bi-window-plus d-block icon-home"></span>
            <h5>CREATION ARTICLE</h5>
            <span className="bi bi-arrow-right arrow-list-inv"></span>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/listArticle" className="home-link link-creinv">
            <span className="bi bi-box-fill icon-home"></span><br />
            <h5>LISTE ARTICLES</h5>
            <span className="bi bi-arrow-right arrow-list-inv"></span>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/listMvm" className="home-link link-creinv">
            <span className="bi bi-list-columns-reverse icon-home"></span><br />
            <h5>LISTE MOUVEMENT</h5>
            <span className="bi bi-arrow-right arrow-crea-inv"></span>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {currentUser?.TYPUSR === 'admin' ? (
            <Link to="/statistique" className="home-link link-valinv">
              <span className="bi bi-bar-chart d-block icon-home"></span>
              <h5>STATISTIQUES</h5>
              <span className="bi bi-arrow-right arrow-val-inv"></span>
            </Link>
          ) : (
            <div
              className="home-link link-valinv text-muted pt-4"
              style={{ cursor: 'not-allowed', opacity: 0.6 }}
              title="Accès réservé aux administrateurs"
            >
              <span className="bi bi-bar-chart d-block icon-home"></span>
              <h5>STATISTIQUES</h5>
              <span className="bi bi-arrow-right arrow-val-inv"></span>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <Link to="/menuImportation" className="home-link link-expinv">
            <span className="bi bi-upload d-block icon-home"></span>
            <h5>IMPORTER <br />DES ARTICLES</h5>
            <span className="bi bi-arrow-right arrow-export-inv"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default menuscreen;
