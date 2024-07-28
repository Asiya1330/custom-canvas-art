"use client"
import CardGrid from "./components/Home/CardGrid";
import FooterTop from "./components/Home/FooterTop";
import Hero from "./components/Home/Hero";
import Steps from "./components/Home/Steps";

export default function Home() {
  const cards = [
    {
      imageSrc: "/home/cup-icon.png",
      title: "One of A Kind Art",
      description: "Create stunning personalized posters with unique art crafted just for you."
    },
    {
      imageSrc: "/home/cup-icon.png",
      title: "Satisfaction Guarantee",
      description: "Your satisfaction is our priority, ensuring you love your purchase every time."
    },
    {
      imageSrc: "/home/cup-icon.png",
      title: "Unchained Creativity",
      description: "Embark on a journey to unlock the limitless potential of unchained creativity."
    },
    {
      imageSrc: "/home/cup-icon.png",
      title: "Affordable Prices",
      description: "Our range of high-quality offerings at prices designed to fit your budget."
    }
  ];

  const steps = [
    {
      title: "Imagine Your Art",
      description: "Start by using our advanced AI tool to visualize the perfect piece of art. Choose from a variety of styles, themes, and inspirations to create something that truly reflects your personality and complements your home decor.",
      icon: '/home/emoji-home.png'
    },
    {
      title: "Customize and Order",
      description: "Once you've designed your ideal artwork, you can customize it further to ensure it fits perfectly in your space. Adjust the size, color palette, and any other details to match your vision.",
      icon: '/home/emoji-home.png'
    },
    {
      title: "Receive and Enjoy",
      description: "When it arrives, you'll have a unique, personalized piece that adds a special touch to your home. Enjoy the compliments and the satisfaction of having a one-of-a-kind art piece that you created.",
      icon: '/home/emoji-home.png'
    }
  ];
  const handleButtonClick = () => {
    alert("Button clicked!");
  };
  return (
    <>
      <Hero />
      <CardGrid cards={cards} />
      {/* <ImageCarousel /> */}
      {/* <ThreeImageDisplay /> */}
      <Steps steps={steps} />
      <FooterTop
        title="Create Your Art Today!"
        buttonText="Start Creating Art"
        onButtonClick={handleButtonClick}
        topLeftIconSrc="/home/left-vector.png"
        bottomRightIconSrc="/home/right-vector.png"
      />
    </>
  );
}
