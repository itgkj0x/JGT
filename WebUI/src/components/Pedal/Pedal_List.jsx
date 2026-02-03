import React from 'react'
import { Box,Flex, Collapsible, Stack } from '@chakra-ui/react'
import { LuChevronRight } from "react-icons/lu";
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
    <Flex w="40%" px="20px" m="10px" borderRadius="10px" bg="gray.800" direction="column">
      {pedalOrder.map((type) => {
        const filteredPedals = pedals.filter(pedal => pedal.type === type);
        
        // そのタイプのペダルがない場合はスキップ
        if (filteredPedals.length === 0) return null;

  return (
      <Collapsible.Root defaultClosed  key={type}  >
        <Collapsible.Trigger
          paddingY="3"
          display="flex"
          gap="2"
          alignItems="center"
        >
          <Collapsible.Indicator
            transition="transform 0.2s"
            _open={{ transform: "rotate(90deg)" }}
          >
            <LuChevronRight />
          </Collapsible.Indicator>
          {type}
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Flex p="4" borderRadius="md" bg="gray.700">
              <RowPedals pedals={filteredPedals} />
          </Flex>
        </Collapsible.Content>
      </Collapsible.Root>
  );
      })}
    </Flex>
  )
}

export default Pedal_List