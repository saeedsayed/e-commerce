'use client'
import { Input } from '@/components/common';
import React, { useEffect, useState } from 'react'

type Props = {
    register: any;
    errors: any;
}

const ShippingAddressForm = ({ register, errors }: Props) => {
    return (
        <div className='flex flex-col gap-6'>
            <h3 className='text-xl'>Shipping Address</h3>
            {/* street */}
            <Input id='street' label='Street address' placeholder='street address'
                register={register} err={!!errors.street} errMes={errors.street?.message} />
            {/* country */}
            <CountrySelect id="country" register={register} isError={!!errors.country} errMes={errors.country?.message} />
            {/* city */}
            <Input id='city' label='Town/City' placeholder='Town/City'
                register={register} err={!!errors.city} errMes={errors.city?.message} />
            <div className='flex gap-3'>
                {/* state */}
                <Input id='state' label='State' placeholder='State'
                    register={register} err={!!errors.state} errMes={errors.state?.message} />
                {/* ZIPCode */}
                <Input id='postalCode' label='Postal Code' placeholder='Postal Code'
                    register={register} err={!!errors.postalCode} errMes={errors.postalCode?.message} />
            </div>
        </div>
    )
}

export default ShippingAddressForm

// country select input component
const CountrySelect = ({ id, register, isError, errMes }: { id: string, register: any, isError: boolean, errMes: string }) => {
    const [countries, setCountries] = useState<string[]>([]);
    const [initialCountry, setInitialCountry] = useState<string>();
    useEffect(() => {
        // get list of countries
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select"
        )
            .then((response) => response.json())
            .then((data) => {
                // create list of countries with country name only
                const countries = data.countries.map((country: { value: string, label: string }) => country.label);
                setCountries(countries);
                setInitialCountry(data.userSelectValue.label);
            });
    }, []);
    return (
        <div>
            <label htmlFor={id} className='inline-block font-bold text-sm mb-2 first-letter:capitalize text-sub-text'>
                Country <span className="text-[#df1b41] font-bold">{errMes}</span></label>
            <select id={id} className={`border cursor-pointer border-[#CBCBCB] relative focus:border-sub-text
                bg-section-bg border-secondary focus:outline-none text-primary-text rounded-md  py-2 px-4 w-full
                ${isError ? 'border-[#df1b41]' : ''}`}
                {...register(id)}>
                <option value={initialCountry} className='text-primary-text font-bold'>
                    {initialCountry}
                </option>
                {countries.map((country: string) => (
                    <option key={crypto.randomUUID()} value={country} className='text-primary-text'>
                        {country}
                    </option>
                ))}
            </select>
        </div>
    )
}