import publicApi from "@/lib/public-api";

export const useVehicle = () => {
  const createVehicle = async (data: any) => {
    const response = await publicApi.post("/vehicles", data);
    return response.data;
  };

  return { createVehicle };
};
