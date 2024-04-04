import React from 'react'
import '../assets/css/Home.css'
import Carousel from 'react-bootstrap/Carousel';
import banner_one from "../assets/images/banner_one.jpg";
import banner_two from "../assets/images/banner_two.jpg";
const Home = () => {
  return (
    <div className="home-wrapper">
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <div className='carousel_image'>
            <img className="img" src={banner_one} alt="First slide" />
          </div>
          <Carousel.Caption>
            <h5>Embrace colors that effortlessly blend into the natural landscape.</h5>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel_image">
            <img className="img" src={banner_two} alt="First slide" />
          </div>
          <Carousel.Caption>
            <h5>Embrace colors that effortlessly blend into the natural landscape.</h5>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Home