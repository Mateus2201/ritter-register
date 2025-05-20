import publicApi from "@/lib/public-api";
import Manufacturer from "@/types/Manufacturer";

export function useManufacturer() {
  const getAllManufacturer = async (data: any) => {
    try {
      const response = await publicApi.get("/manufacturer", { params: data });
      return response.data as Manufacturer[] || [];
    } catch (error) {
      console.error("Error fetching Manufacturer:", error);
      throw error;
    }
  };

  return { getAllManufacturer };
}
