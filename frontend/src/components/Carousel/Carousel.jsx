import { Carousel, CarouselItem } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function DemoCarousel() {

    return (
        <Carousel autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
            <div className='h-[97vh]' >
                <img src="https://okdiario.com/img/2019/08/10/origen-del-futbol.jpg" className="h-full w-full object-cover" />
                <a href="" className='w-full absolute top-[87%] text-center flex justify-center'>
                    <h1 className="text-white flex bg-black text-2xl rounded-full p-4">Fuchibol</h1>
                </a>
            </div >
            <div className='h-[97vh]' >
                <img src="https://images7.alphacoders.com/734/thumb-1920-734192.jpg" className="h-full w-full object-cover" />
                <a href="" className='w-full absolute top-[87%] text-center flex justify-center'>
                    <h1 className="text-white flex bg-black text-2xl rounded-full p-4">Teni</h1>
                </a>
            </div >
            <div className='h-[97vh]' >
                <img src="https://www.xtrafondos.com/descargar.php?id=1775&resolucion=2560x1600" className="h-full w-full object-cover" />
                <a href="" className='w-full absolute top-[87%] text-center flex justify-center'>
                    <h1 className="text-white flex bg-black text-2xl rounded-full p-4">Bazque</h1>
                </a>
            </div >
        </Carousel>
    );
};