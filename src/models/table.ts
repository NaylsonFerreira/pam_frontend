import ServiceInterface from './service'
import alunoService from '@/services/aluno'
import cursoService from '@/services/curso'
import disciplinaService from '@/services/disciplina'
import turmaService from '@/services/turma'

export interface TBodyProps {
    data: DataProps[]
    fields: HeadFieldProps[]
    resource: string
}

export interface THeadProps {
    fields: HeadFieldProps[]
}


export interface HeadFieldProps {
    label: string
    source: string
    type?: 'boolean' | ''
    href?: string
}
export interface DataProps {
    [key: string]: any
}

export interface ListViewProps {
    service: ServiceInterface
    fields: HeadFieldProps[]
    resource: string
}


interface svcProps {
    [key: string]: ServiceInterface
}

export const services: svcProps = {
    'turmas': turmaService,
    'alunos': alunoService,
    'cursos': cursoService,
    'disciplinas': disciplinaService
}