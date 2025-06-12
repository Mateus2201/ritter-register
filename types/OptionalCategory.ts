import Optional from "./Optional";

type OptionalCategory = {
  idOptionalCategory?: number;
  description: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  optional: Optional[];
};

export default OptionalCategory;
