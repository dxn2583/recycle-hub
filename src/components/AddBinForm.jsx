import React, { useState } from 'react';
import { supabase } from './supabase';
import '../styles/AddBinForm.css';
import '../styles/Header.css'


// Ορισμός του component AddbinForm
const  AddBinForm  =() =>{
     // Δημιουργούμε ένα αντικείμενο (state) για να αποθηκεύσουμε τα πεδία της φόρμας
const [formData,setFormData]=useState({
    category:"all",
    city_id:"",
    latitude: "",
    longitude: "",
    filllevel:0
    
});
  // Συνάρτηση που καλείται κάθε φορά που αλλάζει ένα πεδίο φόρμας
const handleChange =(e)=>{
    const{name,value} = e.target;
// Ενημερώνουμε το αντίστοιχο πεδίο στο formData
    setFormData(prev => ({
        ...prev,
        [name]: name === "filllevel" ? parseInt(value) : value                          // αλλιώς απλά το value
    }));
};

  // Συνάρτηση που εκτελείται όταν γίνεται submit η φόρμα
    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log('Data to submit:', formData);

            //Αυτοματος ελεγχος ποσοτητα καδου
        let autoStatus;
        const filllevel = formData.filllevel;
        if(filllevel>=80){
            autoStatus = "Γεμάτος";
        }
        else if(filllevel>=51){
            autoStatus = "Μισογεμάτος";
        }
        else{
            autoStatus = "Άδειος";
        }
            // Προσθήκη δεδομένων στο Supabase (βάση δεδομένων)
            const{data,error} = await supabase.from('bins').insert([{
                category: formData.category,
                city_id:formData.city_id,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                filllevel:formData.filllevel,
                status: autoStatus
            }]);
            if (error) {
                console.error('Σφάλμα κατά την καταχώρηση:', error);
                alert('Αποτυχία καταχώρησης. Δοκιμάστε ξανά.');
            }else {
                console.log('Επιτυχής καταχώρηση:', data);
                alert('Ο κάδος προστέθηκε επιτυχώς!');
            }  
            
    };


    return(
         
    <div>
      
        <div className="create">
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">κατηγορια</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange}>
                    <option value="">Όλες</option>
                    <option value="Plastic">♳ Πλαστικό</option>
                    <option value="Paper">📄 Χαρτί</option>
                    <option value="Glass">🍾 Γυαλί</option>
                    <option value="Electronics">🔌 Ηλεκτρικά</option>
                </select>
                
            
                <label htmlFor="cities">Πόλη:</label>
                <select id="city_id" name="city_id" value={formData.city_id} onChange={handleChange} required >
                    <option value="">Όλες</option>
                    <option value="1">Αθήνα</option>
                    <option value="2">Θεσσαλονίκη</option>
                    <option value="3">Πάτρα</option>
                    <option value="4">Ηράκλειο</option>
                    <option value="5">Λάρισα</option>
                    <option value="6">Βόλος</option>
                    <option value="7">Ιωάννινα</option>
                    <option value="8">Καλαμάτα</option>
                    <option value="9">Ρόδος</option>
                    <option value="10">Χανιά</option>
                </select>
                
                <label>συνεταγμενη X:</label>
                <input type="number" name="latitude" placeholder="X 37.9838" step="0.0001" value={formData.latitude} onChange={handleChange} required />
                
                <label>συνεταγμενη Y:</label>
                <input type="number" name="longitude" placeholder="Y 23.7275" step="0.0001" value={formData.longitude} onChange={handleChange} required />
                
                <label>ποσοτητα καδου:</label>
                <input type="number" name="filllevel" placeholder="0-100" min="0" max="100" value={formData.filllevel} onChange={handleChange} />
               
                <button type="submit" className="submit"  >Αποθήκευση </button>

            </form>
        </div>   
        
    </div>
       
    );
};
export default AddBinForm;