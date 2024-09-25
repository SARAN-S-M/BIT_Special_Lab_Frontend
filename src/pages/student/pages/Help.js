import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import NavigationBar from '../../menu/index';
import Loading from '../../loading/Loadingscreen';
import { Request } from '../../../networking/index';
import { toast } from 'react-toastify';

const faqs = [
    {
        question: "How do I reset my password?",
        answer: "To reset your password, go to the settings page and click on 'Change Password'. Follow the instructions provided."
    },
    {
        question: "Where can I find my lab results?",
        answer: "Your lab results can be found in the 'Lab Results' section of your dashboard. You can access it by clicking on the 'Lab Results' tab in the sidebar."
    },
    {
        question: "How do I book a special slot?",
        answer: "To book a special slot, navigate to the 'Special Slot Booking' page and choose your preferred date and time from the available options."
    },
    {
        question: "How can I contact support?",
        answer: "You can contact support by clicking on the 'Help' tab and filling out the contact form. Our support team will get back to you as soon as possible."
    }
];

function Help() {
    const [isLoading, setIsLoading] = useState(false);
    const [openQuestionIndex, setOpenQuestionIndex] = useState(null);
    const [helpMaterials, setHelpMaterials] = useState([]);

    const toggleQuestion = (index) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };
    
    useEffect(() => {
        const fetchHelpMaterials = async () => {
            try {
                const response = await Request('GET', '/help/HelpMaterials', null);
                setHelpMaterials(response.data);
                console.log(response.data);
            } catch (error) {
                toast.error('Failed to fetch help materials.');
            } finally {
                // setLoading(false);
            }
        };

        fetchHelpMaterials();
    }, []);

    return (
        <div className="h-screen bg-white dark:bg-gray-900 min-w-60 relative">
            {isLoading &&
                <div className='absolute z-30 w-full h-full bg-black bg-opacity-20'>
                    <Loading />
                </div>
            }

            <nav>
                <NavigationBar active="Help" />
            </nav>

            <div className="p-6">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Help & FAQ</h1>
                <div className="space-y-4">
                    {helpMaterials.map((material, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <button 
                                onClick={() => toggleQuestion(index)} 
                                className="w-full text-left text-lg font-semibold text-black dark:text-white focus:outline-none flex justify-between items-center"
                            >
                                {material.question}
                                <FaPlus 
                                    className={`transform transition-transform duration-300 ${openQuestionIndex === index ? 'rotate-45 text-blue-500' : 'rotate-0 text-black dark:text-white'}`} 
                                />
                            </button>
                            <div className={`mt-2 text-gray-700 dark:text-gray-300 transition-max-height duration-300 overflow-hidden ${openQuestionIndex === index ? 'max-h-40' : 'max-h-0'}`}>
                                {material.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Help;
