import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, LogOut, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Heading } from "@/components/ui/Headings";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { profileSections } from "@/constants/profile";
import { useAuth } from "@/providers/AuthProvider";
import { useProduct } from "@/providers/ProductProvider";
import ProfileSchema from "@/schema/my/profile";

function Profile() {
    const { loggedInUser, signOut, updateProfile, deleteAccount } = useAuth();
    const { clearCart, clearWhishlist } = useProduct();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.title = "TRG Store - Profile";
    }, []);

    const profileForm = useForm({
        resolver: zodResolver(ProfileSchema),
        values: {
            fullName: loggedInUser.fullName,
        },
    });

    const { setFocus } = profileForm;

    useEffect(() => {
        setFocus("fullName");
    }, [setFocus]);

    const onSubmit = async (data) => {
        setLoading(true);
        setTimeout(async () => {
            await updateProfile(data);
            profileForm.reset({ fullName: data.fullName });
            setFocus("fullName");
            setLoading(false);
            setOpen(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-8 lg:gap-10">
            <div className="rounded-[2.2rem] border border-border/70 bg-[linear-gradient(135deg,rgba(96,48,35,0.96),rgba(176,96,68,0.9))] p-6 text-white shadow-[0_30px_90px_-55px_rgba(63,29,22,0.75)] sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <span className="flex size-24 items-center justify-center rounded-full bg-white/15 text-3xl font-bold text-white select-none">
                            {loggedInUser.fullName[0].toUpperCase()}
                        </span>
                        <div className="space-y-2 text-center md:text-left">
                            <Heading size="small" className="text-white/70">
                                TRG Store profile
                            </Heading>
                            <Heading size="h4" className="text-white">
                                {loggedInUser.fullName}
                            </Heading>
                            <Heading size="p" className="text-white/75">
                                {loggedInUser.email}
                            </Heading>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant="secondary">
                                    <Edit />
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle asChild>
                                        <Heading size="h6">Edit Profile</Heading>
                                    </DialogTitle>
                                    <DialogDescription asChild>
                                        <Heading size="p" className="leading-snug">
                                            Update your profile information here and save your changes.
                                        </Heading>
                                    </DialogDescription>
                                </DialogHeader>
                                <form
                                    onSubmit={profileForm.handleSubmit(onSubmit)}
                                    className="flex flex-col gap-6"
                                >
                                    <FieldGroup>
                                        <Controller
                                            name="fullName"
                                            control={profileForm.control}
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel htmlFor="fullName">
                                                        Full Name
                                                    </FieldLabel>
                                                    <InputGroup className="bg-background/75">
                                                        <InputGroupAddon>
                                                            <User2 />
                                                        </InputGroupAddon>
                                                        <InputGroupInput
                                                            id="fullName"
                                                            placeholder="Tarun Raj Gaur"
                                                            {...field}
                                                        />
                                                    </InputGroup>
                                                    {fieldState.invalid && (
                                                        <FieldError
                                                            errors={[
                                                                fieldState.error,
                                                            ]}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    </FieldGroup>
                                    <Button
                                        isLoading={loading}
                                        disabled={loading}
                                        type="submit"
                                    >
                                        Update Profile
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant="outline"
                            className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    signOut();
                                    setLoading(false);
                                }, 1000);
                            }}
                        >
                            <LogOut />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-[2rem] border border-border/70 bg-white/92 p-6 shadow-sm sm:p-8">
                <div className="mb-6 space-y-2">
                    <Heading size="small" className="text-primary/70">
                        Quick access
                    </Heading>
                    <Heading size="h4">Everything important in one place</Heading>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {profileSections.map((section, idx) => (
                        <Link
                            key={idx}
                            to={section.to ?? "/my/profile"}
                            className="flex items-center gap-4 rounded-[1.6rem] border border-border/70 bg-background/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            <span className="shrink-0 rounded-2xl bg-muted p-3">
                                <section.icon />
                            </span>
                            <div className="flex flex-col">
                                <Heading
                                    size="p"
                                    className="font-medium text-foreground"
                                >
                                    {section.label}
                                </Heading>
                                <Heading size="p" className="text-sm">
                                    {section.description}
                                </Heading>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4 rounded-[2rem] border border-destructive/20 bg-destructive/5 p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2">
                    <Heading size="h6" className="font-medium">
                        Delete Account
                    </Heading>
                    <Heading size="p" className="max-w-lg">
                        This permanently removes your account and clears all saved data from this local shopping experience.
                    </Heading>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle asChild>
                                <Heading size="h6" className="font-medium">
                                    Are you absolutely sure?
                                </Heading>
                            </AlertDialogTitle>
                            <AlertDialogDescription asChild>
                                <Heading size="p">
                                    This action cannot be undone. This will permanently delete your account and remove all your data.
                                </Heading>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                variant="destructive"
                                isLoading={loading}
                                disabled={loading}
                                onClick={() => {
                                    setLoading(true);
                                    setTimeout(() => {
                                        signOut(false);
                                        clearCart();
                                        clearWhishlist();
                                        deleteAccount();
                                        setLoading(false);
                                    }, 1000);
                                }}
                            >
                                Delete Account
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default Profile;
