import { useGetUserStore } from "../../store/features/authSlice";

export const PermissionWarp = ({ role = [], userRole, children }) => {
  const user = useGetUserStore();
  if (!userRole) userRole = user.role;

  return <>{role.includes(userRole) && children}</>;
};
