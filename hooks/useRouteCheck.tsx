"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useRouteCheck(routesName: string[]) {
  const pathname = usePathname();
  const [isRoute, setIsRoute] = useState(false);

  useEffect(() => {
    setIsRoute(routesName.includes(pathname.split("/")[1]));
  }, [pathname, routesName]);

  return isRoute;
}

export default useRouteCheck;
