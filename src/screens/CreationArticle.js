import React, { useState,useRef } from 'react';
import Checkout from '../components/Checkout';
import 'jspdf-autotable';
import axios from "axios";
import Select from 'react-select';
import { Link } from 'react-router-dom'; 
import {typeMAchines,locations,units,dispositionAs,dispositionBs,articleTypes} from '../pceData.jsx';

function CreationArticle() {
    const [typeMachine,settypeMachine] =useState('');
    const fileInputRef = useRef(null); 
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState("");
    const [title, settitle] = useState('');
    const [quantitySt, setquantitySt] = useState('');
    const [unit, setunit] = useState('');
    const [categorie, setcategorie] = useState('');
    const [location, setlocation] = useState('');
    const [dispositionA, setdispositionA] = useState('');
    const [dispositionB, setdispositionB] = useState('');
    const [quantitySecurity, setquantitySecurity] = useState('');
    const [articleType, setarticleType] = useState('');
    const options = locations.map((loc) => ({ value: loc, label: loc }));
    const [fileName, setFileName] = useState("Aucune image sélectionnée");
    
    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setFileName(file.name);
    try {
        const response = await axios.post("https://afgmvmapi2.onrender.com/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setImagePath(response.data.path); // Lien Cloudinary
        setImage(response.data.path);     // pour l'afficher immédiatement
    } catch (error) {
        console.error("Erreur lors de l'upload de l'image :", error);
    }};
    const resetForm = () => {
    settitle('');
    setquantitySt('');
    setunit('');
    setcategorie('');
    setlocation('');
    settypeMachine('');
    setquantitySecurity('');
    setdispositionA('');
    setdispositionB('');
    setarticleType('');
    setFileName('');
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; // ✅ clear file input
      }
    };
    return (
                <div className='justify-content-center mx-auto'>
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
            <h2 className="text-center mb-0 flex-grow-1">CRÉATION ARTICLE</h2>

            {/* Bouton menu */}
            <Link
            to="/listArticle"
            className="btn21 btn-primary d-flex align-items-center justify-content-center"
            style={{ width: '56px', height: '56px', borderRadius: '50%' }}
            >
            <i className="bi bi-list text-white" style={{ fontSize: '35px' }}></i>
            </Link>
            </div>
            </div>


            <div className='col-md-10 text-center col-10 mx-auto bg-white cart-client-infos'>
                
                <form>
                  
                <div className="text-start w-100 col-xl-10 col-10 col-md-10 pb-2 mx-auto">
                <input
                        required
                        type='text'
                        placeholder='nom article'
                        className='form-control col-xl-10 col-8 col-md-8 mx-auto'
                        value={title}
                        onChange={(e) => { settitle(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    /> 
                         <input
                        required
                        type='text'
                        placeholder='Quantité article'
                        className='form-control col-xl-10 col-8 col-md-8 mx-auto'
                        value={quantitySt}
                        onChange={(e) => { setquantitySt(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    /> 
                             <select
                        required
                        id="Selectionner unit"
                        className='form-control mt-2 mx-auto'
                        value={unit}
                        onChange={(e) => { setunit(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    >
                        <option value="" disabled>Choisissez l'unit</option>
                        {units.map((unit, index) => (
                         <option key={index} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                    <select
                        required
                        id="Selectionner catégorie"
                        className='form-control mt-2 mx-auto'
                        value={categorie}
                        onChange={(e) => { setcategorie(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    >
                        <option value="" disabled>Choisissez la catégorie</option>
                        <option value="categorie 1">categorie 1</option>
                        <option value="categorie 2">categorie 2</option>
                        <option value="categorie 3">categorie 3</option>
                    </select>
                    <div className="row justify-content-center mt-2">
                    <div className="col-4 col-sm-4 col-md-6 col-lg-4" style={{ width: '91%', fontSize: '13px' }}>
                   
                    <Select
                      className='form-control mt-2' 
                      options={options}
                      value={options.find((opt) => opt.value === location)||null}
                      onChange={(selected) => setlocation(selected ? selected.value : '')}
                      placeholder="Choisissez l'emplacement"
                      isSearchable
                      isClearable /></div></div>

                    {/*reference générer à partir du id et la location */}

                    {/*is_critic => if qtstock =< qtsecurity so is_critic = true*/}

                    <input
                        required
                        type='text'
                        placeholder='Quantité sécurity'
                        className='form-control col-xl-10 col-8 col-md-8 mx-auto'
                        value={quantitySecurity}
                        onChange={(e) => { setquantitySecurity(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    />

                                        <select
                        required
                        id="Selectionner Disposition A"
                        className='form-control mt-2 mx-auto'
                        value={dispositionA}
                        onChange={(e) => { setdispositionA(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    >
                        <option value="" disabled>Choisissez la disposition A</option>
                        {dispositionAs.map((dispositiona, index) => (
                <option key={index} value={dispositiona}>
                    {dispositiona}
                </option>
            ))}
                    </select> 

                    <select
                        required
                        id="Selectionner Disposition A"
                        className='form-control mt-2 mx-auto'
                        value={dispositionB}
                        onChange={(e) => { setdispositionB(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    >
                        <option value="" disabled>Choisissez la disposition B</option>
                        {dispositionBs.map((dispositionb, index) => (
                <option key={index} value={dispositionb}>
                    {dispositionb}
                </option>
            ))}
                    </select> 
                    
                    <select
                        required
                        id="Selectionner TypeArticle"
                        className='form-control mt-2 mx-auto'
                        value={articleType}
                        onChange={(e) => { setarticleType(e.target.value) }}
                        style={{ width: '90%', fontSize: '13px' }}
                    >
                        <option value="" disabled>Choisissez le type article</option>
                        {articleTypes.map((articleType, index) => (
                <option key={index} value={articleType}>
                    {articleType}
                </option>
            ))}
                    </select> 

                    <select required
                        id="Selectionner Type Machine"
                        className="form-control mt-2 mx-auto"
                        value={typeMachine}
                        onChange={(e) => settypeMachine(e.target.value)}
                        style={{ width: '90%', fontSize: '13px' }}>
    
                     <option value="" disabled>Choisissez le type de machine</option>
                     {typeMAchines.map((typ, index) => (
                     <option key={index} value={typ.code}>
                     {typ.label} - {typ.code}
                     </option>
                    ))}
                    </select>

                    <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="form-control col-xl-10 col-8 col-md-8 mx-auto mb-2"
                    style={{ width: "90%", fontSize: "13px" }}
                      />
                    <span className="text-sm text-gray-500 px-5 mx-4">{fileName}</span>
                </div></form>
            </div>

            <footer className="menubar-area fot footer-fixed mt-2 cart-footer" style={{ backgroundColor: 'rgb(255,255,255)' }}>
                <div className='flex-container col-12'>
                  
                    <div className="menubar-nav d-flex justify-content-end col-10 mx-auto">
                        <Checkout title={title}  quantitySt={quantitySt} unit={unit}
                         categorie={categorie} location={location}  quantitySecurity={quantitySecurity} 
                         dispositionA={dispositionA} dispositionB={dispositionB} articleType={articleType} 
                         typeMachine={typeMachine} imagePath={imagePath}  onSuccess={resetForm} />
                    </div>
                </div>
            </footer>  

        </div>
    );
    }

export default CreationArticle;

/*
    const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    };*/

        /*const getDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mois (0-11) +1 et avec zéro initial
        const day = String(today.getDate()).padStart(2, '0'); // Jour avec zéro initial
        return `${year}-${month}-${day}`; // Format YYYY-MM-DD
      };  */  