"use client";

import React, { useEffect, useMemo, useState } from 'react';
import GridVehicle from '@/components/grid-vehicle';
import publicApi from '@/lib/public-api';
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
            {typeof countCarsTotal === 'number' && countCarsTotal > 9 &&
                <ReactPaginate
                    previousLabel={"Anterior"}
                    nextLabel={"Próximo"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={changePage}
                    containerClassName="flex items-center justify-center gap-2 w-full h-15 p-0 mt-5"
                    activeClassName="text-xl bg-secondary text-offWhite"
                    previousClassName="select-none items-center  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                    nextClassName="select-none items-center  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                    pageClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                    breakClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                    disabledClassName="select-none items-center not-md:hidden  hover:bg-secondary hover:text-offWhite border-white rounded-md p-2 "
                />}
        </div>
    </div>
};

