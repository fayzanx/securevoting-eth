const errorReducer = ( state = {}, action ) => {
    const matches = /(.*)_(REQUEST|FAILURE)/.exec(action.type)

    if(!matches) return state

    const [, requestName, requestState] = matches
    return {
        ...state,
        [requestName]: 'FAILURE' === requestState ? action.payload.message : ''
    }
}

export default errorReducer