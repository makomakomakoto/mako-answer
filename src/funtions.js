
/** 千分位數字限制 */
export const thousand = (value, isNegativeOk)=>{
    let newValue = value
    if(isNegativeOk){
        newValue = value.replace(/[^\d\-.]/g, '');
    }else{
        newValue = value.replace(/[^\d\.]/g, '');
    }
    const dot = value.split('.').length - 1;
    const minus = value.split('-').length - 1;
    //如果小數點、負號數量大於一，或負號不在第一位
    if (dot > 1 || minus > 1 || value.indexOf('-') > 0) {
      return value.slice(0, value.length-1);
    }
    return addComma(newValue)
}
/** 處理千分位 */
const addComma = (number) => {
    const [integer, decimal] = number.toString().split(".");
    const thousandth = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    if (decimal !== undefined) {
      return `${thousandth}.${decimal}`;
    } else {
      return thousandth;
    }
};

  /** 找出重疊與未包含的數字區間： */
export const getNumberIntervals = (intervals) => {
    const allNum = Array.from({ length: 21 }, (_, i) => i);
    const overlap = [];
    const overlapDataIndex = [];
  
    for (let i = 0; i < intervals.length; i++) {
      for (let j = i + 1; j < intervals.length; j++) {
        const [start1, end1] = intervals[i];
        const [start2, end2] = intervals[j];
        if (start1 <= end2 && start2 <= end1) {
          const overlapStart = Math.max(start1, start2);
          const overlapEnd = Math.min(end1, end2);
          overlap.push([overlapStart, overlapEnd]);
          overlapDataIndex.push(i)
          overlapDataIndex.push(j)
        }
      }
    }
    // 排序
    const a = [];
    if(overlap?.length>0){
        overlap.sort((a, b) => a[0] - b[0]);
        let currentInterval = overlap[0];
        for (let i = 1; i < overlap.length; i++) {
          const nextInterval = overlap[i];
          if (nextInterval[0] <= currentInterval[1]) {
            currentInterval[1] = Math.max(currentInterval[1], nextInterval[1]);
          } else {
            a.push([...currentInterval]);
            currentInterval = nextInterval;
          }
        }
        a.push([...currentInterval]);
    }
  
    /** 不包含的所有數字 */
    intervals.forEach(([start, end]) => {
      for (let i = start; i <= end; i++) {
        if (allNum.includes(i)) {
          allNum.splice(allNum.indexOf(i), 1);
        }
      }
    });
    /** 串出不包含的數字 */
    let range = [allNum[0], allNum[0]]
    const notInClude = []
    for(let i=1; i<allNum.length; i++){
      if(allNum[i] === allNum[i-1]+1){
        range[1] = allNum[i]
      }else{
        notInClude.push([...range]);
        range = [allNum[i], allNum[i]]
      }
      if(i===allNum.length-1){
        notInClude.push([...range]);
      }
    }
  
    const ageResult = {
      overlap: a ?? [],
      allNum: notInClude ?? [],
      overlapDataIndex: overlapDataIndex
    };
  
    return ageResult;
};
  