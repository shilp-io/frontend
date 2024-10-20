import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardItem } from '@/types/user';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SetupDialog from '@/components/common/dialogs/SetupDialog';
import SettingsDialog from '@/components/common/dialogs/SettingsDialog';
import { File, Plus, Send } from 'lucide-react';

const RequirementsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getDashboardItem, deleteDashboardItem, updateDashboardItem } = useUser();
    const [item, setItem] = useState<DashboardItem | null | undefined>(undefined);
    const [showSetupDialog, setShowSetupDialog] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (id) {
            const fetchedItem = getDashboardItem(id);
            setItem(fetchedItem || null);

            if (fetchedItem?.title === 'New Requirements') {
                setShowSetupDialog(true);
            }
        }
    }, [id, getDashboardItem]);

    const handleDelete = () => {
        if (id) {
            deleteDashboardItem(id);
            navigate('/dashboard');
        }
    };

    const handleSubmit = (formData: { title: string; objective: string; documents: File[] }) => {
        if (id) {
            updateDashboardItem(id, {
                title: formData.title,
                data: {
                    ...item?.data,
                    objective: formData.objective,
                    documents: formData.documents.map(file => ({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        lastModified: file.lastModified,
                    })),
                },
            });
            setShowSetupDialog(false);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log('Files to upload:', files);
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            console.log('Sending message:', message);
            setMessage('');
        }
    };

    if (item === undefined) {
        return <div>Loading...</div>;
    }

    if (item === null) {
        return <div>Item not found</div>;
    }

    return (
        <>
            <SetupDialog
                open={showSetupDialog}
                onOpenChange={setShowSetupDialog}
                onSubmit={handleSubmit}
                initialData={{
                    title: item.title,
                    objective: item.data?.objective || '',
                }}
            />

            <div className="flex flex-col h-full">
                <div className="flex-none p-6 bg-background">
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl font-semibold">{item.title}</h1>
                        <SettingsDialog
                            title={item.title}
                            objective={item.data?.objective || ''}
                            onEdit={() => setShowSetupDialog(true)}
                            onDelete={handleDelete}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        {item.data?.objective || 'No objective set'}
                    </p>

                    <div className="mb-4">
                        <h2 className="text-sm font-medium mb-2">Files</h2>
                        <div className="flex flex-wrap gap-4">
                            {item.data?.documents?.map((doc: any, index: number) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                    <File className="h-4 w-4" />
                                    <div>
                                        <p className="font-medium">{doc.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {(doc.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-grow overflow-auto p-6">
                    {/* Chat messages will go here */}
                </div>

                <div className="flex-none p-4 border-t bg-background">
                    <div className="flex items-center space-x-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileUpload}
                            multiple
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Plus className="h-5 w-5" />
                        </Button>
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <Button onClick={handleSendMessage}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequirementsPage;