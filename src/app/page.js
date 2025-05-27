"use client";

import Image from "next/image";
import { Textarea } from "@heroui/input";
import FormInput from "@/components/FormInput";
import { Button } from "@heroui/button";
import CheckboxInput from "@/components/CheckboxInput";
import { useState } from "react";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+\d{10,15}$/,
      "Phone number must include country code and be 10 to 15 digits long",
    ),
  whatsapp: Yup.string(),
  hotelName: Yup.string().required("Hotel name is required"),
  position: Yup.string("Position is required"),
  address: Yup.string().required("Address is required"),
});

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const gulfCountries = [
    "ae", // امارات
    "bh", // بحرین
    "kw", // کویت
    "om", // عمان
    "qa", // قطر
    "sa", // عربستان
    "ir", // ایران
    // کشور های معروف
    "us", // آمریکا
    "ca", // کانادا
    "gb", // انگلستان (UK)
    "fr", // فرانسه
    "de", // آلمان
    "au", // استرالیا
    "in", // هند
    "cn", // چین
    "jp", // ژاپن
  ];

  const [submitResult, setSubmitResult] = useState(false);

  const initialValues = {
    name: "",
    phoneNumber: "+971",
    whatsapp: "+971",
    hotelName: "",
    position: "",
    address: "",
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
    setSubmitResult(false);

    const dataToSend = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      whatsapp: values.whatsapp,
      hotelName: values.hotelName,
      position: values.position,
      address: values.address,
      items: Object.keys(values.items)
        .filter(key => values.items[key].checked)
        .map(key => ({
          name: key,
          description: values.items[key].description,
        })),
    };

    try {
      const response = await fetch(`${BASE_URL}/send-whatsapp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      console.log({ data });

      if (response.ok) {
        resetForm();
        setSubmitResult(true);
        toast.success("success");
      } else {
        setSubmitResult(false);
        toast.error("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitResult(false);
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
                <div className="flex w-1/2 flex-col">
                  <FastField
                    as={FormInput}
                    name="name"
                    label="Name"
                    onChange={e => setFieldValue("name", e.target.value)}
                  />
                  {errors.name && touched.name && (
                    <div className="text-xs text-red-500">{errors.name}</div>
                  )}
                </div>
                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-light">
                    Phone Number
                  </label>

                  <div className="flex flex-col">
                    <Field name="phoneNumber">
                      {({ field }) => (
                        <PhoneInput
                          country="ae" // پیش‌فرض امارات
                          onlyCountries={gulfCountries} // فقط کشورهای حوزه خلیج فارس + ایران
                          enableAreaCodes={true}
                          value={field.value}
                          onChange={value => {
                            setFieldValue("phoneNumber", `+${value}`);
                            setFieldValue("whatsapp", `+${value}`);
                          }}
                          inputClass="phone-input"
                          inputProps={{
                            name: "phoneNumber",
                            required: true,
                            autoFocus: true,
                          }}
                        />
                      )}
                    </Field>
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className="text-xs text-red-500">
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-x-8">
                <div className="w-1/2">
                  <FastField
                    as={FormInput}
                    name="whatsapp"
                    label="WhatsApp"
                    onChange={e => setFieldValue("whatsapp", e.target.value)}
                  />
                </div>

                <div className="w-1/2">
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
                </div>
              </div>

              <div className="flex items-start gap-x-8">
                <div className="w-1/2 space-y-1">
                  <label className="block text-sm font-light">Position</label>
                  <>
                    <Field name="position">
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
                    {errors.position && touched.position && (
                      <div className="text-xs text-red-500">
                        {errors.position}
                      </div>
                    )}
                  </>
                </div>

                <div className="flex w-1/2 flex-col">
                  <Field
                    as={FormInput}
                    name="address"
                    label="Address"
                    onChange={e => setFieldValue("address", e.target.value)}
                  />
                  {errors.address && touched.address && (
                    <div className="text-xs text-red-500">{errors.address}</div>
                  )}
                </div>
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
                {isSubmitting ? "SENDING..." : "SEND ORDER"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
