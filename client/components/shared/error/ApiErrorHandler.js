/**
 * Utility functions for handling API errors gracefully
 */

/**
 * Fetch data with error handling
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data or empty object on error
 */
export async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    // Return a safe default structure
    return { data: [], total: 0, error: error.message };
  }
}

/**
 * Wrapper component for handling API data with loading and error states
 */
export function withApiHandling(WrappedComponent) {
  return function ApiHandlingWrapper(props) {
    const { loading, error, data, ...otherProps } = props;
    
    if (error) {
      console.warn("Component rendered with API error:", error);
      // Still render the component, but with empty data
      return <WrappedComponent {...otherProps} data={[]} />;
    }
    
    if (loading) {
      // Component should handle its own loading state
      return <WrappedComponent {...otherProps} data={[]} loading={true} />;
    }
    
    return <WrappedComponent {...otherProps} data={data || []} />;
  };
}