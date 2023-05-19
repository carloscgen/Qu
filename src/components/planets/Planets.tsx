import { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { GetPlanets, IPlanet, IPlanetsResponse } from '../../services/planets.services';
import { PlanetCard } from './PlanetCard';
import bgMain from '../../assets/bg_main.jpg';
import { GetPlanetsImages } from '../../services/planetImage.services';
import { styled } from '@mui/material/styles';
import { IErrorResponse } from '../../interfaces/error';

export const Planets = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [planetImages, setPlanetImages] = useState<string[]>([]);

  const fetchPlaces = useCallback(
    async () => {
      try {
        setIsLoading(true);
        const planetsData: IPlanetsResponse = await GetPlanets();
        const planets = planetsData?.results;
        setPlanets(planets);
      } catch (error) {
        const res = error as IErrorResponse;
        console.log(error);
        return res;
      }
    }
    , [])

  useEffect(() => {
    fetchPlaces()
      .finally(() => {
        setIsLoading(false)
      });
  }, [fetchPlaces])

  const fetchImages = useCallback(
    async () => {
      try {
        const images: string[] = await GetPlanetsImages();
        setPlanetImages(images);
      } catch (error) {
        const res = error as IErrorResponse;
        console.log(error);
        return res;
      }
    }
    , [])

  useEffect(() => {
    localStorage.setItem('planets', JSON.stringify(planets))
  }, [planets])

  useEffect(() => {
    fetchImages();
  }, [fetchImages])

  const Main = styled(Box)(({ theme }) => ({
    minHeight: `calc(100vh - ${theme.spacing(8)} + 10px)`,
    flexGrow: 1,
    paddingTop: '28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${bgMain})`,
  }));

  return (
    <Box component="main" sx={{
      backgroundImage: `url(${bgMain})`,
      flexGrow: 1,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

      <Box sx={{
        p: 1,
        borderRadius: '10px',
        pt: 1,
        mb: 2,
        width: '100%'
      }}
      >
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            mt: 8,
            mb: 2,
            fontSize: { xs: '18px', sm: '18px', md: '22px', lg: '28px', xl: '28px' }
          }}

          paragraph
        >
          Great collections of Star Wars
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100px',
        alignItems: 'center',
        flexGrow: 1,
        flexWrap: 'wrap',
        borderRadius: '10px',
        textAlign: 'center',
        mb: 4
      }}>
        {isLoading && <CircularProgress sx={{ mb: 2, mt: 2 }} />}
        <Grid
          sx={{
            pb: 2
          }}
          container spacing={2}>
          {planets.map((planet, index) => {
            return (
              <PlanetCard key={index} planet={planet} cardImage={planetImages[index]} index={index} />
            )
          })}
        </Grid>
        <Main>
          {planets.length < 1 && (
            <Typography
              variant="h5"
              color="text.secondary"
            >
              No planets in this galaxy...
            </Typography>
          )}
        </Main>
      </Box>
    </Box>
  )
}
