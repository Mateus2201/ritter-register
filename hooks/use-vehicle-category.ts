import publicApi from "@/lib/api";
import VehicleCategory from "@/types/VehicleCategory";

export function useVehicleCategory() {
  const createVehicleCategory = async (VehicleCategory: VehicleCategory) => {
    try {
      const response = await publicApi.post("/vehicle-category", VehicleCategory);

      return response.data;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        throw (error as any).response?.data || error;
      }
      throw error;
    }
  };

  const getAllVehicleCategory = async (data?: any) => {
    try {
      const response = await publicApi.get("/vehicle-category", { params: data });
      
      return (response.data as VehicleCategory[]) || [];
    } catch (error) {
      console.error("Error fetching Vehicle Category:", error);
      throw error;
    }
  };

  return { createVehicleCategory, getAllVehicleCategory };
}
