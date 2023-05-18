import { Typography, Box, Rating } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { capitalizeFirstLetter } from '../../utils/stringUtils'
import { IPlanet } from '../../services/planets.services'
import { GetPlanetsImages } from '../../services/planetImage.services'
import { formatDate } from '../../utils/datesFormat'

interface IInfo {
    id: number
}

export const PlaceDetailsInfoCard = ({ id } : IInfo) => {
    const [planets, setPlanets] = useState<IPlanet[]>([])

    const getPlatesFromStorage = useCallback(() => {
        const planetStorage = JSON.parse(localStorage.getItem('planets') || '{}')
        setPlanets(planetStorage);
    }, [])

    useEffect(() => {
        getPlatesFromStorage();
    }, [getPlatesFromStorage])

    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                {`Planet name: ${planets[id]?.name}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Diameter - ${planets[id]?.diameter ? planets[id]?.diameter : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Gravity - ${planets[id]?.gravity ? planets[id]?.gravity : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Climate - ${planets[id]?.climate ? capitalizeFirstLetter(planets[id]?.climate) : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Terrain - ${planets[id]?.terrain ? planets[id]?.terrain : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`URL - ${planets[id]?.url ? planets[id]?.url : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Orbital period - ${planets[id]?.orbital_period ? planets[id]?.orbital_period : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Rotation period - ${planets[id]?.rotation_period ? planets[id]?.rotation_period : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Population - ${planets[id]?.population ? planets[id]?.population : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Quantity of Films - ${planets[id]?.films.length > 0 ? planets[id]?.films.length : 'n/a'}`}
            </Typography>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
                {`Created data - ${planets[id]?.created ? formatDate(planets[id]?.created) : 'n/a'}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Hope that the information has been useful, you can see the list of the films and residents to learn more about the planet        
            </Typography>
        </>
    )
}
