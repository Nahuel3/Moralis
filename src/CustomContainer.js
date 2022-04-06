import {Box} from "@chakra-ui/react"
import React from 'react'

const CustomContainer = ({children}) => {
  return (
    <Box bg="lightblue" width="400px" height="auto" px="20" py="10" rounded="lg" shadow="lg" textAlign="center" justifyContent="center" mt="30px" ml="30px" mr="30px">
        {children}
    </Box>
  )
}

export default CustomContainer