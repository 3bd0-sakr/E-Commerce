'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'

export default function Carusor({images,title}:{images:string[],title:string}) {
    return <>

        <Carousel opts={{ align: "start", loop: true, }} plugins={[Autoplay({ delay: 1500, }),]}>
            <CarouselContent>
                {images.map((img, index) =>
                    <CarouselItem key={index}>
                        <Image src={img} width={300} height={250} alt={title} />
                    </CarouselItem>
                )}
            </CarouselContent>
        </Carousel>
    </>
}
