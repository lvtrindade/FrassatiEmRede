export interface Atividade {
    id: number,
    titulo: string,
    descricao: string,
    data_atividade: string,
    id_tag: number,
    nome_tag: string,
    cor_tag: string,
    imagem_destaque : string,
    galeria?: {id:number; imagem: string}[];
}