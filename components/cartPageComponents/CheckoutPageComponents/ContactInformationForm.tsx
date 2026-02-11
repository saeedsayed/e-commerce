import { Input } from '@/components/common'
import React from 'react'

type Props = {
    register: any
    errors: any
}

const ContactInformationForm = ({ register, errors }: Props) => {
    return (
        <div className='flex flex-col gap-6'>
            <h3 className='text-xl'>Contact Information</h3>
            <div className='flex gap-3'>
                <Input id='firstName' label='First Name' register={register}
                    err={!!errors.firstName} errMes={errors.firstName?.message} />
                <Input id='lastName' label='Last Name' register={register}
                    err={!!errors.lastName} errMes={errors.lastName?.message} />
            </div>
            <Input type='number' id='phone' label='Phone number' register={register}
                err={!!errors.phone} errMes={errors.phone?.message} />
            <Input id='email' label='Email address' register={register}
                err={!!errors.email} errMes={errors.email?.message} />
        </div>
    )
}

export default ContactInformationForm