import publicApi from "@/lib/api";
import Vehicle from "@/types/Vehicle";

export const useVehicle = () => {
  const getAllVehicle = async (data?: any) => {
    try {
      const response = await publicApi.get("/cars", {
        params: data,
      });

      return (response.data as Vehicle[]) || [];
    } catch (error) {
      console.error("Error fetching Vehicle:", error);
      throw error;
    }
  };

  const getVehicleById = async (data?: any) => {
    try {
      const response = await publicApi.get(`/cars/${data.id}`);

      return (response.data as Vehicle) || null;
    } catch (error) {
      console.error("Error fetching Optional Category:", error);
      throw error;
    }
  };

  const createVehicle = async (Vehicle: Vehicle) => {
    try {
      const response = await publicApi.post("/cars", Vehicle);

      return (response.data as Vehicle) || null;
    } catch (error) {
      console.error("Error creating Optional Category:", error);
      throw error;
    }
  };

  const updateVehicle = async (data: Vehicle) => {
    try {
      const response = await publicApi.put(`/cars`, data);

      return (response.data as Vehicle) || null;
    } catch (error) {
      console.error("Error updating Optional Category:", error);
      throw error;
    }
  };

  return {
    getAllVehicle,
    createVehicle,
    updateVehicle,
    getVehicleById,
  };
};
