import { StaticImageData } from "next/image";
import Color from "./color";
import TypeCars from "./type-cars";
import Produced from "./produced";

type Car = {
  idveiculo: number;
  idtipo_veiculo: number;
  idfabricante: number;
  idcor: number;
  placa: string;
  exibicao_placa: string;
  modelo: string;
  ano_fabricacao: number;
  ano_modelo: number;
  combustivel: string;
  motor: string;
  qtde_porta: number;
  qtde_lugar: number;
  quilometragem: number;
  valor: number;
  exibicao_valor: string;
  quantidade_parcela: number;
  valor_parcela: number;
  destaque: string;
  aceita_proposta: string;
  aceita_troca: string;
  vendido: string;
  observacao: string;
  data_cadastro: Date;
  login_cadastro: string;
  data_ultima_alteracao: Date;
  login_ultima_alteracao: string;
  url_image: string;
  Cor: Color;
  TipoVeiculo: TypeCars;
  Fabricante: Produced;
}

export default Car;
