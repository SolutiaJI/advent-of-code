import { useEffect, useState } from "react";

const numsAsWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function Day1() {
  const [inputValue, setInputValue] = useState('');
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(()=>{
    // **solve part 1**
    const totalAnswer1 = sumLines(inputValue);
    setAnswer1(totalAnswer1);

    // **solve part 2**
    let tempInputValue = inputValue;
    
    //convert spelled numbers to numeric
    numsAsWords.forEach((wordNum, numValue) => {
      const reg = new RegExp(wordNum, "g")
      const replaceValue = wordNum[0] + numValue + wordNum.slice(1);
      tempInputValue = tempInputValue.replace(reg, replaceValue);
    });
    
    const totalAnswer2 = sumLines(tempInputValue);
    setAnswer2(totalAnswer2);
  }, [inputValue]);

  const sumLinesV1 = (input) => {
    const pattern = /[0-9]/g;

    const lines = input.split('\n');
    const values = lines?.map((line) => {
      const matches = line?.match(pattern);
      if(matches?.length > 0) {
        return matches[0] + '' + matches[matches.length - 1];
      } else {
        return 0;
      }
    });
    
    const total = values?.reduce((partialSum, lineValue) => {
      return partialSum + Number(lineValue);
    }, 0);
    return total;
  };

  const sumLines = (input) => {
    const pattern = /[0-9]/g;

    const lines = input.split('\n');
    const sum = lines?.reduce((partialSum, line) => {
      const matches = line?.match(pattern);
      if(matches?.length > 0) {
      return partialSum + Number(matches[0] + '' + matches[matches.length - 1]);
      } else {
        return partialSum + 0;
      }
    }, 0);
    return sum;
  };

  return (
    <div>
      <h2>Day 1</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day1;
