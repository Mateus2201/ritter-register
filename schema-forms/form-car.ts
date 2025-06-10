import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataCar() {
  const schemaCar = z.object({
    licensePlate: z.string().min(7, "Placa inválida"),
    model: z.string().min(2, "Informe o modelo"),
    manufacturer: z.string().nonempty("Selecione o fabricante"),
    color: z.string().nonempty("Informe a cor"),
    fuel: z.string().nonempty("Informe o combustível"),
    vehicleType: z.string().nonempty("Informe o tipo"),
    manufacturingYear: z.coerce.number().min(1900),
    modelYear: z.coerce.number().min(1900),
    engine: z.string().optional(),
    doorCount: z.coerce.number().min(1),
    seatCount: z.coerce.number().min(1),
    mileage: z.coerce.number().int().min(-1),
    price: z.coerce.number().nonnegative(),
    prestacoes: z.coerce.number().optional(),
    installmentValue: z.coerce.number().optional(),
    notes: z.string().optional(),
  });

  type FormData = z.infer<typeof schemaCar>;

  const useSetForm = useForm<FormData>({
    resolver: zodResolver(schemaCar),
    defaultValues: {
      licensePlate: "",
      model: "",
      manufacturer: "",
      manufacturingYear: new Date().getFullYear(),
      modelYear: new Date().getFullYear(),
      fuel: "",
      engine: "",
      color: "",
      vehicleType: "",
      doorCount: 4,
      seatCount: 5,
      mileage: 0,
      price: 0,
      prestacoes: 0,
      installmentValue: 0,
      notes: "",
    },
  });

  return { useSetForm, schemaCar };
}

export default { FormDataCar };
