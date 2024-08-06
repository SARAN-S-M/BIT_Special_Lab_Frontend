import React, { useState } from 'react';
import Iframe from 'react-iframe';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';

import Select from 'react-select';

import '../../../index.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LabDetails() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const PrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div
                className={className + " slick-prev"}
                onClick={onClick}
                style={{ color: "red", left: "-30px" }} // Change color and adjust position as needed
            />
        );
    };

    // Custom component for the next arrow
    const NextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div
                className={className + " slick-next"}
                onClick={onClick}
                style={{ color: "red", right: "-30px" }} // Change color and adjust position as needed
            />
        );
    };


    const [isLoading, setIsLoading] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000
    };

    // Dummy data for special lab details
    const specialLabDetails = {
        name: "Special Lab Name",
        description: "This is a description of the special lab.",
        faculties: ["Faculty 1", "Faculty 2", "Faculty 3"],
        promoVideoUrl: "https://www.youtube.com/embed/ddTV12hErTc?si=x27iEC-yzd-poB2k",
        slides: [
            { id: 1, content: "Slide 1" },
            { id: 2, content: "Slide 2" },
            { id: 3, content: "Slide 3" }
        ]
    };

    const handleBookSlot = () => {
        //set the isopen modal to true
        setModalIsOpen(true);
    };

    const handleSelect = (e) => {
        alert(e.target.value);
    };

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoadings, setIsLoadings] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const colourOptions = [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'black', label: 'Black' },
      ];

    return (
        <div className="h-screen w-full bg-white min-w-60 dark:bg-gray-600 relative">
            { isLoading &&
                <div className='absolute z-30 w-full h-full bg-black bg-opacity-20'>
                    <Loading />
                </div>
            }

            <nav>
                <NavigationBar active="Special_Labs" />
            </nav>

            <div className='relative flex flex-col items-center justify-center bg-white dark:bg-gray-700'>
                <div className='text-3xl font-bold dark:text-gray-300'>{specialLabDetails.name}</div>
                <div className='text-lg mt-4 dark:text-gray-300'>{specialLabDetails.description}</div>
                <div className='text-lg mt-4 text-white'>
                    <span className='font-bold'>Faculties: </span>
                    {specialLabDetails.faculties.map((faculty, index) => (
                        <span key={index} className='text-white'>{index > 0 ? ', ' : ''}{faculty}</span>
                    ))}
                </div>

                <div className='mt-8 w-full h-96 flex flex-col items-center dark:text-gray-300'>
                    {/* <div className='w-full h-60 bg-gray-800 rounded-md'></div> */}
                    <div className='text-lg font-bold'>Promo Video</div>
                    <Iframe url={specialLabDetails.promoVideoUrl} className='w-full lg:w-1/2 h-full rounded-lg'/>
                </div>

                <div className='slider-container w-[80%] lg:w-1/3 h-44 mt-10 rounded-lg'>
                    <Slider {...settings}>
                        {specialLabDetails.slides.map((slide) => (
                            <div key={slide.id} className='bg-gray-800 h-40 p-4 mb-4 rounded-lg'>
                                <div className='text-lg font-bold dark:text-gray-300'>{slide.id}</div>
                                <div className='dark:text-gray-300'>{slide.content}</div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-14 mb-10' onClick={handleBookSlot}>Book Slot</button>
                
            </div>

            {/* write the code for the modal */}
            {modalIsOpen &&
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' onClick={() => setModalIsOpen(false)}>
                <div className='bg-white dark:bg-gray-700 rounded-lg border-2 border-gray-500 shadow-lg w-full max-w-md overflow-y-auto' onClick={(e) => e.stopPropagation()}>
                    <div className='flex justify-between items-center bg-blue-500 text-white px-4 py-2 rounded-t-sm'>
                        <h2 className='text-lg md:text-2xl'>Book a Slot</h2>
                        <button className='text-white' onClick={() => setModalIsOpen(false)}>X</button>
                    </div>
                    <div className='mt-4 p-4'>
                        <label htmlFor="slot" className='block mb-2 dark:text-white'>Choose a slot:</label>
                        <select id="slot" className='w-full p-2 border border-gray-500 rounded overflow-y-scroll' onChange={handleSelect}>
                            {colourOptions.map((option) => (
                                <option value={option.value} key={option.value} className='mt-10'>{option.label}</option>
                            ))}
                        </select>

                        {/* <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={colourOptions[0]}
                            isDisabled={isDisabled}
                            isLoading={isLoadings}
                            isClearable={isClearable}
                            isRtl={isRtl}
                            isSearchable={isSearchable}
                            name="color"
                            options={colourOptions}
                        /> */}
                    </div>
                    <div className='flex justify-between mt-4 p-4'>
                        <button className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded' onClick={() => alert('Slot booked!')}>Submit</button>
                        <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded' onClick={() => setModalIsOpen(false)}>Close</button>
                    </div>
                </div>
            </div>
            }

        </div>
    );
}

export default LabDetails;
