# Error Handling Pattern

This document explains the error handling pattern implemented in this application to ensure graceful degradation when APIs fail.

## Principles

1. **Never let API failures crash the entire page**
2. **Always show fallback UI (skeleton loaders, empty states, or error messages)**
3. **Log errors for debugging but don't expose sensitive information to users**
4. **Provide retry mechanisms when appropriate**

## Components

### 1. ErrorBoundary
A React error boundary that catches JavaScript errors in component trees and displays a fallback UI.

Usage:
```jsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### 2. ComponentWrapper
A wrapper component that handles loading and error states with consistent UI.

Usage:
```jsx
<ComponentWrapper 
  loading={loading} 
  error={error} 
  title="Section Title"
  onErrorRetry={handleRetry}
>
  <MyComponentContent />
</ComponentWrapper>
```

### 3. ApiErrorHandler
Utility functions for handling API calls with proper error handling.

Usage:
```javascript
import { fetchWithErrorHandling } from '@/components/shared/error/ApiErrorHandler';

const data = await fetchWithErrorHandling('/api/news');
```

## Implementation Pattern

### Server Components
```javascript
export default async function MyComponent({ params }) {
  let data = [];
  
  try {
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const res = await response.json();
      data = res.data || [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // Continue with empty data array
  }
  
  return <MyClientComponent data={data} />;
}
```

### Client Components
```javascript
"use client";
import { useState, useEffect } from "react";
import ComponentWrapper from "@/components/shared/error/ComponentWrapper";

export default function MyClientComponent({ initialData = [] }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialData.length) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/data');
      
      if (res.ok) {
        const result = await res.json();
        setData(result.data || []);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentWrapper 
      loading={loading} 
      error={error} 
      onErrorRetry={fetchData}
    >
      {/* Component content */}
    </ComponentWrapper>
  );
}
```

## Best Practices

1. **Always provide initial data** from server components when possible
2. **Use skeleton loaders** for loading states
3. **Show meaningful error messages** to users
4. **Log detailed errors** to console for developers
5. **Implement retry mechanisms** for transient failures
6. **Test error scenarios** to ensure graceful degradation
7. **Use environment variables** to show detailed errors in development only

## File Structure
```
components/
  shared/
    error/
      ErrorBoundary.js        # React error boundary
      ComponentWrapper.js     # Loading/error state wrapper
      ApiErrorHandler.js      # API utility functions
      README.md               # This documentation
```