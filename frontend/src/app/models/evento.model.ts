export interface Evento {
    id?: number;
    data_evento: string;
    horario: string;
    titulo: string;
    descricao: string;
    id_tag: number;
    nome_tag?: string;
    cor_tag?: string;
}