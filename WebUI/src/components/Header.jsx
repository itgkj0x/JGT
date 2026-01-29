import React, { useEffect } from 'react'
import { useState } from 'react'
import { Group,Box,Button,ButtonGroup,Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { IoSyncCircle,IoPlayCircleSharp,IoVolumeMute } from "react-icons/io5";


const Header = () => {


    const [loading, setLoading] = useState(false);
    const [nowplay, setNowPlay] = useState(false);
    const [nowpreset, setNowPreset] = useState("Preset 1");

    return (
    <>
    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" p="10px" mb="20px" bg="gray.700">
        <Group>
            <Link to="/">
                <Text mx="4">JGT | WebUI</Text>
            </Link>
            <Link to={`/preset`}>
                <Button colorPalette="teal" variant="ghost">
                    Preset
                </Button>
            </Link>
            <Link to={`/edit`}>
                <Button colorPalette="teal" variant="ghost">
                    Edit
                </Button>
            </Link>
            <Link to={`/settings`}>
                <Button colorPalette="teal" variant="ghost">
                    Settings
                </Button>
            </Link>
        </Group>
        <Group>
            <Group> 
                {nowplay ?
                <ButtonGroup>
                <Button colorPalette="teal" variant="outline" onClick={() => setNowPlay(true)}>
                    <IoPlayCircleSharp /> Play
                </Button>
                <Button colorPalette="teal" variant="solid" onClick={() => setNowPlay(false)}>
                    <IoVolumeMute /> Mute
                </Button>
                </ButtonGroup>
                : 
                <ButtonGroup>
                <Button colorPalette="teal" variant="solid" onClick={() => setNowPlay(true)}>
                    <IoPlayCircleSharp /> Play
                </Button>
                <Button colorPalette="teal" variant="outline"  onClick={() => setNowPlay(false)}>
                    <IoVolumeMute /> Mute
                </Button>
                </ButtonGroup>
                }
                <Button colorPalette="teal" variant="outline">
                    <IoSyncCircle /> 再接続
                </Button>
            </Group>
            <Text mx="3">
                {loading ? 
                `Loading ${nowpreset}...` :
                `${nowpreset} ${nowplay ? '| 🎶' : '| 🔇'}`
                }
            </Text>
        </Group>
    </Box>
    </>
  )
}

export default Header