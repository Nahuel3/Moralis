import React from "react";
import CustomContainer from "./CustomContainer";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";
import { useState } from "react";
import { NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, FormLabel, Input, useToast, Button } from "@chakra-ui/react"

const TransferEth = () => {


  const [amount, setAmount] = useState("0");

  console.log(amount)

  const handleChange = (value) => setAmount(value)

  const toast = useToast()

  const { fetch, isFetching } = useWeb3Transfer({
    type: "erc20",
    amount: Moralis.Units.Token(amount, 6),
    receiver: "0x78106429C8c7A18E0CfbDcA2bf8c7f453D7f2163",
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  });




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
        <FormControl mt="4">
            <h2>Transferir token (USDT)</h2>
          <NumberInput step={0.1} onChange={handleChange} >
            <NumberInputField id="amount" value={amount} ></NumberInputField>
            <NumberInputStepper>
              <NumberIncrementStepper></NumberIncrementStepper>
              <NumberDecrementStepper></NumberDecrementStepper>
            </NumberInputStepper>
          </NumberInput>
          <FormLabel mt="4" htmlFor="receiver">Send to</FormLabel>
        </FormControl>
        <Button mt="4" type="submit" colorScheme="red" disabled={isFetching}>Send</Button>
      </form>

      </CustomContainer>
  );
};

export default TransferEth;