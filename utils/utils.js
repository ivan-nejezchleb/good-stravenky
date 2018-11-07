function isValidMealVoucherValue(value) {
    return value.length > 0 && value.match(/^\d+$/) && parseInt(value, 10) <= 1000;
}

export default {
    isValidMealVoucherValue
};
