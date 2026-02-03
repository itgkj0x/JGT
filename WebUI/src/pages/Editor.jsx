// react imports
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { Flex } from '@chakra-ui/react'

//components
import Pedal_Bd from '../components/Pedal/Pedal_Bd.jsx'
import Pedal_List from '../components/Pedal/Pedal_List.jsx'
import Pedal_Edit from '../components/Pedal/Pedal_Edit.jsx'
import Pedal from '../components/Pedal/Pedal.jsx'

// DB
import pedalsData from '../db/pedals.json'
import presetsData from '../db/presets.json'

const Editor = ({ setState }) => {
  const [isPedalEditOpen, setPedalEditOpen] = useState(null);

  const { id } = useParams();

  const [droppedPedals, setDroppedPedals] = useState([]);
  const [activePedal, setActivePedal] = useState(null);
  const [presetData, setPresetData] = useState(null);

  useEffect(() => {
    const preset = presetsData.Presets.find(p => p.id === id);
      if (preset) {
        console.log("Preset found:", preset);
        setPresetData(preset);
        setState(prev => ({ ...prev, nowpreset: preset.id }));
        
        // Load pedals from preset
        if (preset.pedals && preset.pedals.length > 0) {
          const loadedPedals = preset.pedals.map((presetPedal, index) => {
            const pedalInfo = pedalsData.pedals.find(p => p.id === presetPedal.pedal_id);
            if (pedalInfo) {
              return {
                id: pedalInfo.id,
                name: pedalInfo.name,
                type: pedalInfo.type,
                color: pedalInfo.color,
                knob: pedalInfo.knob,
                settings: presetPedal.settings,
                boardId: `${pedalInfo.id}-${index}`
              };
            }
            return null;
          }).filter(Boolean);
          
          setDroppedPedals(loadedPedals);
        }
      }
  }, [id]);

  // pedals.jsonから取得
  const pedals = pedalsData.pedals.map((pedal) => ({
    id: pedal.id,
    name: pedal.name,
    type: pedal.type,
    color: pedal.color,
    knob: pedal.knob
  }));

  const handleDragStart = (event) => {
    const pedalData = event.active.data.current?.pedal;
    setActivePedal(pedalData);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActivePedal(null);
    
    if (over?.id === 'effect-bd') {
      const pedalData = active.data.current?.pedal;
      if (!pedalData) return;
      
      console.log('ペダルを追加:', pedalData);
      
      setDroppedPedals((prevPedals) => {
        const alreadyExists = prevPedals.some(p => p.id === pedalData.id);
        if (alreadyExists) {
          return prevPedals;
        }
        return [...prevPedals, { ...pedalData, boardId: `${pedalData.id}-${Date.now()}` }];
      });
    }
  };

  return (
    <DndContext 
      collisionDetection={closestCenter} 
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Pedal_Bd preset={presetData} pedals={droppedPedals} setDroppedPedals={setDroppedPedals} setPedalEditOpen={setPedalEditOpen} isPedalEditOpen={isPedalEditOpen} />
      <Flex w="90%" m="10px auto" justifyContent="center" >
        <Pedal_List pedals={pedals} />
        <Pedal_Edit pedals={pedals} id={isPedalEditOpen} onClose={() => setPedalEditOpen(null)}/>
      </Flex>
      <DragOverlay>
        {activePedal ? (
          <Pedal
            w="90px"
            h="130px"
            fontSize="10px"
            id={activePedal.id}
            name={activePedal.name}
            type={activePedal.type}
            color={activePedal.color}
            className="pedal-item"
            style={{ opacity: 1, cursor: 'grabbing' }}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Editor