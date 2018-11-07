function getAllResults(value, mealVouchers) {
    return mealVouchers.map(mealVoucher => {
        const count = value / mealVoucher.value;
        const rest = value - count * mealVoucher.value;
        if (rest )
        return {
            value: mealVoucher.value,
            count,
        }
    })
}

function prepareVouchers(mealVouchers) {
    return mealVouchers.map(voucher => (
        {
            ...voucher,
            value: parseFloat(voucher.value)
        }
    )).sort((a, b) => a.value < b.value);
}

export function calculateResults(valueString, mealVouchers, strategies) {
    const value = parseFloat(valueString);

    return getAllResults(value, prepareVouchers(mealVouchers));
}
