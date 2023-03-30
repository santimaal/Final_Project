import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function DemoCarousel({ sports }) {
    return (
        <>
            {sports.length == 5 && (
                <Carousel autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false} stopOnHover={false}>
                    {sports.map((item, id) => {
                        return (<div className='h-[97vh]' key={id}>
                            <img src={item.img} className="h-full w-full object-cover" />
                            <button href="" className='w-full absolute top-[87%] text-center flex justify-center'>
                                <h1 className="text-white flex bg-black text-2xl rounded-full p-4">{item.name}</h1>
                            </button>
                        </div>)
                    })}
                </Carousel>
            )}
        </>
    );
};