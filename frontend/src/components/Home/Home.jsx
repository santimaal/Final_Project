import { useSports } from "../../hooks/useSport"
import DemoCarousel from "../Carousel/Carousel"

export default function HomeComponent() {
    const { sports } = useSports()
    return (
        <DemoCarousel sports={sports}></DemoCarousel>
    )
}