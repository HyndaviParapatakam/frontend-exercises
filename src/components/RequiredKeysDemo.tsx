import React, { useState } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];

interface User {
  id: number;
  name?: string;
  email: string;
}
const validators: Record<keyof User, (value: any) => string> = {
  id: value => {
    if (value === undefined || value === "") return "ID is required";
    if (isNaN(value) || !/^\d+$/.test(String(value))) return "ID must be a valid number";
    if (Number(value) <= 0) return "ID must be greater than 0";
    return "";
  },
  name: () => "",
  email: value => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Email must be a valid address";
    return "";
  },
};

export const RequiredKeysDemo = () => {
  const initialUser: Partial<User> = { id: 1, name: "", email: "" };
  const [user, setUser] = useState<Partial<User>>(initialUser);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (key: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = key === "id" ? Math.max(1, Number(event.target.value)) : event.target.value;
    setUser(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: validators[key](value) }));
    setShowSuccess(false);
  };

  const handleValidate = () => {
    const newErrors: Partial<Record<keyof User, string>> = {};
    (Object.keys(validators) as (keyof User)[]).forEach(key => {
      const msg = validators[key](user[key]);
      if (msg) newErrors[key] = msg;
    });
    setErrors(newErrors);
    setSubmitted(true);
    setShowSuccess(Object.values(newErrors).every(msg => msg === ""));
  };

  const hasErrors = Object.values(errors).some(msg => msg);

  return (
    <Box mt={2} display="flex" flexDirection="column" gap={2}>
    {(Object.keys(initialUser) as (keyof User)[]).map(key => (
        <TextField
        key={key}
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        type={key === "id" ? "number" : "text"}
        value={user[key] ?? ""}
        onChange={handleChange(key)}
        inputProps={key === "id" ? { min: 1 } : {}}
        error={submitted && Boolean(errors[key])}
        helperText={submitted && errors[key] ? errors[key] : " "}
        />
    ))}

    <Button variant="contained" onClick={handleValidate} disabled={hasErrors}>
        Validate Required Keys
    </Button>

    <Typography mt={2}>
        <strong>Required Keys:</strong> <code>'id' | 'email'</code>
    </Typography>

    {submitted && showSuccess && (
        <Typography mt={2} color="success.main">
        All required keys are valid
        </Typography>
    )}
    </Box>
  );
};