"use client";

import React, { useEffect, useMemo, useState } from 'react';
import GridVehicle from '@/components/grid-vehicle';
import publicApi from '@/lib/api';
import ReactPaginate from 'react-paginate';
import Vehicle from '@/types/Vehicle';
import { useVehicle } from '@/hooks/use-vehicle';

const itensForPages = 9

export default function Stock() {
    const [offset, setPageConfig] = useState<number>(0);
    const [items, setItems] = useState<Vehicle[]>([]);
    const [countCarsTotal, setCountCarsTotal] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);

    const { getAllVehicle } = useVehicle();


    useEffect(() => {
        getAllVehicle()
            .then((data) => {
                setItems(data);
                setCountCarsTotal(data.length);
                setLoading(false);
            })
            .catch(() => {
                console.log("Acesso negado! Redirecionando...");
            });


    }, [offset]);

    const totalPages = useMemo(() => {
        return countCarsTotal ? Math.ceil(countCarsTotal / itensForPages) : 0;
    }, [countCarsTotal, itensForPages]);

    const changePage = (event: { selected: number }) => {
        setPageConfig(event.selected++)
    };


    return <div className='md:flex h-full  '>
        <div className='h-full w-full'>
            {items.length > 0 ? <div className={'flex items-center justify-center '}>
                <GridVehicle Vehicles={items} classNameCard='bg-white text-primary' />
            </div> : <div className='flex items-center justify-center w-full h-full'>
                <h1 className='text-3xl font-bold text-background'>Nenhum veículo encontrado</h1>
            </div>}
        </div>
    </div>
};

