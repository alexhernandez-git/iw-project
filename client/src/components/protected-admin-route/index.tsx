import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { SliceState, UserRole } from "../../utils/types";
import Loading from "../loading";

type Props = {
  children: any;
};

const ProtectedAdminRoute = ({ children }: Props) => {
  const { status, value: user } = useSelector(
    (status: RootState) => status.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (status === SliceState.Failed) {
      navigate("/login", { replace: true });
    }
  }, [user, status]);

  if (status === SliceState.Success && user?.role === UserRole.User)
    return "No access";

  if (status === SliceState.Loading) return <Loading />;

  return children;
};

export default ProtectedAdminRoute;
