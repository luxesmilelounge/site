import Slideshow from "../components/Slideshow";

const Home = () => {

    const mySlides = [
        {

            content: <div className="min-w-full h-full bg-blue-500">

            </div>

        }
        ,
        {
            content: <div className="min-w-full h-full bg-black">

            </div>
        },
        {
            content: <div className="min-w-full h-full bg-purple-900">

            </div>
        }
    ]

    return (
        <>
            <Slideshow slides={mySlides} durationMs={5000} stopOnInteraction={true} />
        </>
    );
}

export default Home;

