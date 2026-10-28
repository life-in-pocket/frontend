import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import { verifyEmail } from "../api/auth";

type Status = "pending" | "loading" | "success" | "error";

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>(() =>
    searchParams.get("token") ? "loading" : "pending"
  );

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;

    window.history.replaceState({}, "", "/verify-email");

    verifyEmail(token)
      .then(() => {
        setStatus("success");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      })
      .catch(() => setStatus("error"));
  }, []);

  const message =
    status === "pending"
      ? "Check your email to confirm your account."
      : status === "loading"
        ? "Confirming your email..."
        : status === "success"
          ? "Your email is confirmed. Redirecting to login..."
          : "The link is invalid or has expired.";

  return (
    <AuthForm
      onSubmit={(event) => event.preventDefault()}
      error={status === "error" ? message : null}
      fields={
        status !== "error" ? (
          <p className="text-center text-2xl italic">{message}</p>
        ) : null
      }
      submitLabel="Go to login"
      footer={
        status === "error" || status === "pending" ? (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer underline"
          >
            Go to login
          </button>
        ) : null
      }
      isActive={false}
    />
  );
}

export default VerifyPage;