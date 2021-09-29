const { expect } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('Function convertHandler.getNum(input)', function() {

        test("Whole number input", function(done) {
            let input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal input', function(done) {
            let input = '12.5L';
            assert.equal(convertHandler.getNum(input), 12.5);
            done();
        });

        test('Fractional input', function(done) {
            let input = '1/3L';
            assert.equal(convertHandler.getNum(input), 1/3);
            done();
        });

        test('Fractional input w/ Decimal', function(done) {
            let input = '1.5/3L';
            assert.equal(convertHandler.getNum(input), 1.5/3);
            done();
        });

        test('Invalid input (double fraction)', function(done) {
            let input = '1/3/4L';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });

        test('No Numerical Input', function(done) {
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });

    suite('Function convertHandler.getUnit(input)', function() {
        test("For each valid input units", function(done) {
            let input = [
                'gal',
                'l',
                'mi',
                'km',
                'lbs',
                'kg',
                'GAL',
                'L',
                'MI',
                'KM',
                'LBS',
                'KG',
            ];
            let output = [
                'gal',
                'L',
                'mi',
                'km',
                'lbs',
                'kg',
                'gal',
                'L',
                'mi',
                'km',
                'lbs',
                'kg',
            ];
            input.forEach(function(ele, index) {
                assert.equal(convertHandler.getUnit(ele), output[index]);
            });
            done();
        })

        test('Invalid input unit', function(done) {
            assert.equal(convertHandler.getUnit('34kilograms'), undefined);
            done();
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function() {
        test("For Each Valid Input Unit", function(done) {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function(ele, index) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[index]);
            });
            done();
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function() {
        test('For Each Valid Input Unit', function(done) {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            input.forEach(function(ele, index) {
                assert.equal(convertHandler.spellOutUnit(ele), expect[index]);
            });
            done();
        });
    });

    suite('Function convertHandler.convert(num, unit)', function() {
        test('Gal to L', function(done) {
            let input = [5, 'gal'];
            let expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('L to gal', function(done) {
            let input = [5, 'L'];
            let expected = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('mi to km', function(done) {
            let input = [5, 'mi'];
            let expected = 8.0467;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });

        test('km to mi', function(done) {
            let input = [5, 'km'];
            let expected = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        })

        test('lbs to kg', function(done) {
            let input = [5, 'lbs'];
            let expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        })

        test('kg to lbs', function(done) {
            let input = [5, 'kg'];
            let expected = 11.02312;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        })

    })
});