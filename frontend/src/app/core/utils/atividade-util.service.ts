import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AtividadeUtilService {
  formatarData(data: string): string {
    if (!data || data === '0000-00-00') return 'Data não disponível';
    const date = new Date(`${data}T00:00:00-03:00`);
    return isNaN(date.getTime())
      ? 'Data inválida'
      : date.toLocaleDateString('pt-BR');
  }

  gerarFormDataParaEdicao(
    atividade: any,
    imagemPrincipal: File | null,
    novasImagens: { file: File }[],
    imagensRemovidas: number[]
  ): FormData {
    const formData = new FormData();

    formData.append('id', atividade.id.toString());
    formData.append('titulo', atividade.titulo);
    formData.append('descricao', atividade.descricao);
    formData.append('data_atividade', atividade.data_atividade);
    formData.append('id_tag', atividade.id_tag.toString());
    formData.append('imagens_removidas', JSON.stringify(imagensRemovidas));

    if (imagemPrincipal) {
      formData.append('imagem_principal', imagemPrincipal);
    }

    novasImagens.forEach((img, index) => {
      formData.append(`imagens_galeria[${index}]`, img.file);
    });

    return formData;
  }

  filtrarAtividadesPorTagETermo(
    atividades: any[],
    tags: { id: number; nome: string }[],
    termo: string,
    tagSelecionada: number | null
  ): any[] {
    return atividades.filter((atividade) => {
      const correspondeTag = tagSelecionada
        ? +atividade.id_tag === +tagSelecionada
        : true;
      const correspondeTermo = termo
        ? atividade.titulo?.toLowerCase().includes(termo.toLowerCase())
        : true;

      return correspondeTag && correspondeTermo;
    });
  }

  calcularTotalPaginas(lista: any[], porPagina: number): number {
    return Math.ceil(lista.length / porPagina) || 1;
  }
}
