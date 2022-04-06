import {Box} from "@chakra-ui/react"
import React from 'react'

const CustomContainer = ({children}) => {
  return (
    <Box bg="lightblue" width="600px" height="full" px="20" py="10" rounded="lg" shadow="lg" textAlign="center" justifyContent="center" mt="30px">
        {children}
    </Box>
  )
}

export default CustomContainer