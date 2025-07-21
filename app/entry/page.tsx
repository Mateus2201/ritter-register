"use client";

import React, { useState } from "react";
import LoginComponent from "@/components/login";
import RegisterComponent from "@/components/register";
import backgroundImg from "@/src/img/background.jpg";
import Image from "next/image";

export default function EntryPage() {
    const [showLogin, setShowLogin] = useState(true);

    const ButtonChange = () => {
        return <button onClick={() => setShowLogin(!showLogin)} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            {showLogin ? "Ir para Registro" : "Ir para Login"}
        </button>
    }

    return <main
        className="w-screen h-screen h-max-screen flex items-center justify-center bg-transparent bg-no-repeat bg-cover"
        style={{
            backgroundImage: `url(${backgroundImg.src || backgroundImg})`,
        }}>
        <div className="relative w-[400px] h-[500px] perspective-[1000px]">
            <div className={`relative w-full h-full duration-700 transform-style-preserve-3d ${showLogin ? "rotate-y-0" : "rotate-y-180"}`}
                style={{ transformStyle: "preserve-3d", transitionProperty: "transform", transitionDuration: "0.7s" }}
            >
                <div className="absolute bg-transparent rounded-2xl w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", }}>
                    <LoginComponent >
                        <ButtonChange />
                    </LoginComponent>
                </div>
                <div className="absolute bg-transparent rounded-2xl w-full h-full rotate-y-180 backface-hidden" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", }}>
                    <RegisterComponent >
                        <ButtonChange />
                    </RegisterComponent>
                </div>
            </div>

        </div>
    </main>
}
