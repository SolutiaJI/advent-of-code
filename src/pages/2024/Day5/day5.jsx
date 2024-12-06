import { useEffect, useState } from "react";

function Day5() {
  const [inputValue, setInputValue] = useState("");
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // **solve part 1**
    const sumPages = sumMiddlePagesCorrectlyOrdered(inputValue);
    setAnswer1(sumPages);

    // **solve part 2**
    setAnswer2(0);
  }, [inputValue]);

  // trying to build rules as a map instead of just building the list order as a list due to potential performance concerns
  const buildRulesMap = (orderingRules) => {
    const rulesMap = orderingRules.reduce((ruleAccumMap, rule) => {
      const ruleParts = rule.split("|");
      if (!ruleAccumMap[ruleParts[0]]) {
        ruleAccumMap[ruleParts[0]] = [];
      }
      ruleAccumMap[ruleParts[0]].push(ruleParts[1]);
      return ruleAccumMap;
    }, {});
    console.log("ruleAccumMap", rulesMap);
    return rulesMap;
  };

  const sumMiddlePagesCorrectlyOrdered = (input) => {
    const sections = input.split("\n\n");

    const orderingRules = sections[0]?.split("\n");
    const pageUpdates = sections[1]?.split("\n");

    const ruleMap = buildRulesMap(orderingRules);

    const sumMiddleValues = pageUpdates?.reduce(
      (sumValidUpdatesAccum, pageNumbersString) => {
        const pageNumbers = pageNumbersString.split(",");
        const pageNumberCopy = [...pageNumbers];
        let isRuleBroken = false;
        for (let i = pageNumbers.length - 1; i >= 0; i--) {
          // look at the current page number (starting from the back)
          // to ensure it shouldn't be before any of the other pages
          // if valid, pop the last page number from the copy and continue
          // console.log("pageNumbers", ruleMap); // pageNumbers[[i]]);
          const rulePageBefore = ruleMap[pageNumbers[i]];
          if (rulePageBefore?.length > 0) {
            // check if there is a page in the list ahead of this that has a rule that doesn't allow that
            const foundRuleBreak = rulePageBefore.some((rulePage) =>
              pageNumberCopy.includes(rulePage)
            );
            if (foundRuleBreak) {
              // console.log("foundRuleBreak", {
              //   foundRuleBreak,
              //   pageNumbers,
              //   i,
              //   rulePageBefore,
              //   pageNumberCopy,
              // });
              isRuleBroken = true;
              break;
            }
            // console.log("pageNumberCopy", { i, pageNumberCopy });
          }
          pageNumberCopy.pop();
        }
        if (!isRuleBroken) {
          // console.log("valid", pageNumbers);
          sumValidUpdatesAccum += Number(
            pageNumbers[(pageNumbers.length - 1) / 2]
          );
        }

        return sumValidUpdatesAccum;
      },
      0
    );
    console.log(sumMiddleValues);
    return sumMiddleValues;
  };

  return (
    <div>
      <h2>Day 5</h2>
      <textarea value={inputValue} onChange={handleInputChange}></textarea>
      <hr />
      <span>Answer 1: {answer1}</span>
      <br />
      <span>Answer 2: {answer2}</span>
    </div>
  );
}

export default Day5;
