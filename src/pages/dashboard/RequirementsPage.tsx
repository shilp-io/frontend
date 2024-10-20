import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardItem } from '@/types/user';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';

const RequirementsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getDashboardItem, deleteDashboardItem } = useUser();
    const [item, setItem] = useState<DashboardItem | null | undefined>(undefined);

    useEffect(() => {
        if (id) {
            const fetchedItem = getDashboardItem(id);
            setItem(fetchedItem || null);
        }
    }, [id, getDashboardItem]);

    const handleDelete = () => {
        if (id) {
            deleteDashboardItem(id);
            navigate('/dashboard');
        }
    };

    if (item === undefined) {
        return <div>Loading...</div>;
    }

    if (item === null) {
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
