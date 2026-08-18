import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";


export default function LoginForm({ onSwitchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const {register, handleSubmit,reset, 
    formState: {errors, isValid, isSubmitting} } = useForm({
      resolver: yupResolver(loginSchema),
      mode: "onTouched"
    });

  function onSubmit(data) {
    // No backend — simulate successful submit:
    console.log("LOGIN SUBMIT:", data);
    setSuccess("✅ Login UI submitted successfully (check console for data).");
  }

  function handleReset() {
    reset();
    setShowPassword(false);
    setSuccess("");
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {success && <div className="success">{success}</div>}

      <div className="field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
      </div>

      <div className="field">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("password")}
          autoComplete="current-password"
        />
        <div className="helpRow">
          <label className="row small" style={{ cursor: "pointer" }}>
            <input
              className="checkbox"
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show password
          </label>
          <span className="small">Min 6 characters</span>
        </div>
        {errors.password && <div className="error">{errors.password.message}</div>}
      </div>

      <div className="actions">
        <button className="primary" type="submit" disabled={!isValid || isSubmitting}>
          Login
        </button>
        <button className="ghost" type="button" onClick={handleReset}>
          Reset
        </button>
        <p className="small" style={{ margin: 0 }}>
          Don’t have an account?{" "}
          <button className="ghost" type="button" onClick={onSwitchToRegister}>
            Create one
          </button>
        </p>
      </div>
    </form>
  );
}
