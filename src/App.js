import React, { useState } from 'react';
import './App.css';
import { AgeGroupSelect, PriceInput } from './InputElements';
import AgeGroupPriceList from './AgeGroupPriceList';
import { getNumberIntervals, thousand } from './funtions';

function App() {
  const [inputPrice, setInputPrice] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [ageResult, setAgeResult] = useState(null);
  
  const [result, setResult] = useState([{ageGroup: [0, 20], price: ''}]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name==='thousandth'){
      const newValue = thousand(value, true)
      setInputPrice(newValue);
    }else if(name==='block'){
      setInputAge(value);
    }
  };
  const confirm = () => {
    try {
      if (inputAge !== '') {
        const parsedIntervals = JSON.parse(inputAge);
  
        // 確保 parsedIntervals 是一個陣列
        if (Array.isArray(parsedIntervals)) {
          const ageResult = getNumberIntervals(parsedIntervals);
          setAgeResult(ageResult);
  
          console.log('重疊區間：');
          ageResult?.overlap.map(([start, end]) => {
            console.log(`[${start}, ${end}]`);
          });
  
          console.log('未包含區間：');
          ageResult?.allNum.map(([start, end]) => {
            console.log(`[${start}, ${end}]`);
          });
        } else {
          window.alert('輸入的不是有效的數字區間陣列');
        }
      } else {
        window.alert('未輸入');
      }
    } catch (error) {
      window.alert('請輸入正確的格式');
    }
  };

  return (
    <div className='App'>
      <div>
        千分位：<input type="text" value={inputPrice} onChange={handleInputChange} name='thousandth'/>
      </div>
      <br/>
      <div>
        <div className='ageRange'>
          找出重疊與未包含的數字區間：
          <textarea
            placeholder="輸入之格式範例：[[0, 5],[2, 3]]，最大的數字請勿超過20"
            value={inputAge}
            onChange={handleInputChange}
            name='block'
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={confirm}>確定</button>
        </div>
        <div>
          重疊:
          {ageResult?.overlap.map(([start, end], index) => (
            <p key={index}>{`[${start}, ${end}]`}</p>
          ))}
        </div>
        <div>
          未包含:
          {ageResult?.allNum.map(([start, end], index) => (
            <p key={index}>{`[${start}, ${end}]`}</p>
          ))}
        </div>
      </div>

      <br/>
      {/* PriceInput */}
      <div className='AgeGroupPriceList'>
        <div className='container'>
          <PriceInput
            allData={result}
            setAllData={setResult}
            index={0}
            value={result[0].price}
          />
        </div>
      </div>
      {/* AgeGroupSelect */}
      <div className='AgeGroupPriceList'>
        <div className='container'>
          <AgeGroupSelect
            allData={result}
            setAllData={setResult}
            dataIndex={0}
            value={result[0].ageGroup}
          />
        </div>
      </div>
      <AgeGroupPriceList/>
    </div>
  );
}

export default App;
