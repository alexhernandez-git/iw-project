import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Type } from "../../utils/types";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: Type;
};

const ButtonLink = ({ children, to }: { children: ReactNode; to: string }) => {
  return <Link to={to}>{children}</Link>;
};

const Button = ({ children, className = "", type, href }: Props) => {
  const [currentClassName, setCurrentClassName] = useState("");

  useEffect(() => {
    const defaultClassName = `
    hidden 
    md:inline 
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
    hover:bg-gray-50
    ${className}
    `;
    switch (type) {
      case Type.Primary:
        setCurrentClassName(defaultClassName);
        break;
      case Type.Secondary:
        setCurrentClassName(`
        md:inline-flex
        hidden
        items-center 
        rounded-md 
        border 
        border-transparent 
        bg-indigo-600 
        px-3 
        py-2 
        text-sm 
        font-medium 
        leading-4 
        text-white 
        shadow-sm 
        hover:bg-indigo-700 
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
          bg-indigo-600 
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
