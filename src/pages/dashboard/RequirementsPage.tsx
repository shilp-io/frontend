import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';

const RequirementsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getDashboardItem, deleteDashboardItem } = useUser();
    const item = getDashboardItem(id!);

    const handleDelete = () => {
        if (id) {
            deleteDashboardItem(id);
            navigate('/dashboard');
        }
    };

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">{item.title}</h1>
            <p className="mb-4">Created: {new Date(item.created).toLocaleString()}</p>
            <p className="mb-4">Last Modified: {new Date(item.lastModified).toLocaleString()}</p>
            {/* Add your requirements content here */}
            <Button onClick={handleDelete} variant="destructive">Delete</Button>
        </div>
    );
};

export default RequirementsPage;
