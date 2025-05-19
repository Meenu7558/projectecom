import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const Carousel = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="rounded-lg"
      >
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dw4wfppju/image/upload/v1747665717/makeupbanner_pghroz.png"
            alt="Makeup Sale"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dw4wfppju/image/upload/v1747665748/skinbanner_czbagg.png"
            alt="Skincare Deals"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dw4wfppju/image/upload/v1747667162/hairbanner_vtfrry.png"
            alt="Haircare Essentials"
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Carousel
