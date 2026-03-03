'use client'
import { CSSProperties, ReactNode } from 'react'
import './FancyButtons.css'

interface BorderButton4Props {
  text: string
  onClick?: () => void
  prefixIconChildren?: ReactNode;
  sufixIconChildren?: ReactNode;
  style?: CSSProperties;
  borderColorWhite?: boolean;
}

const BorderButton = ({ text, prefixIconChildren, sufixIconChildren, onClick, style, borderColorWhite = true }: BorderButton4Props) => {
  return (
    <button
      className={` border-btn border-btn-4 d-flex gap-1 align-items-center ${borderColorWhite ? "white-border" : "black-border"}`}
      onClick={onClick}
      style={style}
    >
      {prefixIconChildren && <span>{prefixIconChildren}</span>}
      <div>{text}</div>
      {sufixIconChildren && <span>{sufixIconChildren}</span>}
    </button>
  )
}

export default BorderButton
