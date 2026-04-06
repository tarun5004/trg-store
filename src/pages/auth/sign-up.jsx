import { zodResolver } from "@hookform/resolvers/zod";
import {
    BadgeDollarSign,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Unlock,
    User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Heading } from "@/components/ui/Headings";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { PasswordStrength } from "@/components/ui/password-strength";
import { useAuth } from "@/providers/AuthProvider";
import SignUpSchema from "@/schema/auth/sign-up";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "TRG Store - Sign Up";
    }, []);

    const signUpForm = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const { setFocus } = signUpForm;

    useEffect(() => {
        setFocus("fullName");
    }, [setFocus]);

    const onSubmit = async (data) => {
        setLoading(true);
        setTimeout(async () => {
            if (await signUp(data)) {
                navigate("/auth/sign-in");
            }
            signUpForm.reset();
            setFocus("fullName");
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
                    Create your account
                </Heading>
                <Heading size="h4">
                    Join <b>TRG Store</b>
                </Heading>
                <Heading size="p" className="leading-7">
                    Start shopping with the new premium storefront while keeping the same familiar account flow.
                </Heading>
            </div>
            <form
                onSubmit={signUpForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <FieldSet className="gap-4">
                    <FieldGroup>
                        <Controller
                            name="fullName"
                            control={signUpForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="fullName">
                                        Full Name
                                    </FieldLabel>
                                    <InputGroup className="bg-background/75">
                                        <InputGroupAddon>
                                            <User />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            id="fullName"
                                            placeholder="Tarun Raj Gaur"
                                            {...field}
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={signUpForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Controller
                            name="password"
                            control={signUpForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <InputGroup className="bg-background/75">
                                        <InputGroupInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a secure password"
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
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <PasswordStrength
                            password={signUpForm.watch("password")}
                        />
                    </FieldGroup>
                </FieldSet>
                <Button isLoading={loading} disabled={loading} type="submit">
                    Sign Up with Email
                </Button>
            </form>

            <Heading size="p" className="text-center">
                Already have an account?{" "}
                <Link
                    className="font-medium text-primary underline-offset-4 hover:underline"
                    to="/auth/sign-in"
                >
                    Sign In
                </Link>
            </Heading>
        </div>
    );
}

export default SignUp;
