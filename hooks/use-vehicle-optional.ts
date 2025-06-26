import publicApi from "@/lib/api";
import VehicleOptional from "@/types/VehicleOptional";

export const useVehicleOptional = () => {
  const getVehicleOptionalByIdVehicle = async (idVehicle: number) => {
    try {
      const response = await publicApi.get(
        `/cars-options/${idVehicle.toString()}`
      );

      return (response.data as VehicleOptional[]) || [];
    } catch (error) {
      console.error("Error fetching VehicleOptional:", error);
      throw error;
    }
  };

  const createVehicleOptional = async (VehicleOptional: VehicleOptional[]) => {
    try {
      const response = await publicApi.post("/cars-options", VehicleOptional);

      return (response.data as VehicleOptional[]) || null;
    } catch (error) {
      console.error("Error creating Optional Category:", error);
      throw error;
    }
  };

  const deleteVehicleOptional = async (idVehicle: number) => {
    try {
      const response = await publicApi.delete(`/cars-options/${idVehicle}`);

      return (response.data as VehicleOptional) || null;
    } catch (error) {
      console.error("Error updating Optional Category:", error);
      throw error;
    }
  };

  return {
    getVehicleOptionalByIdVehicle,
    createVehicleOptional,
    deleteVehicleOptional,
  };
};
