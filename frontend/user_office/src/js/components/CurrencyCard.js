import React from 'react'
import styled from 'styled-components';

class CurrencyCard extends React.Component {
    render() {

        let {className, name, icon, rate} = this.props;

        return (
            <Card className={className}>
                <span className="currency-name">{name}</span>
                <img src={icon}/>
                <span>{rate}</span>
            </Card>
        )
    }
}



export default CurrencyCard;


const Card = styled.div`
    height: 157px;
    width: 12.5%;
    padding: 24px 24px;
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    border: solid 1px rgba(228, 232, 234, 0.25);
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.05);
    transition: all .25s ease;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
    &:not(:nth-child(7n)) {
        margin-right: 2.07%;
    }
    &.active {
        box-shadow: 0 2px 25px 0 rgba(63, 123, 244, 0.33);
        transform: scale(1.1);
    }
    .currency-name {
        font-size: 18px;
        color: #377afc;
        text-align: center;
        text-transform: uppercase;
    }
`;