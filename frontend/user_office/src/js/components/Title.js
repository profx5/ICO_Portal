import React from 'react'

const Title = ({
    text,
    type
}) => {
    switch(type) {
        case 'h1': {
            return  <h1 className="Header_head">{text}</h1>
        }
        case 'h2': {
            return  <h2 className="Header_head">{text}</h2>
        }
        case 'h3': {
            return  <h3 className="Header_head">{text}</h3>
        }
        case 'h4': {
            return  <h4 className="Header_head">{text}</h4>
        }
        default: {
            return  <span>{text}</span>
        }
    }
}

export default Title
