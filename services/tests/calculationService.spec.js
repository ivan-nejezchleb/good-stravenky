import {
    getAllResults
} from '../calculationService';

describe('calculationService', () => {
    describe('getAllResults', () => {
        it('should work for exact match 80 : [80]', () => {
            const vouchers = [{
                key: '01',
                value: 80
            }];
            const result = [{
                combination: [{
                    count: 1,
                    value: 80
                }],
                cash: 0,
                tips: 0
            }];
            expect(getAllResults(80, vouchers)).toEqual(result);
        });

        it('should work for match 81 : [80]', () => {
            const vouchers = [{
                key: '01',
                value: 80
            }];
            const result = [
                {
                    combination: [{
                        count: 2,
                        value: 80
                    }],
                    cash: 0,
                    tips: 79
                },
                {
                    combination: [{
                        count: 1,
                        value: 80
                    }],
                    cash: 1,
                    tips: 0
                }
            ];
            expect(getAllResults(81, vouchers)).toEqual(result);
        });

        it('should work with two vouchers 81 : [80, 35]', () => {
            const vouchers = [{
                key: '01',
                value: 80
            }, {
                key: '02',
                value: 35
            }];
            const result = [
                {
                    combination: [{
                        count: 1,
                        value: 80
                    }, {
                        count: 1,
                        value: 35
                    }],
                    cash: 0,
                    tips: 34
                },
                {
                    combination: [{
                        count: 1,
                        value: 80
                    }, {
                        count: 0,
                        value: 35
                    }],
                    cash: 1,
                    tips: 0
                }, {
                    combination: [{
                        count: 0,
                        value: 80
                    }, {
                        count: 3,
                        value: 35
                    }],
                    cash: 0,
                    tips: 24
                }, {
                    combination: [{
                        count: 0,
                        value: 80
                    }, {
                        count: 2,
                        value: 35
                    }],
                    cash: 11,
                    tips: 0
                }
            ];
            expect(getAllResults(81, vouchers)).toEqual(result);
        });

        // it('should work for smaller voucher', () => {
        //     const vouchers = [{
        //         key: '01',
        //         value: 35
        //     }];
        //     const result = [{
        //         combination: [{
        //             count: 3,
        //             value: 35
        //         }],
        //         cash: 0,
        //         tips: 15
        //     }];
        //     expect(getAllResults(80, vouchers)).toEqual(result);
        // });
    });
});
