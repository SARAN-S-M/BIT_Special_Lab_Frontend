import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';
import { Request } from '../../../networking/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

import Select from 'react-select';

import '../../../index.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialLab from '../../staff/SpecialLab';

function LabDetails() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [specialLabDetails, setSpecialLabDetails] = useState({
        SpecialLabName: "Special Lab Name",
        SpecialLabCode: "SL01",
        SpecialLabDescription: "This is a description of the special lab.",
        faculties: [
            {
                facultyName: 'Faculty 1',
                facultyEmail: 'faculty1@bitsathy.ac.in'
            },
            {
                facultyName: 'Faculty 2',
                facultyEmail: 'faculty2@bitsathy.ac.in'
            },
            {
                facultyName: 'Faculty 3',
                facultyEmail: 'faculty3@bitsathy.ac.in'
            }
        ],
        promoVideoUrl: "https://www.youtube.com/embed/ddTV12hErTc?si=x27iEC-yzd-poB2k",
    });
    const [availableSlots, setAvailableSlots] = useState([
        {
            id: 1,
            date: '2024-10-05',
            fromTime: '09:00 AM',
            toTime: '11:00 AM',
            totalStudents: 25,
        },
        {
            id: 2,
            date: '2024-10-06',
            fromTime: '10:00 AM',
            toTime: '12:00 PM',
            totalStudents: 30,
        },
    ]);

    // get the id in the url and store it in a usestate
    const { id } = useParams();

    useEffect(() => {
        const fetchSpecialLabDetails = async () => {
            console.log('Fetching special lab details...');
            try {
                const response = await Request(
                    'GET',
                    `/speciallabs/getLabDetailsById/${id}`,
                    null
                );
                const fetchedDetails = response.data.labDetails;
                console.log(fetchedDetails);
                setSpecialLabDetails({
                    SpecialLabName: fetchedDetails.SpecialLabName,
                    SpecialLabCode: fetchedDetails.SpecialLabCode,
                    SpecialLabDescription: fetchedDetails.SpecialLabDescription,
                    faculties: fetchedDetails.faculties.map(faculty => ({
                        facultyName: faculty.facultyName,
                        facultyEmail: faculty.facultyEmail
                    })),
                    promoVideoUrl: fetchedDetails.promoVideoUrl,
                //     // slides: fetchedDetails.slides.map(slide => ({
                //     //     id: slide.id,
                //     //     content: slide.content
                //     // }))
                });
                console.log('Fetched special lab details.');
            } catch (error) {
                toast.error('Failed to fetch special lab details.');
            }
        }
        fetchSpecialLabDetails();
    }, []);

    const handleAvailableSlot = async () => {
        try {
            const response = await Request(
                'GET',
                `/speciallabs/getSlotById/${id}`,
                null
            );
            // console.log(response.data);
            // console.log("_-_-_-_-_-_-_-")
            // console.log(response.data.hashedId);
            const slots = response.data.slots.map(slot => ({
                id: slot.hashedId,
                date: new Date(slot.date).toLocaleDateString(),
                fromTime: new Date(slot.fromTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                toTime: new Date(slot.toTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                totalStudents: slot.totalStudents,
            }));
            setAvailableSlots(slots);
            setModalIsOpen(true);
            // console.log(response);
            // console.log(response.data.slots);
        } catch (error) {
            toast.error('Failed to fetch available slots.');
            console.error(error);
        }
    };

    const handleBookSlot = async (slotId) => {
        console.log(slotId);
        try {
            const response = await Request(
                'POST',
                `/speciallabs/bookSlot/${id}`,
                {
                    hashedIdSlotId: slotId
                }
            );
            console.log(response);
            toast.success('Slot booked successfully.');
            // setModalIsOpen(false);
        } catch (error) {
            toast.error('Failed to book slot.');
            console.error(error);
        }
    };

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

            <div className='h-screen relative flex flex-col items-center justify-center bg-white dark:bg-gray-700'>
                <div className='text-3xl font-bold dark:text-gray-300'>{specialLabDetails.SpecialLabName} - {specialLabDetails.SpecialLabCode}</div>
                <div className='text-lg mt-4 dark:text-gray-300'>{specialLabDetails.SpecialLabDescription}</div>
                <div className='text-lg mt-4 text-white'>
                    <span className='font-bold text-black dark:text-gray-300 '>Faculties: </span>
                    {specialLabDetails.faculties.map((faculty, index) => (
                        <span key={index} className='text-black dark:text-gray-300' title={faculty.facultyEmail}>{index > 0 ? ', ' : ''}{faculty.facultyName}</span>
                    ))}
                </div>

                <div className='mt-8 w-full h-96 flex flex-col items-center dark:text-gray-300'>
                    <div className='text-lg font-bold'>Promo Video</div>
                    <Iframe url={specialLabDetails.promoVideoUrl} className='w-full lg:w-1/2 h-full rounded-lg'/>
                </div>

                <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-14 mb-10' onClick={handleAvailableSlot}>Book Slot</button>
                
            </div>

            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 w-11/12 md:w-2/3 h-4/5 p-6 rounded-lg shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Available Slots</h2>
                        <div className="space-y-4 overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
                            {availableSlots.map((slot) => (
                                <div key={slot.id} className="bg-gray-200 dark:bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-900 dark:text-white">Date: {slot.date}</p>
                                        <p className="text-gray-900 dark:text-white">Time: {slot.fromTime} - {slot.toTime}</p>
                                        <p className="text-gray-900 dark:text-white">Total Students: {slot.totalStudents}</p>
                                    </div>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        onClick={() => handleBookSlot(slot.id)}
                                    >
                                        Book
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                onClick={() => setModalIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default LabDetails;
