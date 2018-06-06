import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';


class SessionsTable extends React.Component {

    constructor() {
        super();
        this.sessionsData = [
            {
                id: '1',
                date: '02.05.2018',
                ip: '89.178.18.78',
                agent: 'Mozilla/5.0 (Macintosh; Intel Mac…Mozilla/5.0 (Macintosh; Intel Mac…'
            },
            {
                id: '2',
                date: '03.05.2018',
                ip: '89.178.18.78',
                agent: 'Mozilla/5.0 (Macintosh; Intel Mac…Mozilla/5.0 (Macintosh; Intel Mac…'
            },
            {
                id: '3',
                date: '04.05.2018',
                ip: '89.178.18.78',
                agent: 'Mozilla/5.0 (Macintosh; Intel Mac…Mozilla/5.0 (Macintosh; Intel Mac…'
            },
        ]
    }

    generateRows = (data) => {
        return data.map((item,index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.ip}</td>
                    <td>{item.agent}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <StyledTable>
                <tbody>
                    <tr>
                        <td>#</td>
                        <td>Date</td>
                        <td>IP</td>
                        <td>User-agent</td>
                    </tr>
                    {this.generateRows(this.sessionsData)}
                </tbody>
            </StyledTable>
        )
    }
};


const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionsTable)


const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    tr {
        width: 380px;
    }
    tr:first-child td {
        font-size: 14px;
        color: #0a0a0a;
        font-weight: 600;
    }
    tr:nth-child(2n) {
        background: rgba(76,149,247,.06);
    }
    td {
        white-space: nowrap;
        height: 45px;
        &:first-of-type {
            padding: 0 20px;
        }
        &:nth-of-type(2) {
            padding-right: 30px;
        }
        &:nth-of-type(3) {
            padding-right: 40px;
        }
    }
`;