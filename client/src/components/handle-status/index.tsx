import React, { ReactElement, ReactNode } from "react";
import { SliceState } from "../../utils/types";
import Loading from "../loading";

type Props = {
  children: ReactElement;
  status: SliceState;
  data: any;
};

const HandleStatus = ({ children, status, data }: Props) => {
  if (status === SliceState.Loading) {
    return <Loading />;
  }
  if (status === SliceState.Failed) {
    return "error";
  }
  if (data && [SliceState.Inactive, SliceState.Success].includes(status)) {
    return children;
  }
  return "Error 404";
};

export default HandleStatus;
