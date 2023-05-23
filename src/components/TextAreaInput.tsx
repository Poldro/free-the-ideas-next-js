import React, { useState, useEffect, useRef } from "react";

type TextAreaInputProps = {
  placeholder?: string;
  value?: string;
  onSelect?: (e: React.SyntheticEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  placeholder = "",
  value,
  onSelect = () => {},
  onChange,
  className = "",
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = textareaRef.current;
    if (textArea) {
      textArea.style.height = "auto"; // Temporarily shrink textarea to fit its content
      textArea.style.height = `${textArea.scrollHeight}px`; // Set height to scrollHeight to cover all content
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      style={{ minHeight:100, maxHeight: 400 }}
      onChange={onChange}
      onSelect={onSelect}
      value={value}
      placeholder={placeholder}
      className={`bg-dark text-gray-300 placeholder-gray-400 max-h-full block w-full resize-none rounded-md border-0 p-2 scrollbar-hide focus:outline-0 focus:ring-2 focus:ring-primary text-sm ${className}`}
    ></textarea>
  );
};

export default TextAreaInput;
