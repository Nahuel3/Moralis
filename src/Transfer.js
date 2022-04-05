import React from "react";
import { useWeb3Transfer } from "react-moralis";
import  Moralis  from "moralis";
import { useState } from "react";

const TransferEth = () => {


  const [address, setAddress] = useState("");

  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setAddress(e.target.value); // set name to e.target.value (event)

  };

  let wallet = document.getElementById("recibe")

  const {  fetch, error, isFetching } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(1) ,
    receiver: wallet
  });


  return (
    // Use your custom error component to show errors
    <div>

      <input id="monto" type="text" placeholder="amount" />
      <input id="recibe" type="text" placeholder="wallet a la q enviar" onChange={handleChange} />
      
      <button onClick={() => fetch()} disabled={isFetching}>          
        Transfer
      </button>
    </div>
  );
};

export default TransferEth;