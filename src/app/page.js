"use client";

import Image from "next/image";
import { Input, Textarea } from "@heroui/input";
import FormInput from "@/components/FormInput";

export default function Home() {
  return (
    <div className="container mx-auto w-full max-w-2xl py-20">
      <div className="relative mb-14 h-1.5 w-full bg-primary">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3">
          <Image src={"/logo.png"} alt="/logo.png" width={256} height={256} />
        </div>
      </div>

      <div className="flex flex-col gap-y-8">
        <p className="font-semibold text-gray-600">
          Please enter your details.
        </p>

        <div className="flex items-start gap-x-8">
          <FormInput label="Phone Number" />

          <FormInput label="Phone Number" />
        </div>

        <div className="flex items-start gap-x-8">
          <FormInput label="WhatsAap" />

          <FormInput label="Hotel Name" />
        </div>

        <div className="flex items-start gap-x-8">
          <div className="w-full space-y-1">
            <label className="block text-sm font-light">
              Name Phone Number
            </label>
            <Textarea
              color="primary"
              variant="faded"
              size="md"
              radius="sm"
              className="w-full"
              classNames={{ inputWrapper: "border-1" }}
            />
          </div>

          <FormInput label="Position Address" />
        </div>
      </div>

      <div className="relative my-20 mb-14 h-1.5 w-full bg-primary">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3">
          <Image src={"/logo.png"} alt="/logo.png" width={256} height={256} />
        </div>
      </div>

      <div className="flex flex-col gap-y-8">
        <p className="font-semibold text-gray-600">
          Check the item you need and write a description.
        </p>

        <FormInput label="Phone Number" />

        <FormInput label="Phone Number" />

        <FormInput label="Phone Number" />

        <FormInput label="Phone Number" />

        <FormInput label="Phone Number" />

        <FormInput label="Phone Number" />
      </div>
    </div>
  );
}
