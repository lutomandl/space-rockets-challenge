import favoritesReducer, { initState } from "./favoritesReducer"
import {
  addFavorite,
  removeFavorite,
} from "../components/actions/favoritesActions"

const testLaunch1 = {
  flight_number: 42,
  name: "ABC",
}

const testLaunch2 = {
  flight_number: 43,
  name: "DEFG",
}

describe("test favorites actions", () => {
    it("adds object to favorites", () => {
    expect(
        favoritesReducer(initState, addFavorite(testLaunch1)).favorites
    ).toMatchObject([testLaunch1])
    })

    it("removes object from favorites", () => {
    const newState = favoritesReducer(initState, addFavorite(testLaunch1))
    expect(
        favoritesReducer(newState, removeFavorite(testLaunch1.flight_number))
        .favorites
    ).toMatchObject([])
    })

    it("does not remove from favorites what's not there", () => {
    const newState = favoritesReducer(initState, addFavorite(testLaunch1))
    expect(
        favoritesReducer(newState, removeFavorite(testLaunch2.flight_number))
        .favorites
    ).toMatchObject([testLaunch1])
    })

    it("does not add to favorites what is already there", () => {
    const newState = favoritesReducer(initState, addFavorite(testLaunch1))
    expect(
        favoritesReducer(newState, addFavorite(testLaunch1)).favorites
    ).toMatchObject([testLaunch1])
    })
})