import {
    Container, List, ListItem,
    ListItemButton, useMediaQuery as mediaQuery
} from '@mui/material';
import { capitalize } from '@/utils/helps';
import { useAuthContext } from '@/providers/AuthProvider';
import Link from 'next/link';
import styled from 'styled-components';

const Main = styled.div`
    .container-pc{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 5px 10px;
        background-color: #1976d2;
        color: white;
    }
`

export default function MenuTop() {
    const isMobile = mediaQuery('(max-width:600px)');
    const pages: string[] = ['alunos', 'turmas', 'disciplinas', 'cursos']
    const { setToken } = useAuthContext()
    function logout() {
        setToken('')
    }
    return (
        <>
            {isMobile
                ? <List>
                    {
                        pages.map((text, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <Link key={index} href={`/list/${text}`}>
                                        {capitalize(text)}
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link href={'/'} onClick={logout}>Logout</Link>
                        </ListItemButton>
                    </ListItem>
                </List>
                : <Main>
                    <Container className='container-pc'>
                        {pages.map((text, index) => {
                            return (
                                <Link key={index} href={`/list/${text}`}>{capitalize(text)}</Link>
                            )
                        })}
                        <Link href={'/'} onClick={logout}>Logout</Link>
                    </Container>
                </Main >
            }
        </>
    )
}