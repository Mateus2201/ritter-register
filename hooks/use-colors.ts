import publicApi from "@/lib/api";
import Color from "@/types/Color";

export function useColors() {
  const createColor = async (Color: Color) => {
    try {
      const response = await publicApi.post(
        "/colors",
        Color
      );

      return response.data;

    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        throw (error as any).response?.data || error;
      }
      throw error;
    }
  };  

  const getAllColors = async (data?: any) => {
    try {
      const response = await publicApi.get("/colors", { params: data });

      return (response.data as Color[]) || [];

     } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        throw (error as any).response?.data || error;
      }
      throw error;
    }
  };

  return { createColor, getAllColors };
}
