import React from 'react'
import { Dialog,Portal,CloseButton } from '@chakra-ui/react'

const Tuner = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root size="lg" placement="center" motionPreset="slide-in-bottom" isOpen={isOpen} onClose={onClose} open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title textAlign="center">Tuner</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
                This is Tuner.
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default Tuner