import { Box } from '@mui/material';
import {
    Container,
    useMediaQuery as mediaQuery
} from '@mui/material';
import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import HeaderMobile from '@/components/HeaderMobile';
import HeaderPC from '@/components/HeaderPC';
import styled from 'styled-components';

const PageData = styled.div`
    background-color: white;
    margin-bottom: 50px;
`

interface LayoutProps {
    children: ReactNode,
    pageTitle: string
}


export default function Layout({ children, pageTitle }: LayoutProps) {
    const isMobile = mediaQuery('(max-width:600px)');
    return (
        <>
            <CssBaseline />
            <Head>
                <title>{pageTitle}</title>
            </Head>
            {isMobile
                ?
                <Box>
                    <HeaderMobile />
                    <PageData>
                        {children}
                    </PageData>
                </Box>
                :
                <Container>
                    <HeaderPC />
                    <PageData>
                        {children}
                    </PageData>
                </Container>
            }
        </>
    );
}