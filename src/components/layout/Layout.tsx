import React from 'react'
import { Header } from '../header/Header'
import { styled } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import { Footer } from '../footer/Footer';

const Page = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
}));

export const Layout = () => {
    return (
        <>
            <Header />
            <Page>
                <Outlet />
            </Page>
            <Footer />
        </>
    )
}
