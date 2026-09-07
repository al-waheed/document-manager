import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setCredentials } from "../store/authSlice";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const user = {
        id: payload.userId,
      };

      dispatch(
        setCredentials({
          token,
          user,
        }),
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Authentication callback failed:", error);
      navigate("/");
    }
  }, [searchParams, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Signing you in...</p>
    </div>
  );
}

export default AuthCallback;