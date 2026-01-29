import React, { useEffect,useState } from 'react';
import { Text,Box,Flex } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import Pedal from './Pedal.jsx';
import Pedal_Edit from './Pedal_Edit.jsx';

const Pedal_Bd = ({ preset,pedals,setDroppedPedals }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'effect-bd'
  });

  


  const handleRemovePedal = (id) => {
    setDroppedPedals((prevPedals) => 
      prevPedals.filter(p => p.id !== id)
    );
  };

  const [isOpen, setOpen] = useState(null);

  const handlePedal_Edit = (id) => {
    setOpen(id);
  }

  useEffect(() => {
    console.log("Editing pedal with ID:", isOpen);
  }, [isOpen]);

  return (
    <>
    <Box
      ref={setNodeRef}
      className={`effect-bd ${isOver ? 'over' : ''}`}
      border={isOver ? '2px solid blue' : '2px dashed gray'}
      p="20px"
      minH="300px"
      bg="gray.800"
      borderRadius="10px"
    >
      <Text>{preset ? `${preset.id}-${preset.name}` : "No Preset Selected"}</Text>
      
      <Flex wrap="wrap" gap="10px">
        {pedals.length === 0 ? (
          <p style={{ color: '#999' }}>ペダルをドラッグして追加</p>
        ) : (
          pedals.map((pedal) => (
            <Pedal 
              id={pedal.id}
              name={pedal.name}
              type={pedal.type}
              color={pedal.color}
              _hover={{ bg: 'whiteAlpha.700' }}
              key={pedal.id}
              onClick={() => handlePedal_Edit(pedal.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleRemovePedal(pedal.id);
              }}
              />
          ))
        )}
      </Flex>
      
      {isOver && <p style={{ color: 'blue', marginTop: '10px' }}>ここにドロップ</p>}
    </Box>
    <Pedal_Edit pedals={pedals} id={isOpen} onClose={() => setOpen(null)} />
    </>
  );
};

export default Pedal_Bd;