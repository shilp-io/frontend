import React from 'react';
import { useUser } from '../../context/UserContext';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

const ProfilePage: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Card className="w-full max-w-md">
                    <CardHeader className="flex items-center justify-center pb-2">
                        <Skeleton className="h-24 w-24 rounded-full" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="flex items-center justify-center pb-2">
                    <div className="relative">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-24 w-24 rounded-full object-cover ring-2 ring-gray-100"
                            />
                        ) : (
                            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                                <User className="h-12 w-12 text-gray-400" />
                            </div>
                        )}
                    </div>
                    <h1 className="text-xl font-semibold mt-4 text-gray-900">{user.name}</h1>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <StatsCard
                            title="Dashboard Items"
                            value={user.dashboardItems.length}
                        />
                        <StatsCard
                            title="Member Since"
                            value={new Date().getFullYear()}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const StatsCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
);

export default ProfilePage;