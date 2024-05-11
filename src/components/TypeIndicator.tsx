import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 bg-primary-100 rounded-lg p-3 w-fit">
      <Dot opacity="1"/>
      <Dot opacity="0.7" animationDelay="0.1s" />
      <Dot opacity="0.5" animationDelay="0.2s" />
    </div>
  );
};

const Dot: React.FC<{ animationDelay?: string, opacity: string }> = ({ animationDelay = "0s" , opacity = 1}) => {
  return (
    <div
      className="w-2 h-2 bg-primary-300 rounded-full animate-bounce"
      style={{ animationDelay, opacity }}
    ></div>
  );
};

export default TypingIndicator;
