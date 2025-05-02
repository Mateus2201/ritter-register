import publicApi from "@/lib/public-api";

export function useColors() {
  const getAllColors = async (data: any) => {
    try {
      const response = await publicApi.get("/colors", { params: data });
      return response.data;
    } catch (error) {
      console.error("Error fetching colors:", error);
      throw error;
    }
  };

  return { getAllColors };
}
