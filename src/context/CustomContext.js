import React, { Component, createContext } from 'react'

const { Provider, Consumer } = createContext({})

/* ------------- Wraper Context Parent ------------- */
export const ContextProvider = (props) => {
    return (
      <Provider value={props.value}>
        {props.children}
      </Provider>
    )
}
/* ------------- End ------------- */

/* ------------- Call Context Values From Parent ------------- */
export const WithContext = (Component) => {
  return (props) => (
    <Consumer>
      {contenx => <Component {...props} {...contenx} />}
    </Consumer>
  )
}
/* ------------- End ------------- */

export default ContextProvider
