import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import type { AxiosResponse } from "axios";

export const useAxiosAuth = () => {
  const nav = useNavigate();
  useEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (r: AxiosResponse) => r,
      (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          nav("/login", { replace: true });
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(resInterceptor);
  }, [nav]);
};
