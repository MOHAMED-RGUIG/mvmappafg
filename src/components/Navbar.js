import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { Link } from 'react-router-dom'; // 👈 Import nécessaire
function Navbar() {
  const userstate = useSelector(state => state.loginUserReducer);
  const { currentUser } = userstate;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };
  const sideClose = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="d-flex text-start sticky">
        <div ref={sidebarRef} className={`sidebar p-4 side-light border-end ${sidebarOpen ? 'open' : ''}`}
        style={{height: '100vh',overflowY: 'auto'}}>
          <div className="list-group list-group-flush p-1">
            {currentUser ? (
            <>
                <div className="nav-link pb-5" type="button" aria-expanded="false">
                  {currentUser.NOMUSR}
                  <p style={{ fontSize: '13px', color: '#183F7F' }}>{currentUser.EMAILUSR}</p>
                  <button   className="btn20 btn-primary d-flex align-items-center justify-content-center"
                   style={{ width: '56px', height: '56px', borderRadius: '50%' }} onClick={sideClose} > X </button>
                </div>
            
                <Link to="/menu" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-house-door p-2"></i>Menu
                </Link>
                <Link to="/creationArticle" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-window-plus p-2"></i>Création Article
                </Link>
                <Link to="/creationMvm" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-database-add p-2"></i>Création Mvm
                </Link>
                <Link to="/listArticle" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-box-fill p-2"></i>Liste Article
                </Link>
                <Link to="/listMvm" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-list-columns-reverse p-2"></i>Liste Mvm
                </Link>
 {currentUser?.TYPUSR === 'admin'? (
                <Link to="/statistique" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-bar-chart p-2"></i>Statistiques
                </Link>    ) : (
 <div
          className="list-group-item bg-light text-muted pt-4"
          style={{ cursor: 'not-allowed', opacity: 0.6 }}
          title="Accès réservé aux administrateurs"
        >
    <i className="bi bi-bar-chart p-2"></i>
          Statistiques
        </div>
      )}
                <Link to="/menuImportation" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-upload p-2"></i>Importation
                </Link>
                {currentUser?.TYPUSR === 'admin'? (
        <Link
          to="/register"
          className="list-group-item list-group-item-action bg-light"
        >
          <i className="bi bi-person-add p-2"></i>
          Création du compte
        </Link>
      ) : (
        // Pour les non-admins, on affiche un <div> désactivé
        <div
          className="list-group-item bg-light text-muted pt-4"
          style={{ cursor: 'not-allowed', opacity: 0.6 }}
          title="Accès réservé aux administrateurs"
        >
          
          <i className="bi bi-person-add p-2"></i>
          Création du compte
        </div>
      )}
                <Link
                  to="/"
                  className="list-group-item list-group-item-action bg-light"
                  onClick={() => dispatch(logoutUser())}
                >
                  <i className="bi bi-box-arrow-right p-2"></i>Logout
                </Link>
              </>
            ) : (
              <>
                     <button   className="btn20 btn-primary d-flex align-items-center justify-content-center mb-4"
           style={{ width: '45px', height: '45px', borderRadius: '50%' }} onClick={sideClose} > X </button>

                <Link to="/register" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-person-add p-2"></i>Création du compte
                </Link>
                <Link to="/" className="list-group-item list-group-item-action bg-light">
                  <i className="bi bi-person p-2"></i>Connexion
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-grow-1 col-11 col-xs-11">
          <nav className="navbar navbar-expand-lg bg-body rounded header">
            <div className="container-fluid d-flex">
              <button
                className="navbar-toggler col-xs-1 m-0"
                type="button"
                onClick={toggleSidebar}
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"> </span>
              </button>

              <Link className="navbar-brand mx-auto" to="/menu">
  <img
    src="./logo.png"
    alt="Afriqua gaz logo"
    className="img-fluid d-block"
    style={{
      height: '90px',
      paddingLeft: '97px',
      objectFit: 'contain',
    }}
  />
</Link>
{currentUser ? (
  <>
    {/* Affichage pour les écrans md et plus grands */}
    <ul className="navbar-nav ml-auto px-3 d-none d-md-flex">
      <li className="nav-item text-start">
        <Link className="nav-link m-auto" to="/menu" style={{ marginTop: '0px' }}>
          {currentUser.NOMUSR}
          <img src="../user.png" alt="creationArticle" style={{ height: '40px', paddingLeft: '7px' }} />
        </Link>
      </li>
    </ul>

    {/* Affichage réduit pour les petits écrans (mobile) */}
    <ul className="navbar-nav ml-auto px-3 d-flex d-md-none">
      <li className="nav-item text-start">
        <Link className="nav-link m-auto" to="/menu">
          <i className="bi bi-person-fill p-2" style={{ fontSize: '22px' }}></i>
        </Link>
      </li>
    </ul>
  </>
) : (
  <Link className="nav-link" to="/" style={{ textDecoration: 'none', fontSize: '20px' }}>
    <i className="bi bi-person-fill p-2"></i>
  </Link>
)}

            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
