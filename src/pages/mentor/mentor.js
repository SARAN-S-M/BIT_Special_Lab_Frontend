import React, { useState } from 'react';
import NavigationBar from '../staff/staff_menu/Navbar';

function Mentor() {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [studentProofs, setStudentProofs] = useState([
        { rollNumber: '12345', studentName: 'John Doe', proofFile: 'proof1.pdf', status: 'Pending' },
        { rollNumber: '67890', studentName: 'Jane Smith', proofFile: 'proof2.pdf', status: 'Pending' },
        { rollNumber: '54321', studentName: 'Mark Johnson', proofFile: 'proof3.pdf', status: 'Pending' },
    ]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleApproval = (rollNumber, decision) => {
        setStudentProofs(studentProofs.map((proof) =>
            proof.rollNumber === rollNumber ? { ...proof, status: decision } : proof
        ));
    };

    const toggleDropdown = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const filteredProofs = studentProofs.filter(proof =>
        proof.rollNumber.includes(searchTerm) || proof.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-screen w-full bg-gray-100 dark:bg-gray-700 min-w-60 relative">
            <NavigationBar active="Mentor" sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            <div className="p-6">
                <div className="bg-white dark:bg-gray-800 p-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-md">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by Roll Number or Name"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-900 dark:text-white transition-all duration-300"
                        />
                    </div>

                    {filteredProofs.map((proof, index) => (
                        <div key={index} className="mb-6"> {/* Added margin here */}
                            <div
                                className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 p-4 rounded-md cursor-pointer"
                                onClick={() => toggleDropdown(index)}
                            >
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {proof.studentName} <span className="font-normal text-gray-600 dark:text-gray-400">({proof.rollNumber})</span>
                                </div>
                                <div
                                    className={`transform transition-transform duration-300 ${
                                        expandedIndex === index ? 'rotate-180' : ''
                                    }`}
                                >
                                    ▼
                                </div>
                            </div>
                            <div
                                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                                    expandedIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mt-2">
                                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                        Proof File:
                                        <a
                                            href={`https://example.com/${proof.proofFile}`} // Replace with actual URL
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline ml-1"
                                        >
                                            {proof.proofFile}
                                        </a>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-evenly gap-2">
                                        <a
                                            href={`https://example.com/${proof.proofFile}`} // Replace with actual URL
                                            download
                                            className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-blue-600 text-center"
                                        >
                                            Download
                                        </a>
                                        <button
                                            onClick={() => handleApproval(proof.rollNumber, 'Approved')}
                                            className="bg-green-500 text-white px-8 py-2 rounded-md hover:bg-green-600 text-center"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleApproval(proof.rollNumber, 'Rejected')}
                                            className="bg-red-500 text-white px-8 py-2 rounded-md hover:bg-red-600 text-center"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Mentor;
