import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { backend } from '../configs/axios.config';
import { toast } from 'react-hot-toast';

function addPrescription() {
  const id = useParams();
  const [medicine, setMedicine] = useState();
  const [dosage, setDosage] = useState();
  const [notes, setNotes] = useState();

  const handleAddPrescription = async () => {
    const data = {
      id,
      medicine,
      dosage,
      notes,
    };
    const response = await backend.post('/add-prescription', data);
    if (response.data.success) {
      toast.success('Prescription added successfully');
      window.location.replace('/doctor/appointments');
    } else {
      toast.error('please retry later');
    }
  };
  return (
    <div className="md:p-24 p-4">
      <p className="mt-10 block mb-4 text-lg font-medium text-gray-900">ADD PRESCRIPTION</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="block mb-2 text-sm font-medium text-gray-900">Medicine Name</p>
          <input
            type="email"
            className=" my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the Medicine Name"
            onChange={(e) => setMedicine(e.target.value)}
            value={medicine}
          />
        </div>
        <div>
          <p className="block mb-2 text-sm font-medium text-gray-900">Dosage</p>
          <input
            type="email"
            className=" my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Dosage"
            onChange={(e) => setDosage(e.target.value)}
            value={dosage}
          />
        </div>
      </div>
      <textarea
        rows="6"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write the prescriptions here..."
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      />

      <button
        type="submit"
        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
        onClick={() => handleAddPrescription()}
      >
        Add Prescription
      </button>
    </div>
  );
}

export default addPrescription;
