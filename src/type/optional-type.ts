type TipoOpcional = {
  idtipo_opcional: number;
  descricao: string;
  data_cadastro: Date;
  login_cadastro: string;
  data_ultima_alteracao: Date | null;
  login_ultima_alteracao: string | null;
};

export default TipoOpcional;
