import React from "react";
import { useWeb3Transfer } from "react-moralis";
import  Moralis  from "moralis";
import { useState } from "react";

const TransferEth = () => {
  
  let wallet = document.getElementById("recibe")
  let amount = document.getElementById("monto")
  let msg = document.getElementById("error")
  
  const [address, setAddress] = useState("");

  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setAddress(e.target.value); // set name to e.target.value (event)
  };

  const [numero, setNumero] = useState("");

  const NumChange = (e) => {
    e.preventDefault(); // prevent the default action
    setNumero(e.target.value); // set name to e.target.value (event)
    if (e.target.value <= 0){
     msg.innerHTML = "Monto invalido, Debe ser mayor a 0"
    }else{
      msg.innerHTML = ""
    }
  };

  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(1) * amount ,
    receiver: wallet
  });




  return (
    // Use your custom error component to show errors
    <div>

      <input id="monto" type="text" placeholder="amount" onChange={NumChange} />
      <input id="recibe" type="text" placeholder="wallet a la q enviar" onChange={handleChange} />

      <h4 id="error"></h4>
      
      <button onClick={() => fetch()} disabled={isFetching}>          
        Transfer
      </button>
    </div>
  );
};

export default TransferEth;