import React from 'react'
import { Table, OverlayTrigger, Image, Tooltip, Button } from 'react-bootstrap'

function Candidates(props) {

    const renderTableRow = (candidate, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <b>{candidate.name}</b><br />
                    {candidate.cnic}
                </td>
                <td>
                    <b>{candidate.partyInfo.abbreviation}</b><br />
                    {candidate.partyInfo.name}
                </td>
                <td>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>{candidate.partyInfo.symbolName}</Tooltip>}>
                        <Image src={candidate.partyInfo.symbol} fluid />
                    </OverlayTrigger>
                </td>
                <td className="text-center">
                    {props.result ? candidate.votes : <Button variant="success" size="md">VOTE</Button>}
                </td>
            </tr>
        )
    }

    return (
        <div className="table-candidates">
            <Table bordered striped hover className="portal-candidates">
                <thead>
                    <tr>
                        <th>#</th><th>Name</th><th>Party</th><th>Symbol</th>{props.result ? <th>Votes</th> : <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.tableData.map(renderTableRow)}
                </tbody>
            </Table>
        </div>
    )
}

export default Candidates
