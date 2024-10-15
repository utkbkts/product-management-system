/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as z from "zod";
import { useState } from "react";
import { RegisterSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AuthCard from "./auth-card";
import { useAction } from "next-safe-action/hooks";
import { RegisterAccount } from "@/server/actions/register";
import { Button } from "../ui/button";
import FormError from "./form-error";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { execute } = useAction(RegisterAccount, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data.data.error);
      } else {
        setRegisterSuccess(true);
        router.push("/login");
      }
    },
    onError(error: any) {
      setError(error?.message || "Something went wrong.");
    },
    onSettled() {
      setLoading(false);
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    setError("");

    try {
      execute(values);
    } catch (error: any) {
      setError(error?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <AuthCard
        title="Register for an account"
        backButtonHref="/login"
        backButtonLabel="Already have an account ?"
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} placeholder="utkbktss" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} placeholder="Email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
              </div>
              <Button disabled={loading} type="submit" className="w-full mt-6">
                {loading ? "loading.." : "Register"}
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </>
  );
};

export default RegisterForm;
