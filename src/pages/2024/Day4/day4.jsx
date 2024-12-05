import { useEffect, useState } from "react";

// word search
function Day4() {
  const [inputValue, setInputValue] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // **solve part 1**
    const numXmas = findNumWords(inputValue, "XMAS");
    setAnswer1(numXmas);

    // **solve part 2**
    setAnswer2(0);
  }, [inputValue]);

  // indicies
  const getAllIndexes = (arr, val) => {
    const indexes = [];
    for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  };

  const searchNext = (x, y, lines, searchString, stringIndex, direction) => {
    const newX = x + direction.x;
    const newY = y + direction.y;
    //make sure valid coordinates
    if (
      newY < 0 ||
      newY >= lines.length ||
      newX < 0 ||
      newX >= lines[newY].length
    ) {
      return false;
    }
    // console.log("new", { newX, newY });
    if (lines[newY][newX] === searchString[stringIndex]) {
      // matched character, either find next or matched full string
      if (stringIndex < searchString.length - 1) {
        // console.log("searching next", {
        //   newX,
        //   newY,
        //   lines,
        //   searchString,
        //   stringIndex: stringIndex + 1,
        //   direction,
        // });
        // console.log("searchStringChar", searchString[stringIndex]);
        return searchNext(
          newX,
          newY,
          lines,
          searchString,
          stringIndex + 1,
          direction
        );
      } else {
        // console.log("searchStringChar", searchString[stringIndex]);
        // console.log("found a match");
        return true;
      }
    }
    return false;
  };

  const searchAdjacent = (x, y, lines, searchString, stringIndex) => {
    //search all surrounding spots for the next character
    let startY = y - 1 > 0 ? y - 1 : 0;
    let endY = y + 1 < lines.length ? y + 1 : lines.length - 1;

    let countFound = 0;
    for (let i = startY; i <= endY; i++) {
      let startX = x - 1 > 0 ? x - 1 : 0;
      let endX = x + 1 < lines[i].length ? x + 1 : lines[i].length - 1;
      // console.log("x", { x, startX, endX });
      for (let j = startX; j <= endX; j++) {
        if (lines[i][j] === searchString[stringIndex]) {
          if (stringIndex < searchString.length - 1) {
            // return searchAdjacent(j, i, lines, searchString, stringIndex + 1);
            // console.log("direction", { i, y, j, x });
            // console.log("direction", {
            //   x: j - x,
            //   y: i - y,
            // });
            // console.log("searchStringChar", searchString[stringIndex]);
            if (
              searchNext(j, i, lines, searchString, stringIndex + 1, {
                x: j - x,
                y: i - y,
              })
            ) {
              countFound++;
            }
          } else {
            console.log("shouldn't be here");
            return 1;
          }
        }
      }
    }
    return countFound;
  };

  const findNumWords = (input, searchString) => {
    const lines = input.split("\n");
    // console.log(lines);

    let totalFound = 0;
    // console.log(getAllIndexes(lines[0], searchString[0]));
    lines.forEach((line, y) => {
      const indexes = getAllIndexes(line, searchString[0]);
      indexes.forEach((x) => {
        const numFound = searchAdjacent(x, y, lines, searchString, 1);
        totalFound += numFound;
      });
    });

    return totalFound;
  };

  return (
    <div>
      <h2>Day 4</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day4;

// const searchAdjacentXYZ = (x, y, lines, searchString, stringIndex) => {
//   //search all surrounding spots for the next character
//   let startY = y - 1 > 0 ? y - 1 : 0;
//   let endY = y + 1 < lines.length ? y + 1 : lines.length - 1;

//   for (let i = startY; i <= endY; i++) {
//     let startX = x - 1 > 0 ? x - 1 : 0;
//     let endX = x + 1 > lines[i].length ? y + 1 : lines[i].length - 1;
//     for (let j = startX; j <= endX; j++) {
//       if (lines[i][j] == searchString[stringIndex]) {
//         if (stringIndex < searchString.length - 1) {
//           return searchAdjacent(j, i, lines, searchString, stringIndex + 1);
//         } else {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// };
