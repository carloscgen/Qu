import React from 'react';
import { PlanetCard } from './PlanetCard';
import { render, screen } from '@testing-library/react';
import planet1 from '../../assets/planet1.jpg';
import { BrowserRouter } from 'react-router-dom';

const hard = [
    planet1,
]

const planet = {
    name: 'test',
    rotation_period: '20',
    orbital_period: '50',
    diameter: '100',
    climate: 'arid',
    gravity: '28',
    terrain: 'beach',
    surface_water: 'great',
    population: '400',
    residents: ['one', 'two'],
    films: ['a', 'b'],
    created: '2014-12-10T11:50:29.349000Z',
    edited: '2014-12-10T11:50:29.349000Z',
    url: 'https://swapi.dev/api/planets/7/'
}
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

describe('Render Planet Card component', () => {
    test('Display title on screen', () => {
        render(
            <BrowserRouter>
                <PlanetCard planet={planet} cardImage={hard[0]} index={0} />
            </BrowserRouter>
        );
        const getValue = screen.getByText('Planet Name: test');
        expect(getValue).toBeInTheDocument();
    });

    // test('Display no data on screen', () => {
    //     render(
    //         <PlanetCard />
    //     );
    //     const getValue = screen.getByText('No planets in this galaxy...');
    //     expect(getValue).toBeInTheDocument();
    // });
})