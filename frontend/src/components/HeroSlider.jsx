import Slider from "react-slick"
import slide_1 from '../assets/images/hero-carousel-1.jpg'
import slide_2 from '../assets/images/hero-carousel-2.jpg'
import slide_3 from '../assets/images/hero-carousel-3.jpg'
export default function HeroSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slides = [
    { 
      image: slide_1, 
      title: "Your Health, Our Priority", 
      text: "We Provide Advanced Medical Care With Experience Doctors" 
    },
    { image: slide_2, title: "Specialized Medical Services", text: "From Cardiology to Pediatrics, Our Expert Team Has You Covered" },
    { image: slide_3, title: "Easy Online Appointment", text: "Book Your Appointment Quickly and Easily on Our Website" }
  ];

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div className="relative w-full h-[80vh]" key={index}>
            <img className="w-full h-full object-cover" src={slide.image} />
            <div className="absolute inset-0 bg-grey bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
              <h2 className="text-4xl text-[#64daea] font-bold mb-4" >{slide.title}</h2>
              <p className="max-w-xl text-xl">{slide.text}</p>
              <button href="#appointment" className="mt-6 inline-block  py-3 px-6 rounded ">
                Read More
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  )
}
