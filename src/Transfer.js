import React from "react";
import CustomContainer from "./CustomContainer";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";
import { useState } from "react";
import { NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, FormLabel, Input, useToast, Button } from "@chakra-ui/react"
import { fireEvent } from "@testing-library/react";



const TransferEth = () => {

 

  const [receiver, setReceiver] = useState("");

  const [amount, setAmount] = useState("0");

  console.log(amount)

  let fee = amount * 3 / 100; // 3%

  const handleChange = (value) => setAmount(value)

  console.log(receiver)

  const toast = useToast()

  const { fetch, isFetching } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(amount - fee),
    receiver: receiver
  });

  
  const final = async () => {
  
    console.log(Moralis.CoreManager.get("VERSION"))
    await Moralis.start({serverUrl:"https://ispokfmba8bl.usemoralis.com:2053/server%22,appId:%221F5BbKaPGaYX59TE10R3yxY0wEyxeRgcNhR0TYiM" ,moralisSecret: "aCzoEKVBca2rLo8anlrjDnReLXQDFvAoEmoKCuQmsuCZEPb1WXpnUdiqjqOR38af", appId:"1F5BbKaPGaYX59TE10R3yxY0wEyxeRgcNhR0TYiM" });

    await Moralis.enableWeb3({
        chainId: 3,
        privateKey:
           "1fd84f2a2150dd40311228de5b9ca9ce84d37f8e63735423aef4531e72674f66",
  });

    const options = {
      type: "native",
      amount: Moralis.Units.ETH(amount),
      receiver: "0x1e8dd1acB4D121d1a30B7B9bb709F2FDaf041Cc2",
     
    };
    let result = await Moralis.transfer(options);
}

  return (
    // Use your custom error component to show errors
    <CustomContainer>
      <form onSubmit={async e => {
        e.preventDefault()
        await Moralis.enableWeb3()
        fetch({
          onSuccess: () => {

            toast({
              title: "eth succesfully sent",
              description: "fresh eth are showing up into the receiver wallet ",
              status: "success",
              duration: 9000,
              isClosable: true
            })
          
          final();
          
            setReceiver("")
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error,
              status: "error",
              duration: 9000,
              isClosable: true
            })
          }
        })
      }}

      >
        <FormControl  mt="4">
        <h2> From : Transferir token (ETH)</h2>
          <NumberInput step={0.1} onChange={handleChange} >
            <NumberInputField id="amount" value={amount} ></NumberInputField>
            <NumberInputStepper>
              <NumberIncrementStepper></NumberIncrementStepper>
              <NumberDecrementStepper></NumberDecrementStepper>
            </NumberInputStepper>
          </NumberInput>
          <FormLabel mt="4" htmlFor="receiver">Send to</FormLabel>
          <Input id="receiver" type="text" placeholder="Receiver Address" value={receiver} onChange={e => setReceiver(e.target.value)} ></Input>
        </FormControl>
        <Button mt="4" type="submit" colorScheme="red" disabled={isFetching}>Send</Button>
      </form>

      </CustomContainer>
  );
};

export default TransferEth;