import { useQuery } from 'react-query';

import { logout, setUser } from '../stores/auth';
import { privateApi } from './Base';

const fetchUser = async () => {
  try {
    const { data } = await privateApi.get("/auth/me");
    setUser(data);
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response.data.statusCode == 401) {
      logout();
    }
  }
};

const useUser = () => {
  const { isLoading, error, data, isError } = useQuery({
    queryKey: "user",
    queryFn: fetchUser,
    onSuccess: setUser,
  });

  return { isLoading, error, user: data, isError };
};

export default useUser;
