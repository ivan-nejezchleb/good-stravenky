function getCombinationValue(combination) {
    return combination.reduce((result, part) => result = result + (part.count * part.value), 0);
}

function getHighestCombination(value, mealVouchers) {
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

function getNextCombinations(value, mealVouchers, initCombo) {
    // console.log(arguments);
    let combinationValue = getCombinationValue(initCombo);
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
    }, initCombo);
}

export function getAllResults(value, mealVouchers) {
    let valueToWork = value;
    let combinationValue = 0;
    const allCombinations = [];

    const highestCombination = getHighestCombination(valueToWork, mealVouchers);
    combinationValue = getCombinationValue(highestCombination);

    allCombinations.push({
        combination: highestCombination,
        cash: Math.max(value - combinationValue, 0),
        tips: Math.max(combinationValue - value, 0),
    });

    const newCount = highestCombination.slice(-1)[0].count - 1;

    if(newCount > 0) {
        const initCombo = [{
            value: highestCombination.slice(-1)[0].value,
            count: newCount
        }]
        const nextCombination = getNextCombinations(value - getCombinationValue(initCombo), mealVouchers.slice(0, mealVouchers.length - 1), initCombo);
        combinationValue = getCombinationValue(nextCombination);

        allCombinations.push({
            combination: nextCombination,
            cash: Math.max(value - combinationValue, 0),
            tips: Math.max(combinationValue - value, 0),
        });
    }


    return allCombinations;
}



export function calculateResults(valueString, mealVouchers) {
    const value = parseFloat(valueString);

    return getAllResults(value, mealVouchers);
}
