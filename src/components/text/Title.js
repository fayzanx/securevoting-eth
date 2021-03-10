import React from 'react'

function Title( props ) {
    return (
        <div className="text-title">
            <h1 className="display-4">{ props.title }</h1>
            <p className="text-muted ml-2">{ props.subtitle }</p>
        </div>
    )
}

export default Title
