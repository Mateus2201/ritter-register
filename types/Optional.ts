import OptionalCategory from "./OptionalCategory";
import VehicleCategory from "./VehicleCategory";

type Optional = {
  idOptional?: number;
  description?: string;
  idOptionalCategory?: number;
  idVehicleCategory?: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  OptionalCategory?: OptionalCategory;
  VehicleCategory?: VehicleCategory;
};

export default Optional;
