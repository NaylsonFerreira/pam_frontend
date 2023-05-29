import { Button, List, ListItem, Switch, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { capitalize, handleValues } from '@/utils/helps';
import { services } from '@/models/table';
import { useAuthContext } from '@/providers/AuthProvider';
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

export default function EditPage() {
    const router = useRouter();
    const [data, setData] = useState({})
    const [newData, setNewData] = useState<{ [x: string]: any }>({})
    const { resource, id } = router.query;
    const linkRef = useRef<HTMLAnchorElement>(null);

    function handleSubmit(resource: string, id: string) {
        const payload = {
            ...data,
            ...newData
        }
        const service = services[`${resource}`]
        service.editByID(`${id}`, payload).then(response => {
            if (linkRef.current) {
                linkRef.current.click();
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function handleInputs(data: any, key: string) {
        if (['string', 'number'].includes(typeof data)) {
            return <TextField
                key={key}
                fullWidth
                id="outlined-basic"
                label={key}
                defaultValue={data}
                type={typeof data}
                variant="outlined"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setNewData(o => ({ ...o, [key]: event.target.value }));
                }}
            />
        }
        if (typeof data == 'boolean') {
            return <Switch
                defaultChecked={data}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setNewData(o => ({ ...o, [key]: !data }));
                }}
            />
        }
        return handleValues(data)
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
                }
            }
        }, 200);

        return () => {
            isReady = false
        }
    }, [id, resource])

    if (resource && id) {
        return (
            <Layout pageTitle={`Editar ${resource}`}>
                <Main>
                    <p>{capitalize(`${resource}`)}</p>
                    <List >
                        {Object.entries(data).map((obj, key) => {
                            return (
                                <ListItem key={key} className='data-row'>
                                    {obj.map((d, i) => {
                                        if (i % 2) {
                                            if (`${obj[i - 1]}` == 'id') {
                                                return (
                                                    <div className='obj-value' key={i}>
                                                        {`${d}`}
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div className='obj-value' key={i}>
                                                    {handleInputs(d, `${obj[i - 1]}`)}
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
                        <Link ref={linkRef} href={`/list/${resource}`}>
                            <Button color='error' variant="outlined">Cancelar</Button>
                        </Link>
                        <Button
                            onClick={() => handleSubmit(`${resource}`, `${id}`)}
                            variant="contained"
                        >
                            Salvar
                        </Button>
                        <Link href={`/delete/${resource}/${id}`}>
                            <Button color='error' variant="contained">Apagar</Button>
                        </Link>
                    </div>
                </Main>

            </Layout>
        )
    }
    return (
        <Layout pageTitle="EditPage">

        </Layout>
    )
}