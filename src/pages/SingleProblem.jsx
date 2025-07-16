import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateToken, getSingle } from "../service/api.js";

function SingleProblem() {
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [showToken, setShowToken] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoading(true);
                const data = await getSingle({ id });
                setProblem(data);
            } catch (err) {
                setError(err.message || 'Something went wrong.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProblem();
        }
    }, [id]);

    const handleGenerateToken = async () => {
        try {
            const tokenData = await generateToken({ questionId: id });
            setToken(tokenData.token || JSON.stringify(tokenData));
            setShowToken(true);
        } catch (err) {
            setError(err.message || 'Failed to generate token');
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'text-green-500';
            case 'medium':
                return 'text-yellow-500';
            case 'hard':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">
                <strong>Error:</strong> {error}
            </div>
        </div>
    );

    if (!problem) return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 px-4 py-3 rounded-md text-sm">
                No problem found.
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {problem.title}
                    </h1>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                        <span className={`font-medium ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                        </span>
                        <span className="text-gray-500">Problem ID: {id}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                        <p className="whitespace-pre-wrap leading-relaxed text-gray-700 text-sm">
                            {problem.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow space-y-4">
                            <h3 className="font-medium text-gray-900">Actions</h3>
                            <button
                                onClick={handleGenerateToken}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-md font-medium transition"
                            >
                                Generate Token
                            </button>

                            {showToken && (
                                <div className="mt-3 bg-gray-100 p-4 rounded-lg text-center">
                                    <p className="text-xs uppercase text-gray-500 font-semibold mb-1">Your Token</p>
                                    <div className="font-mono bg-gray-200 text-gray-900 py-2 px-3 rounded-md text-lg break-words">
                                        {token}
                                    </div>
                                </div>
                            )}

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-md font-medium transition">
                                Start Coding
                            </button>
                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 rounded-md font-medium transition">
                                View Editorial
                            </button>
                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-2 rounded-md font-medium transition">
                                Submissions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProblem;
