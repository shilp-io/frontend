import React from 'react';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard: React.FC = () => {
    const { user, addDashboardItem } = useUser();
    const navigate = useNavigate();

    const handleCreateNew = () => {
        const newItem = {
            title: 'New Requirements',
            data: {},
        };
        const newItemId = addDashboardItem(newItem);
        navigate(`/dashboard/item/${newItemId}`);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 flex-none">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            <div className="px-6 flex-1 min-h-0 relative">
                <ScrollArea className="h-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-6">
                        {user?.dashboardItems.map((item) => (
                            <Link key={item.id} to={`/dashboard/item/${item.id}`}>
                                <Card
                                    className="p-4 h-32 flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        Last modified: {new Date(item.lastModified).toLocaleDateString()}
                                    </p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            <div className="p-6 flex-none flex justify-end">
                <Button
                    className="flex items-center gap-2"
                    onClick={handleCreateNew}
                >
                    <Plus className="h-4 w-4" />
                    Create New
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
