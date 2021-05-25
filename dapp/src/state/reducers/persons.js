const personsReducer = ( persons=[], action ) => {
    switch( action.type ){
        case 'FETCH_ALL':
            return persons
        default:
            return persons
    }
}

export default personsReducer