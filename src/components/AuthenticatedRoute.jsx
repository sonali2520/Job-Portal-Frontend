import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const AuthenticatedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user && !hasShownToast.current) {
      toast.error("Please login first");
      hasShownToast.current = true;
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
