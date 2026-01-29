import React from 'react'
import { Box } from '@chakra-ui/react'

const Pedal_Edit = ({ pedals,id }) => {
  return (
    <>
    <Box
      position="absolute"
      right="10px"
      w="20%"
      h="40vh"
      bg="gray.800"
      p="10px"
      m="10px"
      borderRadius="10px"
      boxShadow={1}
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