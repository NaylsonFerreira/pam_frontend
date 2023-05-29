import { Alert, Button, List, ListItem } from '@mui/material';
import { capitalize, handleValues } from '@/utils/helps';
import { services } from '@/models/table';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/patterns/Layout';
import Link from 'next/link';
import styled from 'styled-components';

const Main = styled.div`
    .data-row{
        display: flex;
        justify-content: space-between;
        border-bottom: solid 1px #ccc;
    }
    .obj-value{
        width: 60%;
    }
    .actions-buttons{
        display: flex;
        justify-content: space-evenly;        
    }
    .alert-delete{
        margin: 10px 0;
        padding: 0px;
    }
`

export default function DeletePage() {
    const router = useRouter();
    const [data, setData] = useState({})
    const { resource, id } = router.query;
    const linkRef = useRef<HTMLAnchorElement>(null);

    function handleDelete(resource: string, id: string) {
        const service = services[`${resource}`]
        service.deleteByID(`${id}`).catch(error => {
            console.log(error)
        })
        if (linkRef.current) {
            linkRef.current.click();
        }
    }

    useEffect(() => {
        let isReady = true
        setTimeout(async () => {
            if (isReady && id && resource) {
                const service = services[`${resource}`]
                try {
                    const response = await service.getById(`${id}`)
                    if (response) {
                        setData(response)
                    }
                } catch (error) {
                    setData({})
                    router.push('/')
                }
            }
        }, 200);

        return () => {
            isReady = false
        }
    }, [id, resource, router])

    if (resource && id) {
        return (
            <Layout pageTitle={`Apagar ${resource}`}>
                <Main>
                    <p>{capitalize(`${resource}`)}</p>
                    <Alert className='alert-delete' variant="filled" severity="error">
                        Deseja realmente apagar? Essa Ação é irreversível
                    </Alert>
                    <List >
                        {Object.entries(data).map((obj, key) => {
                            return (
                                <ListItem key={key} className='data-row'>
                                    {obj.map((d, i) => {
                                        if (i % 2) {
                                            return (
                                                <div className='obj-value' key={i}>
                                                    {handleValues(d)}
                                                </div>
                                            )
                                        } else {
                                            return <div className='obj-label' key={i}>
                                                {capitalize(`${d}`)}
                                            </div>
                                        }
                                    })}
                                </ListItem>
                            );
                        })}
                    </List>
                    <div className='actions-buttons'>
                        <Button
                            color='success'
                            variant="contained"
                            onClick={() => handleDelete(`${resource}`, `${id}`)}
                        >
                            Confirmar
                        </Button>
                        <Link ref={linkRef} href={`/list/${resource}`}>
                            <Button color='error' variant="outlined">Cancelar</Button>
                        </Link>
                    </div>
                </Main>

            </Layout>
        )
    }
    return (
        <Layout pageTitle="DeletePage">

        </Layout>
    )
}