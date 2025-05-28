import React, { useEffect, useState } from 'react';
import '../styles/Main.css';
import { Link } from 'react-router-dom';
import { supabase } from './supabase';
import Map from './Map';



const Main =() =>{
  const [selectedCityId  , setselectedCityId] = useState("Όλες")
  const [selectedCategoryId , setSelectedCategoryId] = useState("Όλες")
  const [bins,setBins] = useState([]);
  const [cities, setCities] = useState([]);


  const  handleCategoryChange = (e) => { setSelectedCategoryId(e.target.value);};
  const  handleCitiesChange = (e) => {setselectedCityId(e.target.value);};

  useEffect(() => {
    const fetchCities = async () => {
      const {data,error} = await supabase.from("cities").select("id,name");
      if(error){
          console.error("Σφάλμα φόρτωσης πόλεων:", error);
      }
      else{
        setCities(data);
      }
    };
    fetchCities();
},[]);


  useEffect(() => {
    const fetchBins = async () => {
      let query = supabase.from("bins").select("*, cities(name)");

      if (selectedCityId !== "Όλες") {
        query = query.eq("city_id", selectedCityId);
      }

      if (selectedCategoryId !== "Όλες") {
        query = query.eq("category", selectedCategoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Σφάλμα φόρτωσης κάδων:", error);
      } else {
        setBins(data);
      }
    };
    fetchBins();
  }, [selectedCityId, selectedCategoryId]);
  


    return(
        <>
      

        <h1 className="title" color='black'>RecycleHub</h1>

         <section className="card">
          <h2><span className="icon">🔍</span> Φίλτρα Αναζήτησης</h2>
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="category">Κατηγορία:</label>
              <select id="category" name="category" value={selectedCategoryId} onChange={handleCategoryChange}>
                <option value="Όλες">Όλες</option>
                <option value="Plastic">♳ Πλαστικό</option>
                <option value="Paper">📄 Χαρτί</option>
                <option value="Glass">🍾 Γυαλί</option>
                <option value="Electronics">🔌 Ηλεκτρικά</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="cities">Πόλη:</label>
              <select id="cities" name="cities" value={selectedCityId} onChange={handleCitiesChange}>
                <option value="Όλες">Όλες</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

    <section id="sxetika" className="card">
        <h2><span className="icon">🏠</span> RecycleHub</h2>
        <p>Η πλατφόρμα <strong>RecycleHub</strong> σας βοηθά να ανακαλύπτετε σημεία ανακύκλωσης στην πόλη σας.</p>
    </section>

    
    <section id="MapComponent" className="card">
      <h2><span className="icon">🗺️</span> Χάρτης</h2>
        <Map bins={bins} />
    </section>

    <section id="data-container" className="card">
      <h2><span className="icon">📋</span> Σημεία Ανακύκλωσης</h2>
      <p>
        Τα Σημεία Ανακύκλωσης είναι ειδικοί χώροι όπου οι πολίτες μπορούν να απορρίψουν
        διαφορετικά υλικά (πλαστικό, γυαλί, χαρτί,ηλεκτρικά) για να ανακυκλωθούν σωστά.
        Με τη χρήση αυτών των σημείων, συμβάλλουμε στην προστασία του περιβάλλοντος και
        στη μείωση της ρύπανσης.
      </p>

      <ul>
        {bins.length === 0 ? (
          <p>Δεν υπάρχουν κάδοι για τα φίλτρα που επιλέξατε.</p>
        ) : (
          bins.map(bin => (
            <li key={bin.id}>
              Κατηγορία: <strong>{bin.category}</strong> - 
              Κατάσταση: <strong>{bin.status}</strong> - 
              Πόλη: <strong>{bin.cities?.name || "Άγνωστη"}</strong>
            </li>
          ))
        )}
      </ul>
    </section>


    <section id="epikoinwnia" className="card">
      <h2>Επικοινωνία</h2>
      <form id="contactForm">
        <label htmlFor="name">Όνομα:</label>
        <input type="text" id="name" name="name" required/>
        
        <label htmlFor="message">Μήνυμα:</label>
        <textarea id="message" name="message" required></textarea>
        
        <button type="submit">Αποστολή</button>
      </form>
    </section>

    <section id="prosthese" className="card">
        <h2>προσθεσε καδο στην πολη σου.</h2>
        <Link to="/add">
          <button type="submit">προσθεσε</button>
        </Link>
    </section>
 </>
    );
};
export default Main;