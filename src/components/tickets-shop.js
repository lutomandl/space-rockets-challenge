import React from "react"
import { Box, Image, SimpleGrid } from "@chakra-ui/react"

import { useSpaceXPaginated } from "../utils/use-space-x"
import Error from "./error"
import Breadcrumbs from "./breadcrumbs"
import LoadMoreButton from "./load-more-button"
import PurchaseModal from "./purchase-modal"

const PAGE_SIZE = 12

export default function TicketsShop() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  )
  console.log(data, error)
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Purchase launch tickets" },
        ]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <ShopItem launch={launch} key={launch.flight_number} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  )
}

function ShopItem({ launch }) {
  const price = Math.floor(Math.random() * 10 + 1) * 100000

  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      to={`/launches/${launch.flight_number.toString()}`}
    >
      <Image
        src={
          launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
          launch.links.mission_patch_small
        }
        alt={`${launch.mission_name} launch`}
        height={["200px", null, "300px"]}
        width="100%"
        objectFit="cover"
        objectPosition="bottom"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launch.mission_name}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h3"
          lineHeight="tight"
          isTruncated
        >
          Price: $ {price}
        </Box>
        <PurchaseModal launch={launch} price={price} />
      </Box>
    </Box>
  )
}
