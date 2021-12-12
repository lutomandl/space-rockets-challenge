const initState = {
  favorites: [],
}

export default function favoritesReducer(state = initState, action) {
  if (action.type === "ADD_FAVORITE") {
    const newFavorites = state.favorites.concat(action.payload)
    return {
      ...state,
      favorites: newFavorites,
    }
  }
  if (action.type === "REMOVE_FAVORITE") {
    const newFavorites = state.favorites.filter((launch) => {
      return action.id !== launch.flight_number
    })
    return {
      ...state,
      favorites: newFavorites,
    }
  }
  return state
}
