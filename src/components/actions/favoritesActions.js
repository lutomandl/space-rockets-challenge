export const FAVORITES_ACTION_TYPE_ADD = "ADD_FAVORITE"
export const FAVORITES_ACTION_TYPE_REMOVE = "REMOVE_FAVORITE"

export function removeFavorite(flight_number) {
  return { type: FAVORITES_ACTION_TYPE_REMOVE, id: flight_number }
}

export function addFavorite(launch) {
  return { type: FAVORITES_ACTION_TYPE_ADD, payload: launch }
}
