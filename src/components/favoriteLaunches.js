import React from "react"
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react"

export default function FavoriteLaunches() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button mr={5} mt={5} ref={btnRef} onClick={onOpen}>
        Favorites
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Your Favorite Launches
          </DrawerHeader>
          <DrawerBody>
            <p>You have no favorite launches yet...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
