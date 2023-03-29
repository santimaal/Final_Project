import { Carousel, CarouselItem } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function DemoCarousel({ sports }) {
    console.log(sports);


    return (
        <>
            {sports && (
                <Carousel autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
                    {sports.map((item) => {
                        return (<div className='h-[97vh]'>
                            <img src={item.img} className="h-full w-full object-cover" />
                            <a href="" className='w-full absolute top-[87%] text-center flex justify-center'>
                                <h1 className="text-white flex bg-black text-2xl rounded-full p-4">{item.name}</h1>
                            </a>
                        </div>)
                    })}
                </Carousel>
            )}
        </>
    );
};