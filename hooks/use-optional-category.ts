import publicApi from "@/lib/public-api";
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
  
  const updateOptionalCategory = async (data: any) => {
    try {
      const response = await publicApi.put(
        `/optional-category/${data.id}`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error updating Optional Category:", error);
      throw error;
    }
  };

  return {
    getAllOptionalCategory,
    createOptionalCategory,
    updateOptionalCategory,
  };
}
