import React, {useEffect, useState} from "react";
import Element from "../Element";
import '../../pages/Practice/index.css'
import {Form, Table} from "react-bootstrap";
import {Totals} from "../../Data";

export const Groups = () => {
    return (
        <tr>
            <td></td>
            {new Array(18).fill(null).map((i, index) => (
                <td style={{textAlign: 'center'}}>
                    <h5 className="period">{index + 1}</h5>
                </td>
            ))}
        </tr>
    )
}
export const Evaluation = ({evaluations = {}, diff, evaluate}) => {
    let [totals, setTotals] = useState(Totals[diff])

    useEffect(() => {
        setTotals(Totals[diff])
    }, [diff]);
    return (
        <div style={{position: 'absolute', bottom: -10, display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Table striped bordered hover style={{width: '95%',}} size="sm">
                <thead>
                <tr>
                    <th>Block</th>
                    <th>Total</th>
                    <th>Correct</th>
                    <th>Wrong</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>S-block</td>
                    <td>{totals['s']}</td>
                    <td>{evaluations['s']}</td>
                    <td>{evaluate ? totals['s'] - evaluations['s'] : 0}</td>
                </tr>
                <tr>
                    <td>P-block</td>
                    <td>{totals['p']}</td>
                    <td>{evaluations['p']}</td>
                    <td>{evaluate ? totals['p'] - evaluations['p'] : 0}</td>
                </tr>
                <tr>
                    <td>D-block</td>
                    <td>{totals['d']}</td>
                    <td>{evaluations['d']}</td>
                    <td>{evaluate ? totals['d'] - evaluations['d'] : 0}</td>
                </tr>
                <tr>
                    <td>F-block</td>
                    <td>{totals['f']}</td>
                    <td>{evaluations['f']}</td>
                    <td>{evaluate ? totals['f'] - evaluations['f'] : 0}</td>
                </tr>

                </tbody>
            </Table>
        </div>
    )
}
export const FirstRow = ({
                             periods,
                             changeInputSymbol,
                             symbols,
                             diff,
                             setDiff,
                             evaluate,
                             setEvaluate,
                             isStarted,
                             setIsStared,
                             evaluations,
                             setEvaluations,
                             noTest = false
                         }) => {
    return (
        <tr>
            <td><h5 className="period">1</h5></td>
            <td><Element noTest={noTest} evaluate={evaluate} setEvaluations={setEvaluations} evaluations={evaluations}
                         isStarted={isStarted} changeInputSymbol={changeInputSymbol} symbols={symbols}
                         element={periods[1][0]}/></td>
            <td><Element noTest changeInputSymbol={changeInputSymbol} symbols={symbols} empty element={periods[1][0]}/></td>
            <td rowSpan={3} colSpan={10} style={{padding: 0, margin: 0, verticalAlign: 'bottom', position: 'relative'}}>
                {!noTest && <Evaluation diff={diff} evaluate={evaluate} evaluations={evaluations}/>}
            </td>
            <td rowSpan={1} colSpan={5}>
                {!noTest && <div className="d-flex align-items-end justify-content-around"
                                 style={{width: '100%', height: '100%'}}>
                    <div style={{flex: .6,}}>
                        <label className="p-sm-rectangle label-diff">Difficulty</label>
                        <Form.Select disabled={isStarted} value={diff} onChange={event => setDiff(event.target.value)}
                                     size="sm"
                                     className="select-diff">
                            <option value="1">Easy</option>
                            <option value="2">Medium</option>
                            <option value="3">Hard</option>
                            <option value="4">Pro</option>
                            <option value="5">Legendary</option>
                        </Form.Select>
                    </div>
                    <div style={{flex: .4, justifyContent: 'center', display: 'flex'}}>
                        {!isStarted ? (
                            <button tabIndex={-1} onClick={() => {
                                setEvaluate(false)
                                setIsStared(true)
                            }} className="btn btn-success"
                                    style={{margin: 0}}>START</button>
                        ) : (

                            <button tabIndex={-1} onClick={() => {
                                setIsStared(false)
                                setEvaluate(true)
                            }} className="btn btn-danger"
                                    style={{margin: 0}}>STOP</button>
                        )}

                    </div>
                </div>}
            </td>
            <td><Element noTest={noTest} evaluate={evaluate} setEvaluations={setEvaluations} evalutions={evaluations}
                         isStarted={isStarted} changeInputSymbol={changeInputSymbol} symbols={symbols}
                         element={periods[1][1]}/></td>
        </tr>
    )
}