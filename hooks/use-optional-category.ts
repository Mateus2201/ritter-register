import publicApi from "@/lib/api";
import OptionalCategory from "@/types/OptionalCategory";

export function useOptionalCategory() {
  const getAllOptionalCategory = async (data?: any) => {
    try {
      const response = await publicApi.get("/optional-category", {
        params: data,
      });

      return (response.data as OptionalCategory[]) || [];
    } catch (error) {
      console.error("Error fetching Optional Category:", error);
      throw error;
    }
  };

  const createOptionalCategory = async (OptionalCategory: OptionalCategory) => {
    try {
      const response = await publicApi.post(
        "/optional-category",
        OptionalCategory
      );

      return response.data;
    } catch (error) {
      console.error("Error creating Optional Category:", error);
      throw error;
    }
  };

  const deleteOptionalCategory = async (idOptionalCategory: number) => {
    try {
      const response = await publicApi.delete(`/optional-category/${idOptionalCategory}`);

      return (response.data as OptionalCategory[]) || [];

    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        throw (error as any).response?.data || error;
      }
      throw error;
    }
  };

  return {
    getAllOptionalCategory,
    createOptionalCategory,
    deleteOptionalCategory,
  };
}
