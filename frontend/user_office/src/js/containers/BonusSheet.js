import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components';

class BonusSheet extends React.Component{
    render() {
        return (
            <Wrapper>
                <Head>Progressive bonus for private presale!</Head>
                <TableWrapper>
                    <div className="row">
                        <div className="part">Minimum sum of buy $ 8 000</div>
                        <div className="part">Get 20% tokens as a bonus!</div>
                    </div>
                    <div className="row">
                        <div className="part">Minimum sum of buy $ 20 000</div>
                        <div className="part">Get 30% tokens as a bonus!</div></div>
                </TableWrapper>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({user}) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BonusSheet)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Head = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: #323c47;
    letter-spacing: 0.1px;
    margin-bottom: 40px;
`;

const TableWrapper = styled.div`
    .row {
        display: flex;
        border-radius: 2px;
        &:first-of-type {
            margin-bottom: 20px;
        }
        .part {
            flex-basis: 50%;
            padding-left: 32px;
            line-height: 70px;
            font-weight: 600;
            height: 70px;
            border: 1px solid #d6dfe6;
            &:first-of-type {
                color: #0a0a0a;
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
            }
            &:last-of-type {
                color: #3375fc;
                border-left: none;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
            }
        }
    }
`;