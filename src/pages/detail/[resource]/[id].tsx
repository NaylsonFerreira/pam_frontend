import { Button, List, ListItem } from '@mui/material';
import { capitalize, handleValues } from '@/utils/helps';
import { services } from '@/models/table';
import { useEffect, useState } from 'react';
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
        justify-content: space-between;
    }
`

export default function DetailPage() {
    const router = useRouter();
    const [data, setData] = useState({})
    const { resource, id } = router.query;

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
                }
            }
        }, 200);

        return () => {
            isReady = false
        }
    }, [id, resource, router])

    if (resource && id) {
        return (
            <Layout pageTitle={`Detalhes ${resource}`}>
                <Main>
                    <p>{capitalize(`${resource}`)}</p>
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
                        <Link href={`/edit/${resource}/${id}`}>
                            <Button variant="contained">Editar</Button>
                        </Link>
                        <Link href={`/delete/${resource}/${id}`}>
                            <Button color='error' variant="contained">Apagar</Button>
                        </Link>
                    </div>
                </Main>

            </Layout>
        )
    }
    return (
        <Layout pageTitle="DetailPage">

        </Layout>
    )
}