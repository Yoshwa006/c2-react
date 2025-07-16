import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar.jsx';
import get from '../service/api.js';
import SingleProblem from "./SingleProblem.jsx";

function Home() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await get();
                console.log(data);
                setQuestions(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const problems = questions;

    const getDifficultyBg = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-600 bg-green-50 border border-green-200';
            case 'Medium': return 'text-orange-600 bg-orange-50 border border-orange-200';
            case 'Hard': return 'text-red-600 bg-red-50 border border-red-200';
            default: return 'text-gray-600 bg-gray-50 border border-gray-200';
        }
    };

    const handleProblemClick = (problemId) => {
        navigate(`/${problemId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white text-gray-900 pt-16">
                <NavBar />
                <div className="flex items-center justify-center py-10">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading problems...</p>
                    </div>
                </div>
            </div>
        );
    }


    //eeroor
    if (error) {
        return (
            <div className="min-h-screen bg-white text-gray-900 pt-16">
                <NavBar />
                <div className="flex items-center justify-center py-10">
                    <div className="text-center">
                        <div className="text-red-600 text-lg mb-2">Error loading problems</div>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-16 mt-7">
            <NavBar />

            {/* Main Content Container */}
            <main className="">


                {/* Problem List */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                            <div className="col-span-1">#</div>
                            <div className="col-span-7">Title</div>
                            <div className="col-span-4">Difficulty</div>
                        </div>
                    </div>

                    {/* Problem List */}
                    <div className="divide-y divide-gray-200">
                        {problems.map((problem, index) => (
                            <div
                                key={problem.id}
                                className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => handleProblemClick(problem.id)}
                            >
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-1">
                                        <span className="text-gray-500 text-sm">{index + 1}</span>
                                    </div>
                                    <div className="col-span-7">
                                        <div className="flex flex-col">
                                            <span className="text-black hover:text-blue-800 font-medium mb-1 transition-colors">
                                                {problem.title}
                                            </span>
                                            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                                                {problem.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyBg(problem.difficulty)}`}>
                                            {problem.difficulty}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;