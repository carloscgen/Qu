import React from 'react';
import { capitalizeFirstLetter } from './stringUtils';

describe('Capitalize a string', () => {
    test('Get the first letter and capitalize it', () => {
        const getValue = capitalizeFirstLetter('charactertocapitalize');
        expect(getValue).toEqual('Charactertocapitalize');
    });

    test('Return empty string', () => {
        const getValue = capitalizeFirstLetter();
        expect(getValue).toEqual('');
    });

    test('Return empty string if passed a undefined value', () => {
        const getValue = capitalizeFirstLetter(undefined);
        expect(getValue).toEqual('');
    });

    test('Return empty string if passed a null value', () => {
        const getValue = capitalizeFirstLetter(null);
        expect(getValue).toEqual('');
    });
})
