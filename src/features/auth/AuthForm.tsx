import type { FormEvent, ReactNode } from "react";
import loginImg from "../../assets/images/loginImg.jpg";

export const AuthInputClass =
  "mb-4 bg-white p-4 text-dark text-[1rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--second-accent-color)";

interface AuthFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error?: string | null;
  fields: ReactNode;
  submitLabel: string;
  footer: ReactNode;
  isSubmitting?: boolean;
}

function AuthForm({ onSubmit, error, fields, submitLabel, footer }: AuthFormProps) {
  return (
    <div className="flex h-screen">
      <img className="w-[65%] object-cover" src={loginImg} alt="Logo" />
      <main className="flex w-[35%] flex-col pl-20">
        <h1 className="mt-30 mb-20 text-[3.5rem] font-bold">Hello in Pocket</h1>

        {error && (
          <p role="alert" className="mb-8 text-center text-xl text-[rgb(220,71,71)]">
            {error}
          </p>
        )}

        <form className="flex w-full max-w-100 flex-col" onSubmit={onSubmit}>
          {fields}
          <button
            type="submit"
            className="mt-15 cursor-pointer bg-second-accent p-4 text-xl hover:bg-(--second-accent-color-hover) disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </form>

        <div className="mt-8 text-center text-lg">{footer}</div>
      </main>
    </div>
  );
}

export default AuthForm;