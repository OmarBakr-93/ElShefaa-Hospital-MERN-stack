import About from "../components/About";
import CallToAction from "../components/CallToAction";
import Departments from "../components/Departments";
import Doctors from "../components/Doctors";
import HeroSlider from "../components/HeroSlider";
import States from "../components/States";


export default function Home() {
  return (
    <>
      <HeroSlider />
      <CallToAction />
      <About />
      <States />
      <Departments />
      <Doctors />
    </>
  )
}
