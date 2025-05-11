import { useState,useEffect } from 'react';

export default function DonorHome() 
{
     const [donor, setDonor] = useState("");
     
     useEffect(() => {
       const storedDonor = sessionStorage.getItem('donor');
       if (storedDonor) {
        setDonor(JSON.parse(storedDonor));
       }
     }, []);
  return (
    <div>
      <h3>Hello {donor.name}</h3>
    </div>
  )
}