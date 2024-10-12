import React, { useState } from 'react';
import { File, MessageSquare, Paperclip, Layers } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import styles from '@/styles/components/common/Component.module.scss';

type FileItem = {
  id: string;
  name: string;
  type: string;
  size: string;
};

type ChatItem = {
  id: string;
  title: string;
  desc: string;
  timestamp: string;
};

type SubcomponentItem = {
  id: string;
  name: string;
  description: string;
};

const files: FileItem[] = [
  { id: '1', name: 'document1.pdf', type: 'PDF', size: '2.5 MB' },
  { id: '2', name: 'image.jpg', type: 'Image', size: '1.8 MB' },
  { id: '3', name: 'data.csv', type: 'CSV', size: '500 KB' },
  { id: '4', name: 'document2.pdf', type: 'PDF', size: '3.5 MB' },
];

const requirements: ChatItem[] = [
  { id: '1', title: 'Car Reverse Camera', desc: 'Camera specs', timestamp: '2 hours ago' },
  { id: '2', title: 'Car Reverse Sensors', desc: 'Sensor Info', timestamp: '1 day ago' },
  { id: '3', title: 'Car Reverse Beeper', desc: 'Beeper settings', timestamp: '3 days ago' },
];

const subcomponents: SubcomponentItem[] = [
  { id: '1', name: 'Text Embedder', description: 'Converts text into vector embeddings' },
  { id: '2', name: 'Semantic Search', description: 'Performs similarity search on embeddings' },
  { id: '3', name: 'Response Generator', description: 'Generates responses based on context' },
  { id: '4', name: 'Text Embedder', description: 'Converts text into vector embeddings' },
  { id: '5', name: 'Semantic Search', description: 'Performs similarity search on embeddings' },
  { id: '6', name: 'Response Generator', description: 'Generates responses based on context' },
];

export const Component: React.FC = () => {
 const [activeSection, setActiveSection] = useState<'requirements' | 'subcomponents'>('requirements');

  return (
    <div className={`${styles.container} bg-background text-foreground`}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Stored Files</h2>
        <ScrollArea className={styles.scrollArea}>
          <div className={styles.fileList}>
            {files.map((file, index) => (
              <React.Fragment key={file.id}>
                <div className={styles.fileItem}>
                  <File className="h-6 w-6 mb-2" />
                  <p className={styles.fileName}>{file.name}</p>
                  <p className={`${styles.fileDetails} text-muted-foreground`}>{file.type} - {file.size}</p>
                </div>
                {index < files.length - 1 && (
                  <Separator orientation="vertical" className="h-full" />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className={styles.uploadButton}>
          <Paperclip className="mr-2 h-4 w-4" /> Upload New File
        </Button>
      </div>

      <Separator className="my-8" />

      <div>
        <div className={styles.sectionTabs}>
          <Button
            variant="ghost"
            onClick={() => setActiveSection('requirements')}
            className={`${styles.tabButton} ${activeSection === 'requirements' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Recent requirements
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="ghost"
            onClick={() => setActiveSection('subcomponents')}
            className={`${styles.tabButton} ${activeSection === 'subcomponents' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Subcomponents
          </Button>
        </div>

        <ScrollArea className={styles.contentArea}>
          {activeSection === 'requirements' && requirements.map((chat, index) => (
            <React.Fragment key={chat.id}>
              <div className={styles.listItem}>
                <h3 className={styles.listItemTitle}>{chat.title}</h3>
                <p className={`${styles.listItemDescription} text-muted-foreground`}>{chat.desc}</p>
                <p className={`${styles.listItemTimestamp} text-muted-foreground`}>{chat.timestamp}</p>
              </div>
              {index < requirements.length - 1 && <Separator />}
            </React.Fragment>
          ))}

          {activeSection === 'subcomponents' && subcomponents.map((subcomponent, index) => (
            <React.Fragment key={subcomponent.id}>
              <div className={styles.listItem}>
                <h3 className={styles.listItemTitle}>{subcomponent.name}</h3>
                <p className={`${styles.listItemDescription} text-muted-foreground`}>{subcomponent.description}</p>
              </div>
              {index < subcomponents.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </ScrollArea>

        <Button className={styles.fullWidthButton} variant="outline">
          {activeSection === 'requirements' ? (
            <>
              <MessageSquare className="mr-2 h-4 w-4" /> Start New Requirement 
            </>
          ) : (
            <>
              <Layers className="mr-2 h-4 w-4" /> Add New Subcomponent
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

