import React, { useEffect, useState } from 'react'
import { AgeGroupSelect, PriceInput } from './InputElements'
import addIcon from './assets/icon/addIcon.svg'
import removeIcon from './assets/icon/removeIcon.svg'
import { getNumberIntervals } from './funtions';

export default function AgeGroupPriceList() {
    const [result, setResult] = useState([{ageGroup: [0, 20], price: ''}]);
    /** 年齡區間是否重疊 */
    const [overlapping, setOverlapping] = useState([]);
    /** 是否有尚未設定的年齡 */
    const [notInClude, setNotInClude] = useState(true);


    useEffect(()=>{
        console.log('result=', result)
    }, [result])

    const ageConfirm = (data) => {
        //確認年齡區間有無重疊
        const agesArray = data.map(item => item.ageGroup);
        const ageResult = getNumberIntervals(agesArray)
        setOverlapping(ageResult?.overlapDataIndex)
        setNotInClude(ageResult?.allNum?.length>0)
    }
    const adding = () => {
        const newResult = [...result]
        newResult.push({ageGroup: [0, 20], price: ''})
        setResult([...newResult])
        ageConfirm(newResult)
    }
    const remove = (index) => {
        let newResult = [...result]
        newResult = newResult.slice(0, index).concat(newResult.slice(index+1))
        setResult([...newResult])
        ageConfirm(newResult)
    }
    return (
        <div className='AgeGroupPriceList'>
            {result.map((el, index)=>(
                <React.Fragment key={index}>
                    <div className='listTitle'>
                        <p>價格設定 - {index+1}</p>
                        {index===0?<p></p>: <p className='removeButton' onClick={()=>remove(index)}>
                            <img className='icon' src={removeIcon} alt="移除" />移除
                        </p>}
                    </div>
                    <div className='container'>
                        {/* AgeGroupSelect */}
                        <AgeGroupSelect
                            allData={result}
                            setAllData={setResult}
                            dataIndex={index}
                            value={el.ageGroup}
                            overlapping={overlapping.find((e)=>e===index)||overlapping.find((e)=>e===index)===0? true: false}
                            ageConfirm={ageConfirm}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {/* PriceInput */}
                        <PriceInput
                            allData={result}
                            setAllData={setResult}
                            index={index}
                            value={el.price}
                        />
                    </div>
                    {index===result.length-1? 
                        <button className={`addButton ${notInClude? '': ' disabled'}`} onClick={adding} disabled={!notInClude}><img className='icon' src={addIcon} alt="新增價格" />新增價格設定</button>
                        : <hr/>
                    }
                </React.Fragment>
            ))}
        </div>
    )
}
