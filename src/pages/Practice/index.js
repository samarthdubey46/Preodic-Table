import React, {useEffect, useState} from "react";
import {D_BLOCK, diff_data, GET_BLOCK, getPeriods, P_BLOCK, S_BLOCK, TestData,} from "../../Data";
import Element from "../../components/Element";
import {FirstRow, Groups} from "../../components/Table";
import data from '../../Data/preodic.json'
import {useBlocker} from 'react-router'


const Period = ({
                    data, number, f, changeInputSymbol, symbols, isStarted,
                    evaluate,
                    evaluations,
                    setEvaluations,
                }) => {
    return (
        <tr>
            {f && (<td rowSpan={1} colSpan={3}></td>)}
            <td><h5 style={f ? {textAlign: 'right'} : {}} className="period">{f ? '*'.repeat(number - 5) : number}</h5>
            </td>
            {data.map((element, index) => <td><Element evaluate={evaluate} setEvaluations={setEvaluations}
                                                       evaluations={evaluations}
                                                       isStarted={isStarted} changeInputSymbol={changeInputSymbol}
                                                       symbols={symbols}
                                                       star={element['star']} id={index} index={index}
                                                       element={element}/></td>)}
        </tr>
    )
}
const Practice = () => {
    const [Fblock, setFblock] = useState([])
    const [periods, setPeriods] = useState(getPeriods()[0])
    const [diff, setDiff] = useState(1)
    const [symbols, setSymbols] = useState(TestData(diff))
    const [isStarted, setIsStared] = useState(false)
    const [evaluate, setEvaluate] = useState(false)
    const [evaluations, setEvaluations] = useState({'s': 0, 'p': 0, 'd': 0, 'f': 0})
    useEffect(() => {
        let Data = TestData(diff)
        setSymbols(Data)
        const periods_ = getPeriods()
        setPeriods(periods_[0])
        setFblock(periods_[1])
    }, []);
    useEffect(() => {
        let Data = TestData(diff)
        setSymbols(Data)
        setEvaluate(false)
    }, [diff]);
    useEffect(() => {
        if (evaluate) {
            let temp = {'s': 0, 'p': 0, 'd': 0, 'f': 0}
            setEvaluations(temp)
            symbols.forEach(item => {
                if (item.inTest) {
                    if (item.valueSymbol === item.symbol) {
                        temp[GET_BLOCK(item.number)] += 1
                    }
                }
            })
            setEvaluations(temp)
        }
    }, [evaluate])

    const changeInputSymbol = (value, number) => {
        setSymbols(prevState => prevState.map(item => item.number === number ? {...item, 'valueSymbol': value} : item))
    }
    const changeInputName = (value, number) => {
        setSymbols(prevState => prevState.map(item => item.number === number ? {...item, 'valueName': value} : item))
    }
    return (
        <div className='container-fluid pt-2'>
            <table>
                <tbody>
                <Groups/>
                <FirstRow evaluations={evaluations} setEvaluations={setEvaluations} evaluate={evaluate}
                          setEvaluate={setEvaluate} isStarted={isStarted} setIsStared={setIsStared}
                          diff={diff} setDiff={setDiff}
                          changeInputSymbol={changeInputSymbol} symbols={symbols} periods={periods}/>
                {periods.map((item, index) => index !== 1 &&
                    <Period isStarted={isStarted} evaluate={evaluate} evaluations={evaluations}
                            setEvaluations={setEvaluations}
                            changeInputSymbol={changeInputSymbol} symbols={symbols} number={index}
                            data={item}/>)}
                <tr>
                    <td rowSpan={1} colSpan={18}><p></p></td>
                </tr>
                {Fblock.map((item, index) => <Period isStarted={isStarted} evaluate={evaluate} evaluations={evaluations}
                                                     setEvaluations={setEvaluations}
                                                     changeInputSymbol={changeInputSymbol}
                                                     symbols={symbols} f
                                                     number={index + 6} data={item}/>)}
                </tbody>
            </table>
        </div>
    )
}
export default Practice