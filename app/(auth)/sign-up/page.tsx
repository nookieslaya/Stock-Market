'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
// import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import InputFiled from "@/components/forms/InputFiled";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS, RISK_TOLERANCE_OPTIONS, PREFERRED_INDUSTRIES} from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";


const SignUpPage = () => {

    // const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    },);
    const onSubmit = async (data: SignUpFormData) => {
        try {
            // const result = await signUpWithEmail(data);
            // if (result.success) router.push('/');
            console.log(data)

        } catch (e) {
            console.error(e);
            // toast.error('Sign up failed', {
            //     description: e instanceof Error ? e.message : 'Failed to create an account.'
            // })
        }
    }

    return (
        <>
            <h1 className="form-title">
                Sign Up
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputFiled
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{required: 'Full name is required', minLength: 2}}
                />

                <InputFiled
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Email name is required',
                        pattern: /^\w+@\w+\.\w+$/,
                        message: 'Email address is required'
                    }}
                />

                <InputFiled
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{required: 'Password is required', minLength: 8}}
                />

                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />

                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
                </Button>

                <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in"/>
            </form>

        </>
    )
}
export default SignUpPage
