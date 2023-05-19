import planet1 from '../assets/planet1.jpg';
import planet2 from '../assets/planet2.jpg';
import planet3 from '../assets/planet3.jpg';
import planet4 from '../assets/planet4.jpg';
import planet5 from '../assets/planet5.jpg';
import planet6 from '../assets/planet6.jpg';
import planet7 from '../assets/planet7.jpg';
import planet8 from '../assets/planet8.jpg';
import planet9 from '../assets/planet9.jpg';
import planet10 from '../assets/planet10.jpg';
import axios from 'axios';
import { IErrorResponse } from '../interfaces/error';

const hard = [
    planet1,
    planet2,
    planet3,
    planet4,
    planet5,
    planet6,
    planet7,
    planet8,
    planet9,
    planet10,
]

export const GetPlanetsImages = async () => {
    let imagesMapped: any = [];

        for (let index = 0; index < 10; index++) {
            try {
                const { status } = await axios.get(`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`)
                if (status === 200) {
                    imagesMapped.push(`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`)
                } else {
                    imagesMapped.push(hard[index])
                }
            } catch (error) {
                const res = error as IErrorResponse;
                if (res.response.status === 404) {
                    imagesMapped.push(hard[index])
                }
            }
            
        }
        return imagesMapped;
}
