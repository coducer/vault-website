'use client'
import { ReactNode } from 'react'
import './FancyButtons.css'

interface IsiButtonProps {
  text: string
  onClick?: () => void
  prefixIconChildren?: ReactNode;
  sufixIconChildren?: ReactNode;
}

const AnimatedFillButton = ({ text, prefixIconChildren, sufixIconChildren, onClick }: IsiButtonProps) => {
  return (
    <button className="fancy-button animated-button" onClick={onClick}>
      {prefixIconChildren && <span className="button__icon">{prefixIconChildren}</span>}
      <span>{text}</span>
      {sufixIconChildren && <span className="button__icon">{sufixIconChildren}</span>}
    </button>
  )
}

export default AnimatedFillButton