'use client'

import React from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { nunito, telex } from '@/app/ui/fonts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

interface FormStatus {
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
}

function ContactForm() {
    const { isLoaded, userId } = useAuth();
    const { user } = useUser();
    const [formData, setFormData] = React.useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    React.useEffect(() => {
        if (isLoaded && user) {
            setFormData(prev => ({
                ...prev,
                name: user.username || user.firstName || '',
                email: user.primaryEmailAddress?.emailAddress || ''
            }));
        }
    }, [isLoaded, user]);

    const [errors, setErrors] = React.useState<FormErrors>({});
    const [status, setStatus] = React.useState<FormStatus>({ type: 'idle', message: '' });

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
        if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus({ type: 'loading', message: '' });
        try {
            const response = await fetch('/api/sendMail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error();

            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
        } catch {
            setStatus({ type: 'error', message: 'Failed to send message' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
            <div className="container mx-auto px-4 py-16">
                <Card className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm border-gray-800">
                    <CardHeader className="space-y-1">
                        <CardTitle className={`${nunito.className} text-3xl font-bold text-center text-white`}>
                            Get in Touch
                        </CardTitle>
                        <p className={`${telex.className} text-gray-400 text-center`}>
                            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className={`${telex.className} text-sm font-medium text-gray-200`}>
                                    Your Name
                                </label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-gray-800/50 border-gray-700 text-white"
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className={`${telex.className} text-sm font-medium text-gray-200`}>
                                    Email Address
                                </label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-800/50 border-gray-700 text-white"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className={`${telex.className} text-sm font-medium text-gray-200`}>
                                    Message
                                </label>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="bg-gray-800/50 border-gray-700 text-white min-h-[150px]"
                                    placeholder="Your message here..."
                                />
                                {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
                            </div>

                            {status.type !== 'idle' && (
                                <Alert className={`${
                                    status.type === 'success' ? 'bg-green-900/50 border-green-800' :
                                        status.type === 'error' ? 'bg-red-900/50 border-red-800' :
                                            'bg-blue-900/50 border-blue-800'
                                }`}>
                                    <AlertDescription>{status.message}</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                            >
                                {status.type === 'loading' ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default function Contact() {
    return <ContactForm />;
}