const memo = new Map<string, string[]>();

function diffWaysToCompute(expression: string): number[] {
  const allCombinations = findAllCombinations(expression);
  console.log(allCombinations);

  const distinctCombinations = allCombinations.filter(
    (s, i) => i === allCombinations.indexOf(s)
  );

  const result = distinctCombinations.map((s) => eval(s)) as number[];

  return result;
}

function findAllCombinations(s: string): string[] {
  if (memo.has(s)) {
    console.log("memo");
    return memo.get(s);
  }

  const elements = findTopLevelElements(s);

  if (elements.length < 3) {
    return [s];
  }

  let results: string[] = [];

  for (let i = 0; i < elements.length - 1; i++) {
    const { start } = elements[i];
    const { end } = elements[i + 1];

    const newExpression = `${s.substring(0, start)}(${s.substring(
      start,
      end + 1
    )})${s.substring(end + 1, s.length)}`;

    results.push(...findAllCombinations(newExpression));
  }

  memo.set(s, results);

  return results;
}

function findTopLevelElements(
  expression: string
): { start: number; end: number }[] {
  let temp;
  let elements = [];
  let n = 0;

  for (let i = 0; i < expression.length; i++) {
    const element = expression[i];

    if (element === "(") {
      if (temp !== undefined) {
        n++;
        continue;
      }
      temp = {
        start: i,
        end: undefined,
      };
    } else if (isNumber(+element) && temp === undefined) {
      let start = i;
      while (isNumber(+expression[i + 1])) {
        i++;
      }
      elements.push({
        start: start,
        end: i,
      });
    } else if (element === ")") {
      if (n > 0) {
        n--;
        continue;
      }
      temp.end = i;
      elements.push(temp);
      temp = undefined;
    }
  }

  return elements;
}

const isNumber = (n: number) => !Number.isNaN(n);

diffWaysToCompute("2*3-4*5-1+2*4-2");
