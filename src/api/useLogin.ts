import { useMutation } from 'react-query';

import { LoginResponse, setlogindata, setVerifyOtpData } from '../stores/auth';
import { publicApi } from './Base';

const login = async (phoneNumber: string): Promise<LoginResponse> => {
  const { data } = await publicApi.post("/auth/sendOTP", { phoneNumber });
  return data;
};

const verifyOtp = async ({
  verificationUUID,
  otp,
}: {
  verificationUUID: string;
  otp: string;
}) => {
  const { data } = await publicApi.post("/auth/verifyOTP", {
    verificationUUID,
    code: otp,
  });
  return data;
};

export const useLogin = () => {
  const { isLoading, error, mutate, data, isError } = useMutation(login, {
    onSuccess: (data) => {
      setlogindata(data);
    },
  });

  return { isLoading, error, login: mutate, data, isError };
};

export const useVerifyOtp = () => {
  const { isLoading, error, mutate, data, isError } = useMutation(verifyOtp, {
    onSuccess: (data) => {
      setVerifyOtpData(data);
    },
  });

  return { isLoading, error, verifyOtp: mutate, data, isError };
};
