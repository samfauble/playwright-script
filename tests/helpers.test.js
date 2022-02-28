var { stringParser, sortByPrice } = require('../src/helpers');

test('Strings parse as expected', () => {
    let price1 = '$1,220,566.98';
    let price2 = '$63.12';
    let price3 = '$9';
    let price4 = '$9,111';

    let actual1 = stringParser(price1);
    let actual2 = stringParser(price2);
    let actual3 = stringParser(price3);
    let actual4 = stringParser(price4);
    
    expect(actual1).toBe(1220566.98);
    expect(actual2).toBe(63.12);
    expect(actual3).toBe(9);
    expect(actual4).toBe(9111);
})

test('prices are sorted as expected', () => {
    let arr1 = [{price: 1}, {price: 3}];
    let arr2 = [{price: 2.1}, {price: 1.9}];
    let arr3 = [{price: 5.2},{price: 5.1}];
    let arr4 = [{price: 100}, {price: 100.0}];
    let arr5 = [];
    let arr6 = [{price: 7.32}];
    let arr7 = [{price: 46.1}, {price: 47}, {price: 2.3}];
    let arr8 = [{price: 6}, {price: 12}, {price: 12.5}];
    let arr9 = [{price: 7}, {price: 1}, {price: 1}];
    let arr10 = [{price: 4333}, {price: 122}, {price: 234}, {price: 433}];
    let arr11 = [{price: 234}, {price: 122}, {price: 3333}, {price: 76}];


    expect(sortByPrice(arr1)).toEqual(arr1);
    expect(sortByPrice(arr2)).toEqual([{price: 1.9}, {price: 2.1},]);
    expect(sortByPrice(arr3)).toEqual([{price: 5.1}, {price: 5.2}]);
    expect(sortByPrice(arr4)).toEqual([{price: 100.0}, {price: 100}]);
    expect(sortByPrice(arr5)).toEqual(arr5);
    expect(sortByPrice(arr6)).toEqual(arr6);
    expect(sortByPrice(arr7)).toEqual([{price: 2.3}, {price: 46.1}, {price: 47}]);
    expect(sortByPrice(arr8)).toEqual(arr8);
    expect(sortByPrice(arr9)).toEqual([{price: 1}, {price: 1}, {price: 7}]);
    expect(sortByPrice(arr10)).toEqual([{price: 122}, {price: 234}, {price: 433}]);
    expect(sortByPrice(arr11)).toEqual([{price: 76}, {price: 122}, {price: 234}]);
});
