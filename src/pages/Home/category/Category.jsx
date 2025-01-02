import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/section-title/SectionTitle';

const Category = () => {
    return (
        <div className='my-16'>

            <SectionTitle subHeading={"From 11am to 10pm"} heading={"Order Online"}>

            </SectionTitle>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className='w-full h-[400px]' src={slide1} alt="" />
                    <h3 className='text-4xl uppercase text-center -mt-16 text-white'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                <img className='w-full h-[400px]' src={slide2} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white'>Pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                <img className='w-full h-[400px]' src={slide3} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white'>Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                <img className='w-full h-[400px]' src={slide4} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white'>Desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                <img className='w-full h-[400px]' src={slide5} alt="" />
                <h3 className='text-4xl uppercase text-center -mt-16 text-white'>Salads</h3>
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default Category;