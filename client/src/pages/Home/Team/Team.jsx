import { useEffect, useState } from 'react';
import { FaTwitter, FaEnvelope } from 'react-icons/fa';

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        fetch('/team.json')
            .then(response => response.json())
            .then(data => setTeamMembers(data))
            .catch(error => console.error('Error fetching team data:', error));
    }, []);

    return (
        <div>
            <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
                <div className="container flex flex-col items-center justify-center p-4 mx-auto sm:p-10">
                    <p className="p-2 text-3xl font-medium tracking-wider text-center uppercase font-2nd text-yellow-400">Our Farming Experts</p>
                    <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">Meet the Team Behind Our Farm</h1>
                    <div className="flex flex-wrap justify-center mt-8 gap-8">
                        {teamMembers.map(member => (
                            <a
                                key={member.id}
                                href="#"
                                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-xl transition-transform transform hover:scale-105 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <img
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                                    src={member.image}
                                    alt={member.name}
                                />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {member.name}
                                    </h5>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {member.role}
                                    </p>
                                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                                        {member.description}
                                    </p>
                                    <div className="flex items-center justify-center space-x-4">
                                        <a
                                            rel="noopener noreferrer"
                                            href={`mailto:${member.email}`}
                                            title="Email"
                                            className="text-gray-600 dark:text-gray-50 hover:text-violet-600 transition-transform transform hover:scale-110"
                                        >
                                            <FaEnvelope className="w-5 h-5" />
                                        </a>
                                        <a
                                            rel="noopener noreferrer"
                                            href={member.twitter}
                                            title="Twitter"
                                            className="text-gray-600 dark:text-gray-50 hover:text-violet-600 transition-transform transform hover:scale-110"
                                        >
                                            <FaTwitter className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Team;
