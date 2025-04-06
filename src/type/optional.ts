import TipoOpcional from "./optional-type";

type Optional  = {
   idopcional: number;
   nome: string;
   idtipo_opcional: number;
   idtipo_veiculo: number;
   data_cadastro: Date;
   login_cadastro: string;
   data_ultima_alteracao: Date;
   login_ultima_alteracao: string;
   TipoOpcional: TipoOpcional
}

export default Optional;
