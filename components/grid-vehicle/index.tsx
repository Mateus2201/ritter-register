import React from 'react'
import CardCar from '../card-car';
import Vehicle from '@/types/Vehicle';
import { cn } from '@/lib/utils';

interface GridVehicleProps {
    Vehicles: Vehicle[]
    className?: string
    classNameCard?: string
}

export default function GridVehicle({ Vehicles, className, classNameCard }: GridVehicleProps) {
    return <div className={cn("container md:grid md:grid-cols-2 xl:grid-cols-4 gap-5", className)}>
        {Vehicles
            ? Vehicles.map(item => <CardCar key={item.idVehicle} Vehicle={item} className={classNameCard} />)
            : <></>
        }
    </div>
}
