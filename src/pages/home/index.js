import React, {useEffect, useState} from "react";
import {getPeriods} from "../../Data";
import Element from "../../components/Element";
import {FirstRow, Groups} from "../../components/Table";

const Period = ({
                    data, number, f
                }) => {
    return (
        <tr>
            {f && (<td rowSpan={1} colSpan={3}></td>)}
            <td><h5 style={f ? {textAlign: 'right'} : {}} className="period">{f ? '*'.repeat(number - 5) : number}</h5>
            </td>
            {data.map((element, index) => <td><Element noTest star={element['star']} id={index} index={index}
                                                       element={element}/></td>)}
        </tr>
    )
}
const Home = () => {
    const [Fblock, setFblock] = useState([])
    const [periods, setPeriods] = useState(getPeriods()[0])
    useEffect(() => {
        const periods_ = getPeriods()
        setPeriods(periods_[0])
        setFblock(periods_[1])
    }, []);

    return (
        <div className='container-fluid pt-2'>
            <table>
                <tbody>
                <Groups/>
                <FirstRow noTest periods={periods}/>
                {periods.map((item, index) => index !== 1 &&
                    <Period number={index} data={item}/>)}
                <tr>
                    <td rowSpan={1} colSpan={18}><p></p></td>
                </tr>
                {Fblock.map((item, index) => <Period f
                                                     number={index + 6} data={item}/>)}
                </tbody>
            </table>
        </div>
    )
}
export default Home