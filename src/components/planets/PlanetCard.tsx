import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { Button, Box, CardActionArea, CardActions, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";
import { IPlanet } from '../../services/planets.services';
import { capitalizeFirstLetter } from '../../utils/stringUtils'

interface IPlanetData {
    planet: IPlanet,
    cardImage: any,
    index: number,
}

export const PlanetCard = ({ planet, cardImage, index }: IPlanetData) => {
    let navigate = useNavigate();

    return (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{
                m: 1,
                maxWidth: { xs: '80%', sm: '50%', md: '100%', lg: '80%', xl: '70%' },
                flexGrow: 1,
                boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);'
            }}
            >
                <CardActionArea>
                    <CardHeader
                        sx={{
                            pb: 1,
                            backgroundColor: '#eee',
                            color: '#424242'
                        }}
                        title={`Planet Name: ${planet.name}`}
                        subheader={`Climate: ${capitalizeFirstLetter(planet.climate)}`}
                    />
                    <Box
                        sx={{
                            border: '1px solid #eee'
                        }}
                    >
                        <CardMedia
                            sx={{
                                backgroundColor: '#eee',
                            }}
                            component="img"
                            height="294"
                            image={cardImage}
                            alt="Star Wars Image"
                        />
                    </Box>
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
                        <Button sx={{
                            ":hover": {
                                background: '#fff'
                            }
                        }} size="small" onClick={() => navigate(`/details/${index}`)}>See Details</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    );
}