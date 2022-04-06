import React from "react";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";
import { useState } from "react";
import { NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, FormLabel, Input } from "@chakra-ui/react"

const TransferEth = () => {



  let msg = document.getElementById("error")

  const [receiver, setReceiver] = useState("");


  const [amount, setAmount] = useState("0");

  console.log(amount)

  const handleChange = (value) => setAmount(value)

 console.log(receiver)

  const { fetch, isFetching } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(1) * amount,
    receiver: receiver
  });




  return (
    // Use your custom error component to show errors
    <div>
      <form>
        <FormControl mt="4">
          <NumberInput step={0.1}  onChange={handleChange} >
            <NumberInputField id="amount" value={amount} ></NumberInputField>
            <NumberInputStepper>
              <NumberIncrementStepper></NumberIncrementStepper>
              <NumberDecrementStepper></NumberDecrementStepper>
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormLabel mt="4" htmlFor="receiver">Send to</FormLabel>
        <Input id="receiver" type="text" placeholder="Receiver Address" value={receiver} onChange={e => setReceiver(e.target.value)} ></Input>
      </form>


      <h4 id="error"></h4>

      <button onClick={() => fetch()} disabled={isFetching}>
        Transfer
      </button>
    </div>
  );
};

export default TransferEth;