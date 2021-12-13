import {
  FAVORITES_ACTION_TYPE_ADD,
  FAVORITES_ACTION_TYPE_REMOVE,
} from "../components/actions/favoritesActions"

export const initState = {
  favorites: [],
}

export default function favoritesReducer(state = initState, action) {
  if (action.type === FAVORITES_ACTION_TYPE_ADD) {
    if (state.favorites.includes(action.payload)) {
      return state
    }
    const newFavorites = state.favorites.concat(action.payload)
    return {
      ...state,
      favorites: newFavorites,
    }
  }
  if (action.type === FAVORITES_ACTION_TYPE_REMOVE) {
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
