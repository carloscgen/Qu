import React, { useCallback, useEffect, useState } from 'react'
import { Box, Typography, Grid, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom'
import bgMain from '../../assets/bg_main.jpg';
import { styled } from '@mui/material/styles';
import { GetPlanetsImages } from '../../services/planetImage.services';
import { useParams } from 'react-router-dom';
import { PlaceDetailsInfoCard } from './PlaceDetailsInfoCard';
import { NestedList } from './Lists';
import { IErrorResponse } from '../../interfaces/error';

export const PlanetDetails = () => {
  let navigate = useNavigate();
  const [planetImages, setPlanetImages] = useState<string[]>([]);
  const params: any = useParams();

  const fetchImages = useCallback(
    async () => {
        try {
          const images  = await GetPlanetsImages();
          setPlanetImages(images);
        } catch (error) {
          const res = error as IErrorResponse;
          console.log(error);
          return res;
        }
    }
    , [])

    useEffect(() => {
      fetchImages();
    }, [fetchImages])
  
  const Main = styled(Box)(({ theme }) => ({
    minHeight: `calc(100vh - ${theme.spacing(7)} + 8px)`,
    flexGrow: 1,
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${bgMain})`,
  }));

  return (
    <Main>
      <Box sx={{
        mt: { xs: 6, sm: 6, md: 10, lg: 10, xl: 10 },
        mb: { xs: 6, sm: 6, md: 10, lg: 10, xl: 10 },
        borderRadius: '10px',
        maxWidth: { xs: 300, sm: 500, md: '100%', lg: '100%', xl: '100%' },
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);'
      }}>
        <Box sx={{
          backgroundColor: '#eee',
          color: '#424242',
          p: 1,
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px'
        }}
        >
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              mt: 2,
              mb: 2,
              fontSize: { xs: '16px', sm: '18px', md: '22px', lg: '24px', xl: '24px' }
            }}
            paragraph
          >
            Details of this planet
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box sx={{
              borderRight: { md: '1px solid white', lg: '1px solid white', xl: '1px solid white' },
              maxWidth: '500px'
            }}>
              <Card sx={{
                maxWidth: { xs: 300, sm: 500, md: '100%', lg: '100%', xl: '100%' }
              }}>
                <CardMedia
                  component="img"
                  alt="Planet Image"
                  sx={{ height: 250, width: 'auto', margin: '0 auto', pt: 2 }}
                  image={params ? planetImages[+params?.id] : planetImages[0]}
                  title="Planet Image"
                />
                <CardContent>
                  <PlaceDetailsInfoCard id={+params?.id}/>
                </CardContent>
                <CardActions sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: '#eee'
                }}>
                  <Box>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon color='error' />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </Box>
                  <Button 
                    sx={{
                      ":hover": {
                        background: '#fff'
                    }
                    }}
                    size="small" onClick={() => navigate("/")}>Go Back</Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>

          {/* ADDITIONAL INFO */}
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box>
              <Card sx={{ maxWidth: { xs: 320, sm: 500, md: '100%', lg: '100%', xl: '100%' } }}>
                <CardHeader
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                  title="Residents"
                subheader={
                  <>
                    <Typography gutterBottom>
                      {'Additional Information about the planet'}
                    </Typography>
                  </>
                }
                />
                <CardContent sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                  <NestedList id={+params?.id} />
                </CardContent>
              </Card>
            </Box>
          </Grid>
          {/* END ADDITIONAL INFO */}
        </Grid>
      </Box>
    </Main>
  )
}
