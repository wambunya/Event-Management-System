// src/components/EventList.jsx
import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch('/eventHandling.html.txt');
        const content = await response.text();
        setHtmlContent(content);
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    fetchHtml();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
  );
};

export default EventList;