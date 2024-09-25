import React, { useState, useEffect } from 'react';
import NavigationBar from '../admin_menu/index';
import { Request } from '../../../networking/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Help() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [helpMaterials, setHelpMaterials] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch existing help materials
    useEffect(() => {
        const fetchHelpMaterials = async () => {
            try {
                const response = await Request('GET', '/help/HelpMaterials', null);
                setHelpMaterials(response.data);
            } catch (error) {
                toast.error('Failed to fetch help materials.');
            } finally {
                setLoading(false);
            }
        };

        fetchHelpMaterials();
    }, []);

    // Handle adding a new help material
    const handleAddHelpMaterial = async () => {
        if (newQuestion && newAnswer) {
            try {
                setLoading(true);
                const response = await Request(
                    'POST',
                    '/help/addHelpMaterial',
                    { question: newQuestion, answer: newAnswer }
                );
                const newHelpMaterial = response.data.helpMaterial;
    
                if (newHelpMaterial && newHelpMaterial.id) { // Use 'id' here instead of '_id'
                    setHelpMaterials([...helpMaterials, newHelpMaterial]);
                    setNewQuestion('');
                    setNewAnswer('');
                    toast.success('Help material added successfully!');
                } else {
                    toast.error('Failed to add help material: Invalid response from server.');
                }
            } catch (error) {
                toast.error('Failed to add help material.');
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Please fill in both question and answer.');
        }
    };
    

    // Handle deleting a help material
    const handleDeleteHelpMaterial = async (id) => {
        try {
            setLoading(true);
            await Request(
                'DELETE',
                '/help/removeHelpMaterial',
                { id: id },
                null
            )
            setHelpMaterials(helpMaterials.filter((material) => material._id !== id));
            toast.success('Help material deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete help material.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-700 relative transition-colors duration-0">
            <ToastContainer />
            <NavigationBar active="helpMaterials" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

            <div className="p-6 max-w-7xl mx-auto">
                {/* Add New Help Material */}
                <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Add New Help Material</h3>
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white mb-4"
                        placeholder="Enter Question"
                    />
                    <input
                        type="text"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white mb-4"
                        placeholder="Enter Answer"
                    />
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleAddHelpMaterial}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                        >
                            Add Help Material
                        </button>
                    </div>
                </div>

                {/* List Existing Help Materials */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Help Materials</h2>
                {loading && <p className="text-gray-700 dark:text-gray-300">Loading...</p>}
                <div>
                    {helpMaterials.map((material) => (
                        <div
                            key={material._id}
                            className="bg-white dark:bg-gray-800 p-4 mb-2 rounded-md shadow-md flex justify-between items-start md:items-center"
                        >
                            <div className="flex-1 mr-4">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{material.question}</p>
                                <p className="text-gray-700 dark:text-gray-300">{material.answer}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteHelpMaterial(material._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Help;
