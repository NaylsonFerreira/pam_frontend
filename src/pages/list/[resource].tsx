import { HeadFieldProps, services } from '@/models/table';
import { capitalize } from '@/utils/helps';
import { useRouter } from 'next/router';
import Layout from '@/patterns/Layout';
import ListView from '@/patterns/ListView';


interface fieldProps {
    [key: string]: HeadFieldProps[]
}


const fieldDict: fieldProps = {
    'turmas': [
        { label: 'ID', source: 'id' },
        { label: 'Nome', source: 'nome' },
        { label: 'Ano', source: 'ano' },
        { label: 'Turno', source: 'turno' },
    ],
    'alunos': [
        { label: 'ID', source: 'id' },
        { label: 'Nome', source: 'nome' },
        { label: 'Idade', source: 'idade' }
    ],
    'cursos': [
        { label: 'ID', source: 'id' },
        { label: 'Nome', source: 'nome' }
    ],
    'disciplinas': [
        { label: 'ID', source: 'id' },
        { label: 'Nome', source: 'nome' },
        { label: 'Horas aulas', source: 'horas_aulas' },
        { label: 'Obrigatória', source: 'obrigatoria', type: 'boolean' }
    ]
}

export default function ListResource() {
    const router = useRouter();
    const { resource } = router.query;
    if (resource && services[`${resource}`]) {
        return (
            <Layout pageTitle={`List ${resource}`}>
                <p>{capitalize(`${resource}`)}</p>
                <ListView
                    resource={`${resource}`}
                    service={services[`${resource}`]}
                    fields={fieldDict[`${resource}`]}
                />
            </Layout>
        )
    }
    return (
        <Layout pageTitle={'Loading'}>
            <>Loading</>
        </Layout>
    )
}