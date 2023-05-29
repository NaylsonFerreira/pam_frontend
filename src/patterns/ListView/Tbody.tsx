import { CheckCircle, DeleteOutlined, EditOutlined, Visibility } from '@mui/icons-material';
import { TBodyProps } from '@/models/table';
import { TableBody, TableCell, TableRow } from '@mui/material';
import Link from 'next/link';

export default function TBody({ data, fields, resource }: TBodyProps) {
    const handleBoolean = (v: boolean) => {
        if (v) {
            return <CheckCircle color="success" />
        } else {
            return <CheckCircle color="disabled" />
        }
    }
    return (
        <TableBody>
            {data?.map((d, i) => (
                <TableRow hover role="checkbox" key={i}>
                    {fields?.map((f, j) => (
                        <TableCell key={j} align="center">
                            {
                                f.type == 'boolean' ? handleBoolean(d[f.source]) : d[f.source]
                            }
                        </TableCell>
                    ))
                    }
                    <TableCell padding="checkbox" align="center">
                        <Link href={`/detail/${resource}/${d['id']}`}>
                            <Visibility color="primary" />
                        </Link>
                    </TableCell>
                    <TableCell padding="checkbox" align="center">
                        <Link href={`/edit/${resource}/${d['id']}`}>
                            <EditOutlined color="primary" />
                        </Link>
                    </TableCell>
                    <TableCell padding="checkbox" align="center">
                        <Link href={`/delete/${resource}/${d['id']}`}>
                            <DeleteOutlined color="primary" />
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}