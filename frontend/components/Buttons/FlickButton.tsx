'use client'
import { ReactNode } from 'react'
import './FancyButtons.css'

interface FlickButtonProps {
  text: string
  inverted?: boolean
  onClick?: () => void
  prefixIconChildren?: ReactNode
  sufixIconChildren?: ReactNode
}

const FlickButton = ({
  text,
  inverted,
  onClick,
  prefixIconChildren,
  sufixIconChildren,
}: FlickButtonProps) => {
  return (
    <button
      className={`fancy-button flick-button ${inverted ? 'button--inverted' : ''}`}
      onClick={onClick}
    >
      {prefixIconChildren && <span>{prefixIconChildren}</span>}
      <span>{text}</span>
      {sufixIconChildren && <span>{sufixIconChildren}</span>}
    </button>
  )
}

export default FlickButton