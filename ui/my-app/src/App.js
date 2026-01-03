import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

async function calculate(event){
  // Get calculation from the backend
  // Update results area
  event.preventDefault();
  setError("");

  if (localSalesCount==="" ||foreignSalesCount===""|| averageSaleAmount==="" )
    {
    setError("All fields are Required");
    return;
  }
  if (localSalesCount<0 ||foreignSalesCount<0|| averageSaleAmount<0 )
    {
    setError("Values For localSalesCount,foreignSalesCount,averageSaleAmount must be greater than 0 ");

    return;
  }
  try{
    const response =await fetch("https://localhost:5000/Commision/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",

      },
      body:JSON.stringify({
          localSalesCount:Number(localSalesCount),
           foreignSalesCount:Number(foreignSalesCount), 
            averageSaleAmount:Number(averageSaleAmount),
    }),

        });
      if(!response.ok){
        throw new Error("Getting error from fetching response from Api");
      }
      const data=await response.json();
      setAvalphaCommission(data.AvalphaTechnologiesCommissionAmount);
      setCompetitorCommission(data.CompetitorCommissionAmount)
    }catch (err){
      setError(err.message)
    }
    
  
}

function App() {
const [localSalesCount,setLocalSalesCount]=useState("");
const [foreignSalesCount,setForeignSalesCount]=useState("");
const [averageSaleAmount,setAverageSaleAmount]=useState("");
const [avalphaCommission,setAvalphaCommission]=useState("");
const [competitorCommission,setCompetitorCommission]=useState("");
const [error,setError]=useState("");
  const totalAvalphaTechnologiesCommission = 50;
  const totalCompetitorCommission = 10;
  return (
    <div className="App">
      <header className="App-header">
        <div>
        </div>
        <form onSubmit={calculate}>
          <label for="localSalesCount">Local Sales Count</label>  
          <input name="localSalesCount"  value={localSalesCount} onChange={(e)=>setLocalSalesCount(e.target.value)}/><br />

          <label for="foreignSalesCount">Foreign Sales Count</label>  
          <input name="foreignSalesCount" 
          value={foreignSalesCount} onChange={(e)=>setForeignSalesCount(e.target.value)}
          /><br />
          
          <label for="averageSaleAmount">Average Sale Amount</label>  
          <input name="averageSaleAmount" 
           value={averageSaleAmount} onChange={(e)=>setAverageSaleAmount(e.target.value)}
          /><br />

          <button type="submit">Calculate</button>
        </form>
      </header>

      <div>
        <h3>Results</h3>
        {error && <p style={{color:"red"}}>
          {error}</p>}

          {avalphaCommission !=null && (
             <p>Total Avalpha Technologies commission: ₹{avalphaCommission}</p>
          )}
        {competitorCommission !=null && (
             <p>Total Avalpha Technologies commission: ₹{competitorCommission}</p>
          )}
        
      </div>
    </div>
  );
}

export default App;
