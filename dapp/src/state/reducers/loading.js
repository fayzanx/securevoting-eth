const loadingReducer = ( state = {}, action ) => {
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type)

    if(!matches) return state

    const [, requestName, requestState] = matches
    return {
        ...state,
        [requestName]: 'REQUEST' === requestState
        // e.g. party: true, when PARTY_REQUEST is dispatches
    }
}

export default loadingReducer