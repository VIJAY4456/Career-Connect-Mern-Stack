import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
 
// let slideIndex = 0;
// showSlides(0);

// function showSlides() {
//   let slides = document.querySelectorAll('.slide');
//   slides.forEach((slide, index) => {
//     slide.style.display = 'none';
//   });

//   slideIndex++;
//   if (slideIndex > slides.length) { slideIndex = 1; }
  
//   slides[slideIndex - 1].style.display = 'block';
//   setTimeout(showSlides, 2000); // Change image every 3 seconds
// }

  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h2>Discover Your Ideal Career with Career-Connect</h2>
            {/* <h3>
              Discover opportunities that match your passion and expertise.
            </h3> */}
            <p>
              Find jobs that fit your skills or discover the perfect candidate.
              Career-Connect takes your career or hiring process to the next
              level.
            </p>
          </div>
          <div className="image">
            
            <img
              src="https://wallpaperaccess.com/full/1691869.jpg"
              alt="hero"
            />
          </div>
          {/* <div className="image-slider">
            <div className="slide">
              <img
                src="https://wallpaperaccess.com/full/1691869.jpg"
                alt="hero 1"
              />
            </div>
            <div className="slide">
              <img
                src="http://www.thenorthlines.com/wp-content/uploads/2016/07/Job-1280x720.jpg"
                alt="hero 2"
              />
            </div>
            <div className="slide">
              <img src="/heroS.jpg" alt="hero 3" />
            </div>
          </div> */}
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
