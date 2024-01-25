import React from 'react'

const FlexBox = ({ className = '', alignItems, justify, flexDir, grow, children, style}) => {

    const styleObj = {
        display: 'flex',
        alignItems: alignItems ?? 'center',
        justifyContent: justify ?? 'center',
        flexDirection: flexDir ?? 'row',
        flexGrow: grow ?? 0,
        ...style
    }

  return (
    <div className={className} style={styleObj}>
        {children}
    </div>
  )
}

export default FlexBox