import publicApi from "@/lib/api";
import Manufacturer from "@/types/Manufacturer";

export function useManufacturer() {
  const createManufacturer = async (Manufacturer: Manufacturer) => {
    try {
      const response = await publicApi.post("/manufacturer", Manufacturer);

      return response.data;
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        throw (error as any).response?.data || error;
      }
      throw error;
    }
  };

  const getAllManufacturer = async (data?: any) => {
    try {
      const response = await publicApi.get("/manufacturer", { params: data });
      
      return (response.data as Manufacturer[]) || [];
    } catch (error) {
      console.error("Error fetching Manufacturer:", error);
      throw error;
    }
  };

  return { createManufacturer, getAllManufacturer };
}
