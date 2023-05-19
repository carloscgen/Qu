import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IPlanet } from '../../services/planets.services';
import Avatar from '@mui/material/Avatar';
import { GetCharacter, IChar } from '../../services/character.service';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { IErrorResponse } from '../../interfaces/error';

interface IInfo {
    id: number
}

export const NestedList = ({ id }: IInfo) => {
    const [openResidents, setOpenResidents] = React.useState<boolean>(false);
    const [planets, setPlanets] = React.useState<IPlanet[]>([])
    const [char, setChar] = React.useState<IChar[]>([{name: '', height: '', mass: ''}])

    const getPlatesFromStorage = React.useCallback(() => {
        const planetStorage = JSON.parse(localStorage.getItem('planets') || '{}')
        setPlanets(planetStorage);
    }, [])

    React.useEffect(() => {
        getPlatesFromStorage();
    }, [getPlatesFromStorage])

    const handleClickResidents = () => {
        setOpenResidents(!openResidents);
    };

    const getIdfromURL = (url: string) => {
        if (url) {
            const urlCut = url.split("/");
            const pos = urlCut.length
            const id = urlCut[pos - 2]
            return id;
        } else {
            return ''
        }
    }

    const fetchCharacter = React.useCallback(
        async (arr: string[]) => {
            try {
                const ch: any = await GetCharacter(arr);
                setChar(ch);
            } catch (error) {
                const res = error as IErrorResponse;
                return res;
            }
        }
        , [])

    useEffect(() => {
        fetchCharacter(planets[id]?.residents)
    }, [fetchCharacter, id, planets]);
    
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Info of max 10 residents
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClickResidents}>
                <ListItemIcon>
                    <EmojiPeopleIcon 
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '50%'
                        }}
                    />
                </ListItemIcon>
                <ListItemText primary="Residents" />
                {openResidents ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openResidents} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        overflow: 'auto',
                        pl: 4
                    }}>
                        {planets[id]?.residents ? planets[id]?.residents.slice(0, 10).map((resident, index) => {
                            return (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Avatar
                                        alt={resident}
                                        src={`https://starwars-visualguide.com/assets/img/characters/${getIdfromURL(resident)}.jpg`}
                                        sx={{ width: 70, height: 70, ml: 4, mr: 4 }}
                                    />
                                    <Typography gutterBottom>
                                        {char ? char[index]?.name : ''}
                                    </Typography>
                                    <Typography gutterBottom>
                                        Height: {char ? char[index]?.height : ''}
                                    </Typography>
                                    <Typography gutterBottom>
                                        Mass: {char ? char[index]?.mass : ''}
                                    </Typography>
                                </Box>
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