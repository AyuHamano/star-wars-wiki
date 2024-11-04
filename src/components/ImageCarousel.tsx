import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Grid from "antd/lib/card/Grid";

interface ImageCarouselProps {
  imgList?: string[];
  autoplay: boolean;
  infinite: boolean;
  onClick?: (url: string) => void;
}

const ImageCarousel = ({
  imgList,
  autoplay,
  infinite,
  onClick,
}: ImageCarouselProps) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (!imgList?.length) return null;

  return (
    <Grid>
      <Carousel
        responsive={responsive}
        infinite={infinite}
        autoPlay={autoplay && window.innerWidth > 768} // Autoplay apenas em telas maiores
        autoPlaySpeed={3000}
        keyBoardControl={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {imgList.map((url, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              onClick={() => (onClick ? onClick(url) : null)}
              src={url}
              alt={`Carousel ${index + 1}`}
              width={200}
              height={250}
              style={{
                cursor: "pointer",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </Carousel>
    </Grid>
  );
};

export default ImageCarousel;
