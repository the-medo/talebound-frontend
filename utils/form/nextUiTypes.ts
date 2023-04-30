import {InputProps} from "@nextui-org/react";

export type HelperType = {
  text: string,
  color?: InputProps["helperColor"],
};

export const helperOK: HelperType = {
  text: "",
  color: undefined,
}