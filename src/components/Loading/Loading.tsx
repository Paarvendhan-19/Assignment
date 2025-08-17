import React from 'react';
import { LoadingProps } from './Loading.types';

const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  variant = 'spinner', 
  text,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const renderSpinner = () => (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
      role="progressbar"
      aria-label="Loading"
    />
  );

  const renderDots = () => (
    <div className="flex space-x-1" role="progressbar" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-blue-600 rounded-full animate-pulse ${sizeClasses[size]}`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );

  const renderSkeleton = () => (
    <div className="space-y-2" role="progressbar" aria-label="Loading">
      <div className={`bg-gray-200 rounded animate-pulse ${sizeClasses[size]}`} />
      <div className="bg-gray-200 rounded h-2 w-20 animate-pulse" />
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {renderContent()}
      {text && (
        <p className="text-sm text-gray-600 text-center">{text}</p>
      )}
    </div>
  );
};

export default Loading; 