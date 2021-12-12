import React from "react"
import { IconButton, Tooltip } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import { connect } from "react-redux"

function StarButton({ launch, ...props }) {
  let label = "Add to favorites"
  let iconColor = "grey"

  if (props.favorites.includes(launch.flight_number)) {
    label = "Remove from favorites"
    iconColor = "#FFB233"
  }

  return (
    <Tooltip
      label={label}
      fontSize="md"
      placement="bottom"
      openDelay={1000}
      bg="gray.300"
      color="black"
    >
      <IconButton
        size="sm"
        zIndex="5"
        aria-label={label}
        position="absolute"
        top={3}
        right={3}
        icon={<StarIcon color={iconColor} />}
      />
    </Tooltip>
  )
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites.map((launch) => launch.flight_number),
  }
}

export default connect(mapStateToProps)(StarButton)
