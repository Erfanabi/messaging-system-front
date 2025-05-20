"use client";

import Image from "next/image";
import { Textarea } from "@heroui/input";
import FormInput from "@/components/FormInput";
import { Button } from "@heroui/button";
import CheckboxInput from "@/components/CheckboxInput";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("نام الزامی است"),
  phoneNumber: Yup.string().required("شماره تلفن الزامی است"),
  whatsapp: Yup.string(),
  hotelName: Yup.string().required("نام هتل الزامی است"),
  description: Yup.string(),
  positionAddress: Yup.string().required("آدرس محل الزامی است"),
});

export default function Home() {
  const [submitResult, setSubmitResult] = useState({
    success: false,
    message: "",
  });

  const initialValues = {
    name: "",
    phoneNumber: "",
    whatsapp: "",
    hotelName: "",
    description: "",
    positionAddress: "",
    items: {
      pillow: { checked: false, description: "" },
      mattress: { checked: false, description: "" },
      sheets: { checked: false, description: "" },
      duvet: { checked: false, description: "" },
      bathLinen: { checked: false, description: "" },
      completeRoomEquipment: { checked: false, description: "" },
    },
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitResult({ success: false, message: "" });

    const dataToSend = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      whatsapp: values.whatsapp,
      hotelName: values.hotelName,
      description: values.description,
      positionAddress: values.positionAddress,
      items: Object.keys(values.items)
        .filter(key => values.items[key].checked)
        .map(key => ({
          name: key,
          description: values.items[key].description,
        })),
    };

    try {
      console.log({ dataToSend });
      const response = await fetch("https://your-backend-api.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        resetForm();
        setSubmitResult({
          success: true,
          message: "سفارش با موفقیت ارسال شد!",
        });
      } else {
        setSubmitResult({
          success: false,
          message: "خطا در ارسال سفارش. لطفا دوباره تلاش کنید.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitResult({
        success: false,
        message: "خطا در ارسال سفارش. لطفا دوباره تلاش کنید.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto w-full max-w-2xl px-5 py-20">
      <div className="relative mb-20 h-1.5 w-full bg-primary">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3">
          <Image src={"/logo.png"} alt="/logo.png" width={256} height={256} />
        </div>
      </div>

      {submitResult.message && (
        <div
          className={`mb-6 rounded-md p-4 ${submitResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {submitResult.message}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue, errors, touched }) => (
          <Form>
            <div className="flex flex-col gap-y-8">
              <p className="font-semibold text-gray-600">
                Please enter your details.
              </p>

              <div className="flex items-start gap-x-8">
                <>
                  <FastField
                    as={FormInput}
                    name="name"
                    label="NamePhone Number"
                    onChange={e => setFieldValue("name", e.target.value)}
                  />
                  {errors.name && touched.name && (
                    <div className="text-xs text-red-500">{errors.name}</div>
                  )}
                </>

                <>
                  <FastField
                    as={FormInput}
                    name="phoneNumber"
                    label="Phone Number"
                    onChange={e => setFieldValue("phoneNumber", e.target.value)}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="text-xs text-red-500">
                      {errors.phoneNumber}
                    </div>
                  )}
                </>
              </div>

              <div className="flex items-start gap-x-8">
                <FastField
                  as={FormInput}
                  name="whatsapp"
                  label="WhatsAap"
                  onChange={e => setFieldValue("whatsapp", e.target.value)}
                />

                <>
                  <Field
                    as={FormInput}
                    name="hotelName"
                    label="Hotel Name"
                    onChange={e => setFieldValue("hotelName", e.target.value)}
                  />
                  {errors.hotelName && touched.hotelName && (
                    <div className="text-xs text-red-500">
                      {errors.hotelName}
                    </div>
                  )}
                </>
              </div>

              <div className="flex items-start gap-x-8">
                <>
                  <Field name="description">
                    {({ field }) => (
                      <Textarea
                        {...field}
                        color="primary"
                        variant="faded"
                        size="md"
                        radius="sm"
                        className="w-full"
                        classNames={{ inputWrapper: "border-1" }}
                      />
                    )}
                  </Field>
                </>

                <>
                  <Field
                    as={FormInput}
                    name="positionAddress"
                    label="Position Address"
                    onChange={e =>
                      setFieldValue("positionAddress", e.target.value)
                    }
                  />
                  {errors.positionAddress && touched.positionAddress && (
                    <div className="text-xs text-red-500">
                      {errors.positionAddress}
                    </div>
                  )}
                </>
              </div>
            </div>

            <div>
              <div className="relative my-20 h-1.5 w-full bg-primary">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-3">
                  <Image
                    src={"/logo2.png"}
                    alt="/logo2.png"
                    width={50}
                    height={50}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-8">
                <p className="font-semibold text-gray-600">
                  Check the item you need and write a description.
                </p>

                {/* بالش */}
                <Field name="items.pillow.checked">
                  {({ field }) => (
                    <CheckboxInput
                      labelCheckbox="Pillow"
                      placeholder="Comfort pillow for...."
                      isChecked={field.value}
                      onCheckboxChange={checked =>
                        setFieldValue("items.pillow.checked", checked)
                      }
                      onInputChange={value =>
                        setFieldValue("items.pillow.description", value)
                      }
                      inputValue={values.items.pillow.description}
                      disabled={!values.items.pillow.checked}
                    />
                  )}
                </Field>

                {/* تشک */}
                <Field name="items.mattress.checked">
                  {({ field }) => (
                    <CheckboxInput
                      labelCheckbox="Mattress"
                      placeholder="King mattress for...."
                      isChecked={field.value}
                      onCheckboxChange={checked =>
                        setFieldValue("items.mattress.checked", checked)
                      }
                      onInputChange={value =>
                        setFieldValue("items.mattress.description", value)
                      }
                      inputValue={values.items.mattress.description}
                      disabled={!values.items.mattress.checked}
                    />
                  )}
                </Field>

                {/* ملحفه */}
                <Field name="items.sheets.checked">
                  {({ field }) => (
                    <CheckboxInput
                      labelCheckbox="Sheets"
                      placeholder="Comfort cover for...."
                      isChecked={field.value}
                      onCheckboxChange={checked =>
                        setFieldValue("items.sheets.checked", checked)
                      }
                      onInputChange={value =>
                        setFieldValue("items.sheets.description", value)
                      }
                      inputValue={values.items.sheets.description}
                      disabled={!values.items.sheets.checked}
                    />
                  )}
                </Field>

                {/* لحاف */}
                <Field name="items.duvet.checked">
                  {({ field }) => (
                    <CheckboxInput
                      labelCheckbox="Duvet"
                      placeholder="Comfort duvet for...."
                      isChecked={field.value}
                      onCheckboxChange={checked =>
                        setFieldValue("items.duvet.checked", checked)
                      }
                      onInputChange={value =>
                        setFieldValue("items.duvet.description", value)
                      }
                      inputValue={values.items.duvet.description}
                      disabled={!values.items.duvet.checked}
                    />
                  )}
                </Field>

                {/* لوازم حمام */}
                <Field name="items.bathLinen.checked">
                  {({ field }) => (
                    <CheckboxInput
                      labelCheckbox="Bath Linen"
                      placeholder="Face Towel...."
                      isChecked={field.value}
                      onCheckboxChange={checked =>
                        setFieldValue("items.bathLinen.checked", checked)
                      }
                      onInputChange={value =>
                        setFieldValue("items.bathLinen.description", value)
                      }
                      inputValue={values.items.bathLinen.description}
                      disabled={!values.items.bathLinen.checked}
                    />
                  )}
                </Field>

                {/* تجهیزات کامل اتاق */}
                <Field name="items.completeRoomEquipment.checked">
                  {({ field }) => (
                    <CheckboxInput
                      labelCheckbox="Complete room equipment"
                      placeholder="Textile Set...."
                      isChecked={field.value}
                      onCheckboxChange={checked =>
                        setFieldValue(
                          "items.completeRoomEquipment.checked",
                          checked,
                        )
                      }
                      onInputChange={value =>
                        setFieldValue(
                          "items.completeRoomEquipment.description",
                          value,
                        )
                      }
                      inputValue={
                        values.items.completeRoomEquipment.description
                      }
                      disabled={!values.items.completeRoomEquipment.checked}
                    />
                  )}
                </Field>
              </div>

              <Button
                className="mt-10 w-full"
                radius="sm"
                color="primary"
                size="md"
                type="submit"
                isDisabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
