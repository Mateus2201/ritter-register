import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Image from "next/image"; // ou "react-img" dependendo do seu projeto
import { useVehicleImage } from "@/hooks/use-vehicle-images";
import VehicleImage from "@/types/VehicleImage";

interface VehicleImageCarouselProps {
    idVehicle: number;
}

const VehicleImageCarousel = ({ idVehicle }: VehicleImageCarouselProps) => {
    const [mainSwiper, setMainSwiper] = useState<any>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [images, setImages] = useState<VehicleImage[]>([]); // Assumindo tipo

    const { getAllVehicleImage } = useVehicleImage();

    useEffect(() => {
        getAllVehicleImage(idVehicle)
            .then((data) => {
                if (data && Array.isArray(data)) setImages(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar imagens do veículo:", error);
            });
    }, []);

    return <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        direction="horizontal"
        slidesPerView={1}
        pagination={{ clickable: true }}
        initialSlide={selectedIndex}
        onSwiper={setMainSwiper}
        className="w-full h-64" // <- ALTURA CLARA DEFINIDA AQUI
    >
        {images.map((image, index) => (
            <SwiperSlide key={image.idVehicleImage || index} className="flex justify-center items-center">
                <Image
                    src={image.secureURL}
                    alt={image.name || `imagem-${index}`}
                    width={400}
                    height={300}
                    className="object-cover rounded max-h-full max-w-full"
                    priority={index === 0}
                />
            </SwiperSlide>
        ))}
    </Swiper>
};

export default VehicleImageCarousel;
