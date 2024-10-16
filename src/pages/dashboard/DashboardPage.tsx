import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const Dashboard: React.FC = () => {
    const { user } = useUser();

    return (
        <div className="space-y-6">
            <h1>Dashboard</h1>
            {/* Add your dashboard content here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user?.dashboardItems.map(item => (
                    <Link
                        key={item.id}
                        to={`/dashboard/item/${item.id}`}
                        className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
                    >
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                            Last modified: {new Date(item.lastModified).toLocaleDateString()}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;

