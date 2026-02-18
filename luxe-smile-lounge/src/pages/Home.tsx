import Button from "../components/Button";
import Slideshow from "../components/Slideshow";

const Home = () => {
  const mySlides = [
    {
      content: <div className="min-w-full h-full bg-blue-500"></div>,
    },
    {
      content: <div className="min-w-full h-full bg-black"></div>,
    },
    {
      content: <div className="min-w-full h-full bg-purple-900"></div>,
    },
  ];

  return (
    <>
      <Slideshow slides={mySlides} durationMs={5000} stopOnInteraction={true} />

      <div className="flex flex-col gap-4">
        <Button
          onClick={() => {
            console.log("click");
          }}
        >
          ABOUT US
        </Button>
      </div>
    </>
  );
};

export default Home;
