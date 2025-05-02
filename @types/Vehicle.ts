type Vehicle = {
  id: number; // idveiculo
  vehicleTypeId: number; // idtipo_veiculo
  manufacturerId: number; // idfabricante
  colorId: number; // idcor
  licensePlate: string; // placa
  licensePlateDisplay: boolean; // exibicao_placa
  model: string; // modelo
  manufacturingYear: number; // ano_fabricacao
  modelYear: number; // ano_modelo
  fuel: string; // combustivel
  engine: string; // motor
  doorCount: number; // qtde_porta
  seatCount: number; // qtde_lugar
  mileage: number; // quilometragem
  price: number; // valor
  priceDisplay: boolean; // exibicao_valor
  installmentCount: number; // quantidade_parcela
  installmentValue: number; // valor_parcela
  featured: boolean; // destaque
  allowsProposal: boolean; // aceita_proposta
  allowsTrade: boolean; // aceita_troca
  sold: boolean; // vendido
  notes: string; // observacao
  createdAt: Date; // data_cadastro
  createdBy: string; // login_cadastro
  updatedAt: Date; // data_ultima_alteracao
  updatedBy: string; // login_ultima_alteracao
};

export default Vehicle;
