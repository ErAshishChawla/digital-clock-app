import classes from "classnames";
import { twMerge } from "tailwind-merge";

function useClasses(...className) {
  const classNames = twMerge(classes(...className));
  return classNames;
}

export default useClasses;
