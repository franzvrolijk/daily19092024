function diffWaysToCompute(expression) {
    expression = "(".concat(expression, ")");
    var groupSizes = findMaxGroupSize(expression);
    console.log(groupSizes);
    return [0];
}
function findMaxGroupSize(expression) {
    var queue = [];
    var groupSizes = [];
    for (var i = 0; i < expression.length; i++) {
        var element = expression[i];
        if (element === "(") {
            queue.push(0);
        }
        else if (isNumber(+element)) {
            queue[queue.length - 1]++;
        }
        else if (element === ")") {
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
var isNumber = function (n) { return !Number.isNaN(n); };
diffWaysToCompute("2*3-4*5");
