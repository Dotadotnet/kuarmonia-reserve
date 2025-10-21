"use client";
import { useState, useEffect } from "react";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Container from "@/components/shared/container/Container";

export default function ComponentWrapper({ 
  children, 
  loading, 
  error, 
  skeletonCount = 4,
  title = "",
  onErrorRetry 
}) {
  // If there's an error, show error state with retry option
  if (error) {
    return (
      <Container>
        <div className="py-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">{title || "Something went wrong"}</h2>
          <p className="text-gray-600 mb-4">We're having trouble loading this content.</p>
          {onErrorRetry && (
            <button 
              onClick={onErrorRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </Container>
    );
  }

  // If still loading, show skeleton
  if (loading) {
    return (
      <Container>
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
        </div>
      </Container>
    );
  }

  // Otherwise, render children
  return children;
}