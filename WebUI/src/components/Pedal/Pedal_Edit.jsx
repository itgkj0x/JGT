import React from 'react'
import { Box } from '@chakra-ui/react'

const Pedal_Edit = ({ pedals,id }) => {
  return (
    <>
    <Box
      w="60%"
      h="40vh"
      bg="gray.800"
      p="10px"
      m="10px"
      borderRadius="10px"
    >
      
    {id == null ? 
      <p>選択してください</p> 
      : <p>Pedal_Edit Component - {id}</p>
    }

    </Box>
    </>
  )
}

export default Pedal_Edit