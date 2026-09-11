export interface MovimentoFinanceiroReceita {
    id: number;
    numeroDocumento: string;
    dataReceita: string;
    dataRecebimento: string;
    statusRecebimento: string;
    tipoRecebimento: string;
    formaRecebimento: string;
    valor: number;
    observacao: string;
    receita: boolean;
    userId: number;
    carteiraId: number;
    periodoId: number;
    descricaoReceitaId: number;
    descricaoReceita: string;
}

export interface MovimentoFinanceiroDespesa {
    id: number;
    numeroDocumento: string;
    dataDespesa: string;
    dataPagamento: string;
    statusPagamento: string;
    tipoPagamento: string;
    formaPagamento: string;
    valor: number;
    observacao: string;
    despesa: boolean;
    carteiraId: number;
    userId: number;
    periodoId: number;
    descricaoDespesaId: number;
    descricaoDespesa: string;
}