import Slider, { CustomArrowProps, Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import { Post } from '@/api/post';
import FeaturedPostCard from './FeaturedPostCard';

// ---------------------------------------------------------------------------

function CustomPrevArrow({ className, onClick }: CustomArrowProps) {
  return (
    <ArrowBackIos
      onClick={onClick}
      sx={{ '&.slick-prev': { color: 'grey.400', '&:hover': { color: 'secondary.dark' } } }}
      className={className}
    />
  );
}

function CustomNextArrow({ className, onClick }: CustomArrowProps) {
  return (
    <ArrowForwardIos
      className={className}
      onClick={onClick}
      sx={{ '&.slick-next': { color: 'grey.400', '&:hover': { color: 'secondary.dark' } } }}
    />
  );
}

// ---------------------------------------------------------------------------

interface IProps {
  posts: Post[];
}

export default function FeaturedPosts({ posts }: IProps) {
  const settings: Settings = {
    // autoplay: true,
    // autoplaySpeed: 5000,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  return (
    <Box sx={{ mb: { sm: 5, xs: 2 } }}>
      <Slider {...settings}>
        {posts.map((post) => (
          <FeaturedPostCard key={post.id} post={post} />
        ))}
      </Slider>
    </Box>
  );
}
