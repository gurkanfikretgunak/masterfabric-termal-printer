'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SendText from './SendText';
import SendImage from './SendImage';
import TemplateList from './TemplateList';

interface PrinterTabsProps {
  onTabChange?: (tab: string) => void;
}

export default function PrinterTabs({ 
  onTabChange, 
}: PrinterTabsProps) {
  const [activeTab, setActiveTab] = useState('text');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange}
      className="w-full overflow-x-hidden flex-1 min-h-0 flex flex-col h-full"
    >
      <TabsList className="grid w-full grid-cols-3 overflow-hidden flex-shrink-0 mb-4 h-10">
        <TabsTrigger value="text" className="truncate text-xs sm:text-sm">Text</TabsTrigger>
        <TabsTrigger value="image" className="truncate text-xs sm:text-sm">Image</TabsTrigger>
        <TabsTrigger value="templates" className="truncate text-xs sm:text-sm">Templates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="text" className="overflow-x-hidden flex-1 min-h-0 overflow-y-auto mt-0">
        <SendText />
      </TabsContent>
      
      <TabsContent value="image" className="overflow-x-hidden flex-1 min-h-0 overflow-y-auto mt-0">
        <SendImage />
      </TabsContent>
      
      <TabsContent value="templates" className="overflow-x-hidden flex-1 min-h-0 overflow-y-auto mt-0 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <TemplateList />
      </TabsContent>
    </Tabs>
  );
}

