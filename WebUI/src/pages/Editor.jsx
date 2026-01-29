import Pedal_Bd from '../components/Pedal/Pedal_Bd.jsx'
import Pedal_List from '../components/Pedal/Pedal_List.jsx'
import React, { useState, useEffect } from 'react'
import { useParams,Navigate } from 'react-router-dom'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import pedalsData from '../db/pedals.json'
import Pedal from '../components/Pedal/Pedal.jsx'
import presetsData from '../db/presets.json'

const Editor = () => {

  const { id: urlId } = useParams();
  const [oldid, setOldid] = useState(urlId);
  const effectiveId = urlId || oldid;

  if(!oldid){
    console.log("Using old ID:", oldid);
    return <Navigate to="/preset" replace={true} />
  };

  const [droppedPedals, setDroppedPedals] = useState([]);
  const [activePedal, setActivePedal] = useState(null);
  const [presetData, setPresetData] = useState(null);

  useEffect(() => {
  if (effectiveId) {
    console.log("Editing item with ID:", effectiveId);
    setOldid(effectiveId);
    const preset = presetsData.Presets.find(p => p.id === effectiveId);
      if (preset) {
        console.log("Preset found:", preset);
        setPresetData(preset);
  }}
}, [effectiveId]);

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
      <Pedal_Bd preset={presetData} pedals={droppedPedals} setDroppedPedals={setDroppedPedals} />
      <Pedal_List pedals={pedals} />
      
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