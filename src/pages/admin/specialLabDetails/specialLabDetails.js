import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import NavigationBar from '../admin_menu/index';
import { Request } from '../../../networking/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

function SpecialLabsDetails() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
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
        promoVideoUrl: "https://www.youtube.com/embed/ddTV12hErTc?si=x27iEC-yzd-poB2k"
    });

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
                });
                console.log('Fetched special lab details.');
            } catch (error) {
                toast.error('Failed to fetch special lab details.');
            }
        }
        fetchSpecialLabDetails();
    }, []);

    const handleBookSlot = () => {
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
        <div className="h-screen w-full bg-gray-100 dark:bg-gray-700 min-w-60 relative transition-colors duration-0">
            <ToastContainer />
            <NavigationBar active="specialLabs" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
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
                <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-14 mb-10' onClick={handleBookSlot}>Book Slot</button>
                
            </div>

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

export default SpecialLabsDetails;