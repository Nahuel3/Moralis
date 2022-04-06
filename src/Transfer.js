import React from "react";
import CustomContainer from "./CustomContainer";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";
import { useState } from "react";
import { NumberInputField, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, FormLabel, Input, useToast, Button } from "@chakra-ui/react"

const TransferEth = () => {

  const [receiver, setReceiver] = useState("");


  const [amount, setAmount] = useState("0");

  console.log(amount)

  const handleChange = (value) => setAmount(value)

  console.log(receiver)

  const toast = useToast()

  const { fetch, isFetching } = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(amount),
    receiver: receiver
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
        <FormControl mt="4">
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