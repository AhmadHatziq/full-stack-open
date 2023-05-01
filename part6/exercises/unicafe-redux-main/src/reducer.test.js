import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  // When passing in a random action with undefined state, it should return the initial state. 
  test('Should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)

  })

  // Deep freeze the state before, passes it into the reducer. The state must not be mutated. 
  test('State is not mutated', () => {
    const state = {} 
    
    deepFreeze(state)
    const newState = counterReducer(state, {type: 'DO_NOTHING'})
    expect(newState).toEqual(state)
  })

  // When action is GOOD, the state.good should increment by 1. 
  test('Good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
})