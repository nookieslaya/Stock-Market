import React from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";


function InputFiled({
                        name,
                        label,
                        placeholder,
                        type = 'text',
                        register,
                        error,
                        disabled,
                        value,
                        validation
                    }: FormInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            <Input
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled})}
                {...register(name, validation)}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}

        </div>
    )
}

export default InputFiled
