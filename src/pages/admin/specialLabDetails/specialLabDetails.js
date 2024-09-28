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

    return (
        <div className="h-screen w-full bg-gray-100 dark:bg-gray-700 min-w-60 relative transition-colors duration-0">
            <ToastContainer />
            <NavigationBar active="specialLabs" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <div className='mt-16 relative flex flex-col items-center justify-center bg-white dark:bg-gray-700'>
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
                
            </div>
        </div>
    );
}

export default SpecialLabsDetails;