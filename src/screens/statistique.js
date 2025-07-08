import React, { useState, useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArticles } from '../actions/articlesAction';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { getAllMouvementsGraphique } from '../actions/mvmAction';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function Statistique() {
  const dispatch = useDispatch();
  const { articles } = useSelector(state => state.articles);
  const { mouvements } = useSelector(state => state.mouvements);
    // État pour la référence de l'article
  const [reference, setReference] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [filteredMouvements, setFilteredMouvements] = useState([]);
  const graphRef1 = useRef();
  const graphRef2 = useRef();
const handleExportPDF = async () => {
  const pdf = new jsPDF('landscape', 'pt', 'a4');
  let yOffset = 20;

  const exportChart = async (ref) => {
    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 20, yOffset, pdfWidth - 40, pdfHeight);
    yOffset += pdfHeight ;
  };

  await exportChart(graphRef1);
  await exportChart(graphRef2);


  pdf.save('graphiques.pdf');
};
  useEffect(() => {
    // Filtrer les mouvements par référence et date
    if (mouvements) {
      let filtered = mouvements;  
      // Filtrer par référence d'article
      if (reference) {
        filtered = filtered.filter(m => m.referenceArticle === reference);
      }  
      // Filtrer par date
      if (dateDebut && dateFin) {
        const startDate = new Date(dateDebut);
        const endDate = new Date(dateFin);
        filtered = filtered.filter(m => {
          const dateMvm = new Date(m.mvmDate);
          return dateMvm >= startDate && dateMvm <= endDate;
        });
      }  
      setFilteredMouvements(filtered);
    }
  }, [mouvements, reference, dateDebut, dateFin]);
  const handleResetFilters = () => {
    setReference('');
    setDateDebut('');
    setDateFin('');
    setFilteredMouvements([]);
  };  

  const totalEntree = filteredMouvements.reduce(
    (acc, m) => acc + (m.quantityEntree || 0),
    0
  );
  const totalSortie = filteredMouvements.reduce(
    (acc, m) => acc + (m.quantitySortie || 0),
    0
  );
  // Récupérer tous les articles
  useEffect(() => {
    dispatch(getAllMouvementsGraphique());
    dispatch(getAllArticles());
  }, [dispatch]);
  const handleSearch1 = () => {
    dispatch(getAllMouvementsGraphique(reference));
  };
  // Fonction pour filtrer l'article par référence
  const handleSearch = () => {
    const article = articles.find(article => article.reference === reference);
    setSelectedArticle(article);
  };
  // Si aucun article n'est sélectionné, afficher les statistiques de tous les articles
  const totalArticles = articles.length;
  const criticalArticles = articles.filter(article => article.is_critic === 1).length;
  const nonCriticalArticles = totalArticles - criticalArticles;
  const handleShowAllStats = () => {
    setSelectedArticle(null);
    setReference('');
  };
  const data = [
    { name: 'Les articles critiques', value: criticalArticles },
    { name: 'Les articles non critiques', value: nonCriticalArticles },
  ];
  
const renderLabel = ({ x, y, name, value }) => (
  <text x={x} y={y} fontSize={13} textAnchor="middle" fill="#333">
    {`${name}: ${value}`}
  </text>
);
  const COLORS = ['#dc3545', '#183F7F'];
  const totalMvm = totalEntree + totalSortie;
  const globalData = [
    { name: 'Entrée', value: totalEntree },
    { name: 'Sortie', value: totalSortie },
  ];
  const COLORS1 = ['#097969', '#dc3545'];
  return (
    <div className="justify-content-center mx-auto col-12 col-md-12 col-lg-12">
                <div className="container mt-5 mb-3 headerhomescreen">
                <div className="d-flex align-items-center justify-content-between">
           
           {/* Bouton retour */}
           <Link
             to="/menu"
             className="btn20 btn-primary d-flex align-items-center justify-content-center"
             style={{ width: '56px', height: '56px', borderRadius: '50%' }}
           >
             <i className="bi bi-arrow-left text-white" style={{ fontSize: '25px' }}></i>
           </Link>
       
           {/* Titre centré */}
           <h2 className="text-center mb-0 flex-grow-1">STATISTIQUES</h2>
       
           {/* Bouton menu */}
       
         </div>
       </div>
       

      {/* Champ de recherche pour référence d'article */}
      <div className="container mt-5 mb-3">
      <div className="row justify-content-center gy-2">

    {/* Champ de recherche */}
    <div className="col-12 col-md-6 search-bar">
      <input
        type="text"
        className="form-control w-100"
        placeholder="Entrez la référence de l'article"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
      />
    </div>

    {/* Bouton Rechercher */}
    <div className="col-6 col-md-3">
      <button
        className="btn15 btn-primary mt-2 p-2 w-100 rounded"
        onClick={handleSearch}
      >
        Rechercher
      </button>
    </div>
    {/* Bouton Tous */}
    <div className="col-6 col-md-3">
      <button
        className="btn15 btn-primary mt-2 p-2 w-100 rounded"
        onClick={handleShowAllStats}
      >
        Tous
      </button>
    </div>
  </div>
</div>
      {/* Affichage des statistiques pour tous les articles ou l'article sélectionné */}
      <div className="container" ref={graphRef1}>
      <div className="row justify-content-center align-items-start mx-auto ">
      {/* Bloc 1 - Chart */}
    <div
      className="col-12 col-md-6 col-xl-5 col-lg-6 text-center mb-4 shadow-lg p-3 bg-white rounded"
      style={{ height: '400px' }}
    >   
      <PieChart width={350} height={400} className="col-12">
      <Pie
    data={selectedArticle ? [
      { name: 'QtSecurity', value: selectedArticle.quantitySecurity },
      { name: 'QtSt', value: selectedArticle.quantitySt }
    ] : data}
    cx="50%"
    cy="50%"
    innerRadius={80}
    outerRadius={120}
    fill="#8884d8"
    paddingAngle={5}
    dataKey="value"
    label={renderLabel}
  
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart></div>
    {/* Bloc 2 - Infos */}
    <div
      className="col-10 col-md-6 col-xl-6  col-lg-6 text-center shadow-lg p-3  mb-5 bg-white rounded"
      style={{ marginLeft: '20px', height: '450px' }}
    >
      {selectedArticle ? (
        <>
          <h2 className="mb-3 shadow p-5 bg-white rounded" style={{ fontFamily: 'poppins', fontWeight: '700' }}>
            Article : {selectedArticle.reference}
          </h2>
          <h1 className="fs-4 text-start" style={{ color: '#dc3545' }}>
            Critique : <span className="fw-bold"> {selectedArticle.is_critic === 1 ? 'Oui' : 'Non'} <hr /></span>
          </h1>
          <h1 className="fs-4 text-start" style={{ color: '#183F7F' }}>
            Quantité Initial : <span className="fw-bold"> {selectedArticle.quantityStInit} <hr /></span>
          </h1>
          <h1 className="fs-4 text-start" style={{ color: '#183F7F' }}>
            Quantité disponible : <span className="fw-bold"> {selectedArticle.quantitySt} <hr /></span>
          </h1>
          <h1 className="fs-4 text-start" style={{ color: '#183F7F' }}>
            Quantité de sécurité : <span className="fw-bold"> {selectedArticle.quantitySecurity} <hr /></span>
          </h1>
        </>
      ) : (
        <>
          <h2 className="mb-5 mt-3 shadow p-5 mb-5 bg-white rounded" style={{ fontFamily: 'poppins', fontWeight: '700' }}>
            Statistiques Générales
          </h2>
          <h1 className="fs-4 text-dark text-start pt-1">
            Nombre Total des articles : <span className="fw-bold"> {totalArticles} <hr /></span>
          </h1>
          <h1 className="fs-4 text-start" style={{ color: '#dc3545' }}>
            Nombre des articles critiques : <span className="fw-bold"> {criticalArticles} <hr /></span>
          </h1>
          <h1 className="fs-4 text-start mb-3" style={{ color: '#183F7F' }}>
            Nombre des articles non critiques : <span className="fw-bold"> {nonCriticalArticles} <hr /></span>
          </h1>
        </>
      )}
    </div>

  </div>
</div>

      
<div className="container  col-12 col-md-12 col-lg-12">

<div className="col-12 col-md-12 mt-5 mb-5 headerhomescreen">
  <h2 className="mt-5">Mouvements des Articles</h2>
</div>

{/* Zone de recherche */}
<div className="container mt-5 mb-3">
  <div className="row justify-content-center gy-2 ">

  <div className="col-12 col-md-6 search-bar">
  <input
    type="text"
    className="form-control  lex-grow-1"
    placeholder="Entrez la référence de l'article"
    value={reference}
    onChange={(e) => setReference(e.target.value)}
  /></div>
  <div className='col-6 col-md-3'>   <button className="btn15 btn-primary rounded mt-2 p-2 w-100" onClick={handleSearch1}>
    Rechercher
  </button></div>

  <div className='col-6 col-md-3'>   <button className="btn15 btn-secondary rounded mt-2 p-2 w-100"  disabled={!reference && !dateDebut && !dateFin} onClick={handleResetFilters}>
    Réinitialiser
  </button></div>
  </div>
</div>

{/* Dates */}
<div className="d-flex flex-wrap gap-3 col-6 col-lg-10 mb-4 search-bar">
  <input
    type="date"
    className="form-control"
    value={dateDebut}
    onChange={(e) => setDateDebut(e.target.value)}
  />
  <input
    type="date"
    className="form-control"
    value={dateFin}
    onChange={(e) => setDateFin(e.target.value)}
  />
</div>

{/* Graphique et stats */}
<div className="row justify-content-center mt-4 mb-3 g-4" ref={graphRef2}>

  {/* Colonne avec les données */}
  <div
    style={{  height: '400px', paddingTop: '50px' }}
    className="col-10 col-md-6 text-center shadow-lg p-5 mb-2 bg-white rounded"
  >
    <div className='pt-5 mt-2 text-start'>
      <h2 style={{ color: '#183F7F', fontSize: '40px' }}> Article : {reference}</h2>
      <hr />
      {globalData.map((item, index) => (
        <h4 key={index} style={{ color: item.name === 'Entrée' ? '#198754' : '#dc3545' }}>
          {`Total des ${item.name === 'Entrée' ? 'entrées' : 'sorties'}`} :
          <span className="fw-bold"> {item.value}</span>
          <hr />
        </h4>
      ))}
    </div>
    <h2 className='text-start mb-5' style={{ fontSize: '30px' }}>
      Total mouvements : {totalMvm}
    </h2>
  </div>

  {/* Colonne avec le graphique */}
  <div className="col-12 col-md-6 d-flex justify-content-center">

    <PieChart width={500} height={400}>
      <Pie
        data={globalData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={({ name, value }) => `${name}: ${value}`}
      >
        {globalData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </div>

</div>

<button className="btn11 mt-4 mb-4 p-3" onClick={handleExportPDF}>
  Exporter PDF   <i className="bi bi-file-earmark-pdf-fill me-1"></i>
</button>

</div>
 
    </div>
  );
}
