import publicApi from "@/lib/api";
import Vehicle from "@/types/Vehicle";
import VehicleImage from "@/types/VehicleImage";

export const useVehicleImage = () => {
  const getAllVehicleImage = async (id?: number) => {
    try {
      const response = await publicApi.get(`/cars/${id}/images`);
      const { images, fromCache } = response.data;

      console.log("Response from getAllVehicleImage:", fromCache);

      return (images as VehicleImage[]) || [];
    } catch (error) {
      console.error("Error fetching Vehicle:", error);
      throw error;
    }
  };

  const createVehicleImage = async (
    images: { id: string; file: File; name: string; order: number }[],
    idVehicle: number
  ) => {
    try {
      const formData = new FormData();

      formData.append("idVehicle", idVehicle.toString());

      images.forEach(({ file, name, order }, index) => {
        formData.append("images", file, name);
        formData.append("orders", String(order)); // sem []
      });

      for (const pair of formData.entries()) {
        console.log('logs', pair[0], pair[1]);
      }

      const response = await publicApi.post("/upload", formData); 


      // console.log(response);

      return response.data as VehicleImage[];
    } catch (error) {
      console.log(error);
    }
  };

  const updateVehicle = async (data: Vehicle) => {
    try {
      console.log(data);

      const response = await publicApi.put(`/cars`, data);

      return (response.data as Vehicle) || null;
    } catch (error) {
      console.error("Error updating Optional Category:", error);
      throw error;
    }
  };

  const deleteVehicleImage = async (id: number) => {
    try {
      const response = await publicApi.delete(`/cars-image/${id}/images`);
      return response.data;
    } catch (error) {
      console.error("Error deleting Vehicle Image:", error);
      throw error;
    }
  };

  return {
    getAllVehicleImage,
    createVehicleImage,
    updateVehicle,
    deleteVehicleImage,
  };
};
