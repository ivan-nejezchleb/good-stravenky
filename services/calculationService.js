export function getCombinationValue(combination) {
    return combination.reduce((result, part) => result = result + (part.count * part.value), 0);
}

function isValidResult(result, smallestVoucherValue) {
    return result.cash < smallestVoucherValue && result.tips < smallestVoucherValue;
}

function getHighestCombinations(value, mealVouchers) {
    let combinationValue = 0;
    return mealVouchers.reduce((result, mealVoucher) => {
        let count = Math.floor(value / mealVoucher.value);
        const remainder = value % mealVoucher.value;
        if (remainder === 0) {
            combinationValue = combinationValue + (count * mealVoucher.value);
            result.push({
                value: mealVoucher.value,
                count
            });
        } else {
            count = count + 1;
            combinationValue = combinationValue + (count * mealVoucher.value);
            result.push({
                value: mealVoucher.value,
                count
            });
        }
        return result;
    }, []);
}

function getNextCombinations(value, mealVouchers, highestCombinations, allResults) {
    const smallestVoucherValue = mealVouchers.slice(-1)[0].value;
    const highestCombination = highestCombinations[0];
    const nextCombination = highestCombinations[1];

    for (let count = highestCombination.count; count >= 0; count--) {
        const pregeneratedCombination = [{
            count,
            value: highestCombination.value
        }];
        if(nextCombination) {
            for (let countNext = nextCombination.count; countNext >= 0; countNext--) {
                const finalCombination = [...pregeneratedCombination];
                finalCombination.push({
                    count: countNext,
                    value: nextCombination.value
                });
                const result = getResult(value, finalCombination);

                if (isValidResult(result, smallestVoucherValue)) {
                    allResults.push(result);
                }
            }
        } else {
            const result = getResult(value, pregeneratedCombination);

            if (isValidResult(result, smallestVoucherValue)) {
                allResults.push(result);
            }
        }
    }
}

function getResult(value, combination) {
    const combinationValue = getCombinationValue(combination);
    return {
        combination,
        cash: Math.max(value - combinationValue, 0),
        tips: Math.max(combinationValue - value, 0),
    }
}

export function getAllResults(value, mealVouchers) {
    let valueToWork = value;
    const allResults = [];

    const highestCombinations = getHighestCombinations(valueToWork, mealVouchers);
    getNextCombinations(value, mealVouchers, highestCombinations, allResults);

    return allResults;
}

function getCashScore(result) {
    return -(result.cash);
}
function getTipsScore(result) {
    return -(result.tips);
}

function getScore(result, strategyWeights) {
    return (strategyWeights.cash * getCashScore(result)) + (strategyWeights.tips * getTipsScore(result));
}

function prioritiseResults(allResults, strategyWeights) {
    return allResults.map(result => ({
        ...result,
        score: getScore(result, strategyWeights)
    })).sort((a, b) => a.score < b.score);
}



export function calculateResults(valueString, mealVouchers, strategyWeights = { cash: 100, tips: 100 }) {
    const value = parseFloat(valueString);

    return prioritiseResults(getAllResults(value, mealVouchers), strategyWeights);
}
