"use strict";
// import runner from '../index';
// eslint-disable-next-line
console.log = jest.fn();
describe('Test Case 1', function () {
    it('Test 1', function () {
        // runner.foo();
        // eslint-disable-next-line
        console.log('TEST');
        // eslint-disable-next-line
        expect(console.log).toBeCalled();
    });
});
//# sourceMappingURL=index.test.js.map