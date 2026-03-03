import React, { CSSProperties, ReactNode } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import "./ReusableButton.css";

export interface ButtonProps {
  text: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDoubleClick?: (() => void) | undefined;
  isDisabled?: boolean;
  isLoading?: boolean;
  variant?: string;
  prefixIconChildren?: ReactNode;
  sufixIconChildren?: ReactNode;
  style?: CSSProperties;
  tabIndex?: number;
}

const ReusableButton = ({
  text,
  type,
  onClick,
  onDoubleClick,
  className = "",
  isDisabled,
  isLoading,
  variant,
  prefixIconChildren,
  sufixIconChildren,
  style,
  tabIndex,
}: ButtonProps) => (
  <div data-testid={text}>
    <Button
      type={type}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      id={text}
      className={className}
      variant={variant}
      style={style}
      tabIndex={tabIndex}
    >
      <div className="fs-14 fw-medium d-flex align-items-center justify-content-center gap-2">
        {prefixIconChildren && <span>{prefixIconChildren}</span>}
        {isLoading ? (
          <span>
            <Spinner size="sm" /> <span className="ms-2">{text}</span>
          </span>
        ) : (
          text
        )}
        {sufixIconChildren && <span>{sufixIconChildren}</span>}
      </div>
    </Button>
  </div>
);

export default ReusableButton;
