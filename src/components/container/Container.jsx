import React from 'react'

function Container({children,className=''}) {
  return <div className={`w-full relative h-full overflow-hidden ${className}`}>{children}</div>;
  
}

export default Container