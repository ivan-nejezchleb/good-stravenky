function getAllResults(value, mealVouchers) {
    return mealVouchers.map((mealVoucher) => {
        const count = value / mealVoucher.value;
        const rest = value - (count * mealVoucher.value);
        if (rest) {
            return {
                value: mealVoucher.value,
                count
            };
        }
    });
}



export function calculateResults(valueString, mealVouchers) {
    const value = parseFloat(valueString);

    return getAllResults(value, mealVouchers);
}
