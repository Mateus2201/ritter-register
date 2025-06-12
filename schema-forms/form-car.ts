import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataCar() {
  const schemaCar = z.object({
    idManufacturer: z.coerce
      .number()
      .min(0, "Informe o Fabricante")
      .nonnegative("Selecione o fabricante"),
    idVehicleCategory: z.coerce
      .number()
      .min(0, "Informe o Tipo")
      .nonnegative("Informe o tipo"),
    idColor: z.coerce.number().min(0, "Informe a Cor").nonnegative("Informe a cor"),
    licensePlate: z.string().min(7, "Placa inválida"),
    licensePlateDisplay: z.coerce.boolean().optional(),
    model: z.string().min(2, "Informe o modelo"),
    manufacturingYear: z.coerce.number().min(1900),
    modelYear: z.coerce.number().min(1900),
    fuel: z.string().nonempty("Informe o combustível"),
    engine: z.string().optional(),
    doorCount: z.coerce.number().min(1),
    seatCount: z.coerce.number().min(1),
    mileage: z.coerce.number().int().min(-1),
    price: z.coerce.number().nonnegative(),
    priceDisplay: z.coerce.boolean().optional(),
    installmentCount: z.coerce
      .number()
      .int()
      .min(0, "Quantidade mínima da parcela")
      .optional(),
    installmentValue: z.coerce
      .number()
      .min(0, "Valor mínimo da parcela")
      .optional(),
    featured: z.coerce.boolean().optional(),
    allowsProposal: z.coerce.boolean().optional(),
    allowsTrade: z.coerce.boolean().optional(),
    sold: z.coerce.boolean().optional(),
    notes: z.string().optional(),
    armored: z.coerce.boolean().optional(),
    classic: z.coerce.boolean().optional(),
  });

  type FormData = z.infer<typeof schemaCar>;

  const useSetForm = useForm<FormData>({
    resolver: zodResolver(schemaCar),
    defaultValues: {
      licensePlate: "",
      model: "",
      idManufacturer: 0,
      manufacturingYear: new Date().getFullYear(),
      modelYear: new Date().getFullYear(),
      fuel: "",
      engine: "",
      idColor: 0,
      idVehicleCategory: 0,
      doorCount: 4,
      seatCount: 5,
      mileage: 0,
      price: 0,
      installmentValue: 0,
      notes: "",

      licensePlateDisplay: false,
      priceDisplay: false,
      installmentCount: 0,
      featured: false,
      allowsProposal: false,
      allowsTrade: false,
      sold: false,
      armored: false,
      classic: false,
    },
  });

  return { useSetForm, schemaCar };
}

export default { FormDataCar };
