import React from 'react';
import { Planets } from './Planets';
import { render, screen } from '@testing-library/react';

describe('Render Planets component', () => {
    test('Display title on screen', () => {
        render(
            <Planets />
        );
        const getValue = screen.getByText('Great collections of Star Wars');
        expect(getValue).toBeInTheDocument();
    });

    test('Display no data on screen', () => {
        render(
            <Planets />
        );
        const getValue = screen.getByText('No planets in this galaxy...');
        expect(getValue).toBeInTheDocument();
    });
})