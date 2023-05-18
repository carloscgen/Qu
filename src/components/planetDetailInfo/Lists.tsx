import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import VideocamIcon from '@mui/icons-material/Videocam';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { IPlanet } from '../../services/planets.services';

interface IInfo {
    id: number
}

export const NestedList = ({ id }: IInfo) => {
    const [openFilms, setOpenFilms] = React.useState<boolean>(false);
    const [openResidents, setOpenResidents] = React.useState<boolean>(false);
    const [planets, setPlanets] = React.useState<IPlanet[]>([])

    const getPlatesFromStorage = React.useCallback(() => {
        const planetStorage = JSON.parse(localStorage.getItem('planets') || '{}')
        setPlanets(planetStorage);
    }, [])

    React.useEffect(() => {
        getPlatesFromStorage();
    }, [getPlatesFromStorage])

    const handleClickFilms = () => {
        setOpenFilms(!openFilms);
    };

    const handleClickResidents = () => {
        setOpenResidents(!openResidents);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Link of max 10 films and residents
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClickFilms}>
                <ListItemIcon>
                    <VideocamIcon />
                </ListItemIcon>
                <ListItemText primary="Films" />
                {openFilms ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openFilms} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        pl: 4
                    }}>
                        {planets[id]?.films ? planets[id]?.films.slice(0, 10).map(film => {
                            return (
                                <ListItemText primary={film} />
                            )
                        })
                            : null
                        }
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={handleClickResidents}>
                <ListItemIcon>
                    <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Residents" />
                {openResidents ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openResidents} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        pl: 4
                    }}>
                        {planets[id]?.residents ? planets[id]?.residents.slice(0, 10).map(resident => {
                            return (
                                <ListItemText primary={resident} />
                            )
                        })
                            : null
                        }
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}