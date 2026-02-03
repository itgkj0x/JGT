import React, { useEffect } from 'react'
import { Group,Box,Button,Text,useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { IoSyncCircle,IoPlayCircleSharp,IoVolumeMute } from "react-icons/io5";
import { GiGuitarHead } from "react-icons/gi";
import Tuner from './Tuner';


const Header = ({ State, setState }) => {

    const handleMute = () => {
        setState(prev => ({ ...prev, nowplay: false }))
    }

    const handlePlay = () => {
        setState(prev => ({ ...prev, nowplay: true }))
    }

    const { open, onOpen, onClose } = useDisclosure()

    const handleReconnect = () => {
        // Reconnection logic here
    }

    useEffect(() => {
        console.log("Header State:", State);
    }, [State]);

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
            <Link to={`/setting`}>
                <Button colorPalette="teal" variant="ghost">
                    Settings
                </Button>
            </Link>
        </Group>
        <Group>
            <Group> 
                {State.nowplay ?
                <Button colorPalette="teal" variant="outline" onClick={handleMute}>
                    <IoVolumeMute /> Mute
                </Button>
                : 
                <Button colorPalette="teal" variant="solid" onClick={handlePlay}>
                    <IoPlayCircleSharp /> Play
                </Button>
                }
                <Button colorPalette="teal" variant="outline" onClick={onOpen}>
                    <GiGuitarHead /> Tuner
                </Button>
                <Tuner isOpen={open} onClose={onClose} />
                <Button colorPalette="teal" variant="surface" >
                    <IoSyncCircle /> 再接続
                </Button>
            </Group>
            <Text mx="3">
                {State.loading ? 
                `Loading ${State.nowpreset}...` :
                `${State.nowpreset} ${State.nowplay ? '| 🎶' : '| 🔇'}`
                }
            </Text>
        </Group>
    </Box>
    </>
  )
}

export default Header