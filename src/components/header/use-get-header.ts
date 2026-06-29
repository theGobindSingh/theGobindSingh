import { useCallback } from "react";

const useGetHeader = () => {
  const getHeader = useCallback(() => {
    const header = document.getElementById(
      "app-header",
    ) as HTMLDivElement | null;
    if (!header) return null;
    return header;
  }, []);
  return { getHeader };
};

export default useGetHeader;
