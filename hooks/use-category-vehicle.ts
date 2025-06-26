import publicApi from "@/lib/api";
import Color from "@/types/Color";

export function useColors() {
  const getAllColors = async (data: any) => {
    try {
      const response = await publicApi.get("/colors", { params: data });
      return (response.data as Color[]) || [];
    } catch (error) {
      console.error("Error fetching colors:", error);
      throw error;
    }
  };

  return { getAllColors };
}
