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
  SimpleGrid,
} from "@chakra-ui/react"
import { connect } from "react-redux"

import { LaunchItem } from "./launches"

function FavoriteLaunches(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const launches = props.favorites

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
            Your Favorite Launches ({props.favorites.length})
          </DrawerHeader>
          <DrawerBody>
            {launches.length > 0 ? (
              <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
                {launches &&
                  launches
                    .flat()
                    .map((launch) => (
                      <LaunchItem launch={launch} key={launch.flight_number} />
                    ))}
              </SimpleGrid>
            ) : (
              <p>You have no favorite launches yet...</p>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  }
}

export default connect(mapStateToProps)(FavoriteLaunches)
