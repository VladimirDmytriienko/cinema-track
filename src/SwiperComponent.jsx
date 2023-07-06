import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// // import required modules
import { Pagination, Navigation } from "swiper";

const SwiperComponent = ({movies}) => {
  
    return (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          > 
            {
              movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <div className="gradient"></div>
                  <img  className="movie-slider__img" src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}  alt="poster"/>
                  <div className="banner-btn">
                    <button>Play</button>
                    <button>Details</button>
                  </div>
                </SwiperSlide>
                
              ))
            }
            
          </Swiper>
        </>
      );
}

export default SwiperComponent