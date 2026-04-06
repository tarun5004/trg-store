import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeDollarSign, Eye, EyeOff, Lock, Mail, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Heading } from "@/components/ui/Headings";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { PasswordStrength } from "@/components/ui/password-strength";
import { useAuth } from "@/providers/AuthProvider";
import SignInSchema from "@/schema/auth/sign-in";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "TRG Store - Sign In";
    }, []);

    const signInForm = useForm({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { setFocus } = signInForm;

    useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    const onSubmit = async (data) => {
        setLoading(true);
        setTimeout(async () => {
            if (await signIn(data)) {
                navigate("/");
            }
            signInForm.reset();
            setFocus("email");
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex w-full flex-col gap-6">
            <BadgeDollarSign
                size={64}
                className="rounded-2xl bg-primary p-4 text-primary-foreground shadow-[0_20px_40px_-26px_rgba(86,39,29,0.95)]"
            />
            <div className="flex flex-col gap-2">
                <Heading size="small" className="text-primary/70">
                    Welcome back
                </Heading>
                <Heading size="h4">
                    Sign in to <b>TRG Store</b>
                </Heading>
                <Heading size="p" className="leading-7">
                    Access your account, saved wishlist, and cart in the new premium storefront experience.
                </Heading>
            </div>
            <form
                onSubmit={signInForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FieldGroup>
                    <Controller
                        name="email"
                        control={signInForm.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <InputGroup className="bg-background/75">
                                    <InputGroupAddon>
                                        <Mail />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="email"
                                        type="email"
                                        placeholder="tarun@example.com"
                                        {...field}
                                    />
                                </InputGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="password"
                        control={signInForm.control}
                        render={({ field, fieldState }) => (
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Link
                                        to="/auth/reset-password"
                                        className="font-medium text-muted-foreground underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
                                    >
                                        Reset Password?
                                    </Link>
                                </div>
                                <InputGroup className="bg-background/75">
                                    <InputGroupInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                    <InputGroupAddon>
                                        {!showPassword ? <Lock /> : <Unlock />}
                                    </InputGroupAddon>
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            size="icon"
                                            variant="none"
                                            aria-label="Toggle Password Visibility"
                                            title="Toggle Password Visibility"
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            {showPassword ? <Eye /> : <EyeOff />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <PasswordStrength password={signInForm.watch("password")} />
                </FieldGroup>
                <Button isLoading={loading} disabled={loading} type="submit">
                    Sign In with Email
                </Button>
            </form>

            <Heading size="p" className="text-center">
                New to TRG Store?{" "}
                <Link
                    to="/auth/sign-up"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                >
                    Create an account
                </Link>
            </Heading>
        </div>
    );
}

export default SignIn;
