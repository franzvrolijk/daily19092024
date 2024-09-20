function diffWaysToCompute(expression: string): number[] {
  expression = `(${expression})`;
  const groups = findGroups(expression);
  const maxGroupSize = Math.max(...groups.map((g) => g.size));

  for (let groupSize = maxGroupSize - 1; groupSize > 1; groupSize--) {}
  return [0];
}

function findGroups(expression: string): {
  id: number;
  size: number;
}[] {
  let queue = [];
  let groupSizes = [];

  for (let i = 0; i < expression.length; i++) {
    const element = expression[i];
    if (element === "(") {
      queue.push(0);
    } else if (isNumber(+element)) {
      queue[queue.length - 1]++;
    } else if (element === ")") {
      groupSizes.push({
        id: i,
        size: queue[queue.length - 1],
      });
      queue.pop();
      queue[queue.length - 1]++;
    }
  }

  return groupSizes;
}

const isNumber = (n: number) => !Number.isNaN(n);

diffWaysToCompute("2*3-4*5");
