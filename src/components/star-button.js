import React from "react"
import { IconButton, Tooltip } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

export default function StarButton(launch) {
    return (
      <Tooltip
        label="Add to favorites"
        fontSize="md"
        placement="bottom"
        openDelay={1000}
        bg="gray.300"
        color="black"
      >
        <IconButton
          size="sm"
          zIndex="5"
          aria-label="Add to favorites"
          position="absolute"
          top={3}
          right={3}
          icon={<StarIcon color="grey" />}
        />
      </Tooltip>
    )
  }
  