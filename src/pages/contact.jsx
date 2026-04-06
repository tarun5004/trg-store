import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Tag, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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
    InputGroupInput,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import ContactSchema from "@/schema/contact/contact";

function Contact() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "TRG Store - Contact";
    }, []);

    const contactForm = useForm({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            fullName: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const { setFocus } = contactForm;

    useEffect(() => {
        setFocus("fullName");
    }, [setFocus]);

    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            contactForm.reset();
            setFocus("fullName");
            toast.success("Message sent! We'll get back to you soon.");
        }, 1500);
    };

    return (
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <div className="rounded-[2.2rem] border border-border/70 bg-[linear-gradient(135deg,rgba(96,48,35,0.96),rgba(176,96,68,0.9))] p-8 text-white shadow-[0_30px_90px_-55px_rgba(63,29,22,0.75)] sm:p-10">
                <Badge variant="secondary">Get in Touch</Badge>
                <Heading size="h3" className="mt-5 text-white">
                    Talk to the TRG Store team.
                </Heading>
                <Heading size="p" className="mt-4 text-white/75 leading-7">
                    Questions, feedback, or support requests are all welcome. The flow stays simple and the experience now looks more premium too.
                </Heading>
                <div className="mt-8 space-y-4">
                    <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4">
                        <Heading size="small" className="text-white/70">
                            Response window
                        </Heading>
                        <Heading size="p" className="mt-2 text-white/80">
                            Typically within 24 hours
                        </Heading>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4">
                        <Heading size="small" className="text-white/70">
                            Best for
                        </Heading>
                        <Heading size="p" className="mt-2 text-white/80">
                            Order help, product questions, feedback, and partnership conversations
                        </Heading>
                    </div>
                </div>
            </div>

            <form
                onSubmit={contactForm.handleSubmit(onSubmit)}
                className="rounded-[2.2rem] border border-border/70 bg-white/92 p-6 shadow-sm sm:p-8"
            >
                <div className="mb-6 space-y-3">
                    <Heading size="small" className="text-primary/70">
                        Contact form
                    </Heading>
                    <Heading size="h4">Send us a message</Heading>
                    <Heading size="p" className="leading-7">
                        Fill out the form below and we&apos;ll get back to you soon.
                    </Heading>
                </div>

                <FieldSet className="gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FieldGroup>
                            <Controller
                                name="fullName"
                                control={contactForm.control}
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
                                control={contactForm.control}
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
                    </div>

                    <FieldGroup>
                        <Controller
                            name="subject"
                            control={contactForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="subject">
                                        Subject
                                    </FieldLabel>
                                    <InputGroup className="bg-background/75">
                                        <InputGroupAddon>
                                            <Tag />
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            id="subject"
                                            placeholder="Order issue or product question"
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
                            name="message"
                            control={contactForm.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel htmlFor="message">
                                        Message
                                    </FieldLabel>
                                    <InputGroup className="bg-background/75">
                                        <InputGroupTextarea
                                            id="message"
                                            rows={6}
                                            placeholder="Tell us how we can help."
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
                </FieldSet>

                <Button
                    type="submit"
                    isLoading={loading}
                    disabled={loading}
                    className="mt-6"
                >
                    Send Message
                </Button>
            </form>
        </div>
    );
}

export default Contact;
