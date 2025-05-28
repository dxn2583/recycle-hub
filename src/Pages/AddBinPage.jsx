import React from 'react';
import AddBinForm from '../components/AddBinForm';


const AddBinPage = () => {
  return (
    <div className="add-bin-page">
      <h2 style={{ textAlign: 'center',color: '#009150' }} >Προσθήκη Κάδου</h2>
      <AddBinForm />
    </div>
  );
};
export default AddBinPage; 