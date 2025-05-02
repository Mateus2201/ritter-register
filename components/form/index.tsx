"use client"

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Optionals from "../optionals";
import UploadImages from "../images-upload";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useColors } from "@/hooks/use-colors";
import CheckboxComponent from "../checkbox";

export default function FormRegister() {
    const { getAllColors } = useColors();

    const fetchColors = async () => {
        try {
            const colors = await getAllColors({});
            console.log('colors', colors)
        } catch (error) {
            console.error('Erro ao buscar cores:', error)
        }
    }

    useEffect(() => {
        fetchColors()
    }, [])

    return <div className="container  bg-background text-white max-w-4xl mx-auto p-6 space-y-6 h-min-screen">
        <h1 className="text-2xl font-semibold">Novo Veículo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CheckboxComponent label="Exibe placa" id="exibePlaca"  isChecked />
            <CheckboxComponent label="Vendido" id="Vendido"  isChecked />
            
            
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Fabricante" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="fabricante-a">Fabricante A</SelectItem>
                    <SelectItem value="fabricante-b">Fabricante B</SelectItem>
                </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Ano Fab." />
                <Input placeholder="Modelo" />
            </div>

            <Select>
                <SelectTrigger className="w-full"><SelectValue placeholder="Combustível" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="gasolina">Gasolina</SelectItem>
                    <SelectItem value="alcool">Álcool</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                </SelectContent>
            </Select>

            <Input placeholder="Motor" />

            <Select>
                <SelectTrigger className="w-full"><SelectValue placeholder="Cor" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="preto">Preto</SelectItem>
                    <SelectItem value="branco">Branco</SelectItem>
                    <SelectItem value="vermelho">Vermelho</SelectItem>
                    <SelectItem value="azul">Azul</SelectItem>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger><SelectValue placeholder="Tipo do Veículo" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="caminhao">Caminhão</SelectItem>
                </SelectContent>
            </Select>

            <Input placeholder="Portas" type="number" />
            <Input placeholder="Lugares" type="number" />
            <Input placeholder="Quilometragem" type="number" />

            <div className="col-span-2 flex flex-col md:flex-row gap-2 items-center">
                <Input placeholder="Valor" className="w-full md:w-auto" />
                <span>+</span>
                <Input placeholder="Prestações" className="w-full md:w-auto" />
                <span>de R$</span>
                <Input placeholder="Valor prestação" className="w-full md:w-auto" />
                <Checkbox id="exibeValor" defaultChecked className="ml-2" /> <label htmlFor="exibeValor">Exibe valor</label>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="aceitaPropostas" defaultChecked />
                    <Label htmlFor="aceitaPropostas">Aceita propostas</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="aceitaTroca" defaultChecked />
                    <Label htmlFor="aceitaTroca">Aceita troca</Label>
                </div>
            </div>

            <div className="col-span-2">
                <Textarea placeholder="Observações do Vendedor" />
            </div>
        </div>
        <Optionals />
        <UploadImages />
        <Button className="mt-6">Salvar Veículo</Button>
    </div>
}
