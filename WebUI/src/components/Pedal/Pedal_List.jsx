import React from 'react'
import { Box,Flex } from '@chakra-ui/react'
import { useDraggable } from '@dnd-kit/core'
import Pedal from './Pedal.jsx'


const RowPedals = ({pedals}) => {
  return pedals.map((pedal) => {      
        const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
          id: pedal.id,
          data: { pedal } // ドラッグ時に渡すデータ
        });
        
        const style = {
          opacity: isDragging ? 0.5 : 1,
          cursor: 'grab'
        }

        return (
          <Pedal
            w="90px"
            h="130px"
            fontSize="10px"
            key={pedal.id} 
            id={pedal.id}
            name={pedal.name}
            type={pedal.type}
            color={pedal.color}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="pedal-item"
          />
        );
      })
    }


const Pedal_List = ({ pedals }) => {

  // 表示順を指定する配列
  const pedalOrder = ["Distortion", "Overdrive", "Modulation", "Delay", "Reverb", "Wah"];

  return (
    <Flex w="60%" p="10px" direction="column">
      {pedalOrder.map((type) => {
        const filteredPedals = pedals.filter(pedal => pedal.type === type);
        
        // そのタイプのペダルがない場合はスキップ
        if (filteredPedals.length === 0) return null;

        return (
          <Box key={type} bg="gray.800" borderRadius="10px"  p="10px" m="10px" >
              {type}
            <Flex >
              <RowPedals pedals={filteredPedals} />
            </Flex>
          </Box>
        );
      })}
    </Flex>
  )
}

export default Pedal_List