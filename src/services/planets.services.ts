import axios from 'axios';

export interface IPlanet {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: string[],
    films: string[],
    created: string,
    edited: string,
    url: string

}

export interface IPlanetsResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: IPlanet[]
}

export const GetPlanets = async (): Promise<IPlanetsResponse> => {
    try {
        const { data } = await axios.get<IPlanetsResponse>('https://swapi.dev/api/planets');
        return data;
    } catch (error) {
        const res = error as any
        console.error(error);
        return res;
    }
}
