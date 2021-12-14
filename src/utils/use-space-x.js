import useSWR, { useSWRInfinite } from "swr"

const fetcher = async (...args) => {
  const response = await fetch(...args)
  if (!response.ok) {
    throw Error(response.statusText)
  }
  const data = await response.json()

  // Due to a bug in SpaceX API, which is returning two upcoming launches with a single flight_number.
  if (Array.isArray(data)) {
    return handleDuplicates(data)
  }

  return data
}

function getSpaceXUrl(path, options) {
  const searchParams = new URLSearchParams()
  for (const property in options) {
    searchParams.append(property, options[property])
  }

  const spaceXApiBase = process.env.REACT_APP_SPACEX_API_URL
  return `${spaceXApiBase}${path}?${searchParams.toString()}`
}

export function useSpaceX(path, options) {
  const endpointUrl = getSpaceXUrl(path, options)
  return useSWR(path ? endpointUrl : null, fetcher)
}

export function useSpaceXPaginated(path, options) {
  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null
    }
    return getSpaceXUrl(path, {
      ...options,
      offset: options.limit * pageIndex,
    })
  }, fetcher)
}

function handleDuplicates(data) {
  console.log(data)
  return data
    .map((launch) => launch.flight_number)
    .map((flNumber, i, flNumbers) => flNumbers.indexOf(flNumber) === i && i)
    .filter((launchIndex) => data[launchIndex])
    .map((launchIndex) => data[launchIndex])
}
