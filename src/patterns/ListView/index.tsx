import { TableContainer, Table as TableMUI } from '@mui/material';
import { useEffect, useState } from 'react';

import { ListViewProps } from '@/models/table';
import TBody from './Tbody';
import THead from './Thead';


export default function ListView({ service, fields, resource }: ListViewProps) {
    const [data, setData] = useState([])

    useEffect(() => {
        let isReady = true
        setTimeout(async () => {
            try {
                const response = await service.getList()
                if (response.results) {
                    setData(response.results)
                }
            } catch (error) {
                setData([])
            }
        }, 100);

        return () => {
            isReady = false
        }
    }, [service])


    return (
        <TableContainer>
            <TableMUI size={'small'}>
                <THead fields={fields} />
                <TBody resource={resource} data={data} fields={fields} />
            </TableMUI>
        </TableContainer>
    );
}