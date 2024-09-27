import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    style={},
    
    ...props
}) {
    return (
        <button className={`px-4 py-2 relative  rounded-lg ${bgColor} ${textColor} ${className}`} style={{...style}} {...props}>
            {children}
        </button>
    );
}