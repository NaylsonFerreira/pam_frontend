import { THeadProps } from '@/models/table';
import { TableCell, TableHead, TableRow } from '@mui/material';


export default function THead({ fields }: THeadProps) {
    return (
        <TableHead>
            <TableRow>
                {fields?.map(({ label, source }) => (
                    <TableCell key={source} align="center">
                        {label}
                    </TableCell>
                ))}
                <TableCell padding="checkbox">
                    Ver
                </TableCell>
                <TableCell padding="checkbox">
                    Editar
                </TableCell>
                <TableCell padding="checkbox">
                    Apagar
                </TableCell>
            </TableRow>
        </TableHead >
    )
}