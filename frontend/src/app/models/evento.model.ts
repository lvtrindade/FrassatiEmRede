export interface Evento {
    id?: number;
    data_inicio: string;
    data_fim: string;
    horario_inicio: string;
    horario_fim: string;
    titulo: string;
    descricao: string;
    id_tag: number;
    nome_tag?: string;
    cor_tag?: string;
}