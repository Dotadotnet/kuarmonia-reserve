"use client";
import { Component } from "react";
import Container from "@/components/shared/container/Container";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <Container>
          <div className="py-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
            <p className="text-gray-600">We're working on fixing this issue.</p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left bg-gray-100 p-4 rounded">
                <summary className="cursor-pointer font-semibold">Error details</summary>
                <pre className="mt-2 text-sm text-red-500">
                  {this.state.error && this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}