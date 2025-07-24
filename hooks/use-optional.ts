import publicApi from "@/lib/api";
import Optional from "@/types/Optional";

export const useOptional = () => {
  const createOptional = async (Optional: Optional) => {
    try {
      const response = await publicApi.post(
        "/optional",
        Optional
      );

      return response.data;

    } catch (error) {
      console.error("Error creating Optional:", error);
      throw error;
    }
  };

  const getAllOptional = async (data?: any) => {
    try {
      const response = await publicApi.get("/optional", {
        params: data,
      });

      return (response.data as Optional[]) || [];
    } catch (error) {
      console.error("Error fetching Optional Category:", error);
      throw error;
    }
  };

  const deleteOptional = async (idOptional: number) => {
    try {
      const response = await publicApi.delete(`/optional/${idOptional}`);

      return (response.data as Optional[]) || [];

    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        throw (error as any).response?.data || error;
      }
      throw error;
    }
  };

  return { createOptional, getAllOptional, deleteOptional };
};
