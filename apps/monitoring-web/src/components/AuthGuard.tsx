import { Backdrop, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

type Me = { id: string; role: string; name?: string } | null;

async function fetchMe(): Promise<Me> {
  try {
    const { data } = await api.get("/me");
    return data?.id ? data : null;
  } catch {
    return null;
  }
}

export default function AuthGuard({ children }: PropsWithChildren) {
  const nav = useNavigate();
  const { data: me, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    staleTime: 60_000,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !me) {
      nav("/login", { replace: true });
    }
  }, [isLoading, me, nav]);

  if (isLoading) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }

  if (!me) return null;

  return <>{children}</>;
}
