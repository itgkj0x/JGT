import React from 'react'
import { Link } from 'react-router-dom'
import { Card,Button,Flex} from '@chakra-ui/react'
import presetData from '../db/presets.json'

const Preset = ({ setState }) => {

    const PresetBox = ({id,label}) => (
        <Card.Root w="20%" m="10px">
            <Card.Header />
            <Card.Body >
                <Card.Title p="10px">{label}</Card.Title>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Link to={`/edit/${id}`}>
                <Button variant="outline">Edit</Button>
                </Link>
                <Button onClick={() => setState(prev => ({ ...prev, nowpreset: id }))}>Use</Button>
            </Card.Footer>
        </Card.Root>
    )

    const Presets = presetData.Presets.map((preset) => ({
        id: preset.id,
        name: preset.name,
    }));
    

    return (
    <>
    <Flex borderRadius="10px" bg="gray.800" p="10px" m="10px" flexWrap="wrap" justifyContent="center">
        {Presets.map((preset) => (
            <PresetBox 
                key={preset.id}
                id={preset.id}
                label={preset.name}
            />
        ))}
    </Flex>
    </>
  )
}

export default Preset