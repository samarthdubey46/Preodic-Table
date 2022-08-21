import {COLOR_CATEGORY, GET_BLOCK, ORDER} from "../../Data";
import React, {useEffect, useState} from "react";
import './index.css'

const InputElement = ({
                          element, star = 0, empty = false, changeInputSymbol, symbols,
                          isStarted,
                          evaluate,
                      }) => {

    const [loading, setLoading] = useState(true)
    const [right, setRight] = useState(false)
    useEffect(() => {
        if (evaluate) {
            if (symbols[element.number - 1].valueSymbol === element.symbol) {
                setRight(true)
            }
        } else {
            setRight(false)
        }
    }, [evaluate]);
    useEffect(() => {
        changeInputSymbol('', element.number)
    }, [isStarted]);

    useEffect(() => {
        if (symbols !== undefined) {
            setLoading(false)
        }
    }, [])
    if (empty || loading) {
        return (
            <div className="element-single elem">
                <p></p>
            </div>
        )
    }
    if (star > 0) {
        return (
            <div style={{}}
                 className="element-single d-flex justify-content-center align-items-center">
                <b className=''>{'*'.repeat(star)}</b>
            </div>
        )
    }
    return (
        <div>
            {/*<button onClick={() => console.log(Data)}>s</button>*/}
            <div style={{background: element['cpk-hex']}}
                 className={`element-single elem border ${symbols[element.number - 1].inTest ? "" : 'dim'}`}>
                <div className="elem-inside-top">
                    <b className='elem-inside atomic'>{element.number}</b>
                    <p className='elem-inside mass'>{element.atomic_mass.toFixed(2)}</p>

                </div>
                {((symbols[element.number - 1].inTest && !evaluate) && isStarted) ? (
                    <div className="elem-inside-main">
                        <input tabIndex={ORDER[element.number]} disabled={!isStarted}
                               className='input-Element elem-inside symbol'
                               onChange={(e) => {
                                   let temp = e.target.value
                                   if (symbols[element.number - 1].valueSymbol.length === 0 && temp.length === 1) {
                                       temp = temp[0].toUpperCase()
                                   }
                                   changeInputSymbol(temp, element.number)
                               }}
                               value={symbols[element.number - 1].valueSymbol}/>
                        {evaluate && <p className='elem-inside name'>{element.name}</p>}
                    </div>
                ) : (
                    <div className="elem-inside-main">
                        <b className='elem-inside symbol'
                           style={(evaluate && symbols[element.number - 1].inTest) ? {color: right ? 'green' : 'red'} : {}}>{element.symbol}</b>
                        <p className='elem-inside name'>{element.name}</p>
                    </div>
                )}

            </div>
        </div>

    )
}
const SimpleElement = ({element, star = 0, empty}) => {
    if (empty) {
        return (
            <div className="element-single elem">
                <p></p>
            </div>
        )
    }
    if (star > 0) {
        return (
            <div style={{}}
                 className="element-single d-flex justify-content-center align-items-center">
                <b className=''>{'*'.repeat(star)}</b>
            </div>
        )
    }
    return (
        <div>
            {/*<button onClick={() => console.log(Data)}>s</button>*/}
            <div style={{background: element['cpk-hex']}}
                 className={`element-single elem border `}>
                <div className="elem-inside-top">
                    <b className='elem-inside atomic'>{element.number}</b>
                    <p className='elem-inside mass'>{element.atomic_mass.toFixed(2)}</p>

                </div>
                <div className="elem-inside-main">
                    <b className='elem-inside symbol'>{element.symbol}</b>
                    <p className='elem-inside name'>{element.name}</p>
                </div>

            </div>
        </div>

    )
}
const Element = (props) => {
    if (props.noTest) {
        return <SimpleElement {...props}/>
    } else {
        return <InputElement {...props}/>
    }
}
export default Element
