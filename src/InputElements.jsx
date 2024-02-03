import React from 'react'
import { thousand } from './funtions'



/**
 * 輸入框
 * @param allData 所有價格
 * @param setAllData 所有價格
 * @param index 此筆在所有價格中的index
 * @param value 此筆價格
 * @param negative 是否可為負數
 * @returns 
 */
export function PriceInput(props) {
    const handleInputChange = (e)=>{
        const newPrice = [...props.allData]
        newPrice[props.index].price = thousand(e.target.value, false)
        props.setAllData([...newPrice])
    }
    return (
        <div className='inputConTitle'>
          入住費用（每人每晚）
          <div className='priceInput'>
            <div className='inputTitle'>TWD</div>
            <input 
                className={props.value!==''? '': 'focus'}
                type="text" 
                value={props.value} 
                onChange={handleInputChange} 
                name='cost'
                placeholder='請輸入費用'/>
          </div>
          {props.value!==''? null: <div className='alertCon'><p>不可以為空白</p></div>}
          <p>輸入0表示免費</p>
        </div>
    )
}


/**
 * 下拉選單
 * @param allData 所有年齡
 * @param setAllData 所有年齡
 * @param dataIndex 此筆在所有年齡中的index
 * @param value 此筆年齡
 * @returns 
 */
export function AgeGroupSelect(props) {
    const ageOpts = Array.from({ length: 21 }, (_, i) => i)
    const handleSelectChange = (e, index, dataIndex)=>{
        const newAge = [...props.allData]
        newAge[dataIndex].ageGroup[index] = Number(e.target.value)
        props.setAllData([...newAge])
        if(props.ageConfirm){
            props.ageConfirm(newAge)
        }
    }
    return (
        <div className='inputConTitle'>
          年齡
          <div className='ageGroupSelect'>
            <select id="location" className={`${props.overlapping? 'focus ':''} left`} value={props.value[0]} onChange={(e)=>handleSelectChange(e, 0, props.dataIndex)}>
                {ageOpts.filter((e)=>e<props.value[1]).map((el)=>(
                    <option key={el} value={el}>{el}</option>
                ))}
            </select>
            <div className='selectTitle'>~</div>
            <select id="location" className={`${props.overlapping? 'focus ':''} right`} value={props.value[1]} onChange={(e)=>handleSelectChange(e, 1, props.dataIndex)}>
                {ageOpts.filter((e)=>e>props.value[0]).map((el)=>(
                    <option key={el} value={el}>{el}</option>
                ))}
            </select>
          </div>
          {props.overlapping?<div className='alertCon'><p>年齡區間不可重疊</p></div>:null}
        </div>
    )
}
