import about from '../assets/images/about.jpg'

export default function About() {
  return (
    <section className="py-16 bg-grey-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#008e9b] mb-3">About Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We are dedicated to providing high-quality healthcare services to our
          patients.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img src={about} className="rounded-lg shadow-md" />
          <a
            href="https://www.youtube.com/watch?v=0O9bN0Jj0Y4"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition">
              Play
            </div>
          </a>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">
            We are committed to providing trusted healthcare services with
            skilled professionals, advanced technology, and compassionate care
            to ensure the well-being of our patients.
          </h3>
          <p className="text-[#008e9b]">
            We offer a wide range of medical services including general health
            check-ups, specialized treatments, emergency care, and preventive
            health programs. Our team of experienced doctors, nurses, and
            healthcare professionals work together to deliver personalized care
            tailored to each patient's needs.
          </p>
          <ul className="space-y-2 mt-5 mb-4">
            <li className="mb-2">Experienced medical professionals</li>
            <li className="mb-2">Comprehensive healthcare services</li>
            <li className="mb-2">24/7 emergency care</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
