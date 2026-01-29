import { Box } from '@chakra-ui/react'
import React from 'react'

const Pedal = ({id, name, type, color, ...props}) => {
  
  const colorMap = {
    yellow: 'yellow.600',
    green: 'green.600',
    blue: 'blue.600',
    purple: 'purple.600',
    orange: 'orange.600',
    red: 'red.600'
  };

  return (
    <Box 
      w="150px" 
      h="220px" 
      bg={colorMap[color] || 'gray.700'}
      p="10px" 
      m="10px" 
      boxShadow={1} 
      borderRadius="10px" 
      className="pedal-item"
      {...props}
    >
      <div>{name}<br/>{type}</div>
    </Box>
  )
}

export default Pedal