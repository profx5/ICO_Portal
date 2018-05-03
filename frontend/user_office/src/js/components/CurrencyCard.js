import React from 'react'
import styled from 'styled-components';

class CurrencyCard extends React.Component {
    render() {

        let {className, name, icon, rate, clickHandler} = this.props;

        return (
            <Card onClick={clickHandler} className={className}>
                <span className="currency-name">{name}</span>
                <span className={icon + '-alt'}></span>
                <span className="currency-rate">{rate} $</span>
            </Card>
        )
    }
}



export default CurrencyCard;


const Card = styled.div`
    min-height: 157px;
    width: 12.5%;
    padding: 12px 16px;
    margin-bottom: 18px;
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    border: solid 1px rgba(228, 232, 234, 0.25);
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.05);
    transition: all .25s ease;
    cursor: pointer;
    will-change: transform;
    &:hover {
        [class^="icon-"] {
            color: rgba(80,154,245,1) !important;
            transform: scale3d(1.05,1.05,1.05);
        }
        .currency-rate {
            color: #3476fc;
        }
    }
    &:not(:nth-child(7n)) {
        margin-right: 2.07%;
    }
    &.active {
        box-shadow: 0 2px 25px 0 rgba(63, 123, 244, 0.33);
        transform: scale3d(1.05,1.05,1.05);
        [class^="icon-"] {
            color: rgba(80,154,245,1) !important;
            transform: scale3d(1.05,1.05,1.05);
        }
        .currency-rate {
            color: #3476fc;
        }
    }
    .currency-name {
        font-size: 18px;
        color: #377afc;
        text-align: center;
        text-transform: uppercase;
    }
    [class^="icon-"] {
        font-size: 50px;
        margin: 20px 0;
        color: rgba(80,154,245,.5);
        transition: all .25s ease;
    }
    .currency-rate {
        font-size: 14px;
        color: rgba(50,60,71,.6);
        transition: color .25s ease;
        white-space: nowrap;
    }
`;