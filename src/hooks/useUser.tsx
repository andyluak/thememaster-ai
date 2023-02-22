import { useSession } from "next-auth/react";
const useUser = () => {
  const { data } = useSession();
  const { user } = data || {};
  return {user};
}

export default useUser