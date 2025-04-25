"use client";

import React, { createContext, useContext, useState } from 'react';

interface PreviewContextType {
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
  previewData: any;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewData, setPreviewData] = useState({
    components: [],
    layouts: [],
    styles: [],
  });

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <PreviewContext.Provider value={{ isPreviewMode, togglePreviewMode, previewData }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
}