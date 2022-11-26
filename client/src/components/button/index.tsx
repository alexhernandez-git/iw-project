import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { Type } from "../../utils/types";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string | null;
  type?: Type;
  disabled?: boolean;
  onClick?: (event: any) => void;
};

const ButtonLink = ({ children, to }: { children: ReactNode; to: string }) => {
  return <Link to={to}>{children}</Link>;
};

const Button = ({
  children,
  className = "",
  type = Type.Primary,
  href = null,
  disabled = false,
  onClick = () => {},
}: Props) => {
  const [currentClassName, setCurrentClassName] = useState("");

  useEffect(() => {
    const defaultClassName = `
        items-center 
        rounded-md 
        border 
        border-transparent 
        bg-esan-color 
        px-3 
        py-2 
        text-sm 
        font-medium 
        leading-4 
        text-white 
        shadow-sm 
        hover:opacity-70
    ${className}
    `;
    switch (type) {
      case Type.Primary:
        setCurrentClassName(defaultClassName);
        break;
      case Type.Secondary:
        setCurrentClassName(`
        relative 
        inline-flex 
        items-center 
        rounded-md 
        border 
        bg-white 
        text-sm 
        px-3
        py-2 
        text-sm 
        leading-4 
        border-gray-300 
        font-medium 
        text-gray-700 
        hover:bg-gray-50
        ${className}
        `);
        break;
      default:
        setCurrentClassName(defaultClassName);
        break;
    }
  }, [className, type, setCurrentClassName]);

  const component = useMemo(
    () => (
      <button
        onClick={onClick}
        style={{ opacity: disabled ? 0.7 : 1 }}
        disabled={disabled}
        type="button"
        className={currentClassName}
      >
        {children}
      </button>
    ),
    [currentClassName, children, disabled]
  );
  return component;
};

const ButtonSmall = ({ children, className = "", type, href }: Props) => {
  const [currentClassName, setCurrentClassName] = useState("");

  useEffect(() => {
    const defaultClassName = `
        inline
        md:hidden
      relative 
      inline-flex 
      items-center 
      rounded-md 
      border 
      border-gray-300 
      bg-white 
      px-4 
      py-2 
      text-sm 
      font-medium 
      text-gray-700 
      ${className}
      `;
    switch (type) {
      case Type.Primary:
        setCurrentClassName(defaultClassName);
        break;
      case Type.Secondary:
        setCurrentClassName(`
          inline
          md:hidden
          items-center 
          rounded-md 
          border 
          border-transparent 
          bg-esan-color 
          px-3 
          py-2 
          text-sm 
          font-medium 
          leading-4 
          text-white 
          shadow-sm 
          ${className}
          `);
        break;
      default:
        setCurrentClassName(defaultClassName);
        break;
    }
  }, [className, type, setCurrentClassName]);

  const component = useMemo(
    () => <button className={currentClassName}>{children}</button>,
    [currentClassName, children]
  );

  if (href) return <ButtonLink to={href}>{component}</ButtonLink>;
  return component;
};

export { ButtonSmall };
export default Button;
