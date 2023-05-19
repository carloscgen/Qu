import React from 'react';
import { formatDate } from './datesFormat';

describe('Format a date', () => {
    test('Format the date to an specific format', () => {
        const getValue = formatDate('2014-12-10T11:50:29.349000Z');
        expect(getValue).toEqual('2014-12-10');
    });

    test('Return empty string', () => {
        const getValue = formatDate();
        expect(getValue).toEqual('');
    });

    test('Return empty string if passed a undefined value', () => {
        const getValue = formatDate(undefined);
        expect(getValue).toEqual('');
    });

    test('Return empty string if passed a null value', () => {
        const getValue = formatDate(null);
        expect(getValue).toEqual('');
    });
})
