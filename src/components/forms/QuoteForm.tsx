"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, MessageCircle } from "lucide-react";
import { enquirySchema, type Enquiry } from "@/lib/validation";
import { company } from "@/data/company";
type ProductOption = { slug: string; name: string };

export function QuoteForm({
  initialProduct = "",
  contact = false,
  products = [],
  initialDetails = "",
}: {
  initialProduct?: string;
  contact?: boolean;
  products?: ProductOption[];
  initialDetails?: string;
}) {
  const [whatsappDraft, setWhatsappDraft] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      requirement:
        products.find((product) => product.slug === initialProduct)?.name || "",
      quantity: "",
      specification: "",
      location: "",
      details: initialDetails,
      website: "",
    },
  });
  function submit(values: Enquiry) {
    const messageFields = [
      ["Full name", values.name],
      ["Company name", values.company],
      ["Email", values.email],
      ["Phone / WhatsApp", values.phone],
      ["Requirement", values.requirement],
      ...(!contact
        ? [
            ["Quantity", values.quantity],
            ["Grade / specification", values.specification],
            ["Delivery location", values.location],
          ]
        : []),
      ["Requirement details", values.details],
    ];
    const message = [
      `New ${contact ? "contact" : "quote"} enquiry for ${company.name}`,
      "",
      ...messageFields.map(
        ([label, value]) => `${label}: ${value || "Not provided"}`,
      ),
    ].join("\n");
    const url = new URL(company.whatsappHref);
    url.searchParams.set("text", message);
    setWhatsappDraft(url.href);
    window.open(url.href, "_blank", "noopener,noreferrer");
  }
  const fields: {
    name: keyof Enquiry;
    label: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    placeholder?: string;
  }[] = [
    { name: "name", label: "Full name", required: true, autoComplete: "name" },
    { name: "company", label: "Company name", autoComplete: "organization" },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Phone / WhatsApp",
      type: "tel",
      autoComplete: "tel",
    },
    {
      name: "requirement",
      label: contact ? "Subject / requirement" : "Product / requirement",
      required: true,
      placeholder: "Select or describe your requirement",
    },
    ...(!contact
      ? [
          {
            name: "quantity" as const,
            label: "Quantity",
            placeholder: "Include units",
          },
          { name: "specification" as const, label: "Grade / specification" },
          {
            name: "location" as const,
            label: "Delivery location",
            autoComplete: "address-level2",
          },
        ]
      : []),
  ];
  return (
    <form
      className="enquiry-form"
      onSubmit={handleSubmit(submit)}
      onChange={() => setWhatsappDraft("")}
      noValidate
    >
      <div className="form-heading">
        <h2>{contact ? "Start a conversation." : "Tell us what you need."}</h2>
        <p>Fields marked * are required.</p>
      </div>
      <div className="form-grid">
        {fields.map((field) => (
          <div
            className={`form-field ${field.name === "requirement" && contact ? "field-wide" : ""}`}
            key={field.name}
          >
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span aria-hidden="true"> *</span>}
            </label>
            <input
              id={field.name}
              type={field.type || "text"}
              {...register(field.name)}
              autoComplete={field.autoComplete}
              required={field.required}
              aria-invalid={!!errors[field.name]}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
              list={
                field.name === "requirement" ? "product-options" : undefined
              }
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p
                id={`${field.name}-error`}
                className="field-error"
                role="alert"
              >
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}
        <datalist id="product-options">
          {products.map((product) => (
            <option key={product.slug} value={product.name} />
          ))}
          <option value="Custom requirement" />
        </datalist>
        <div className="form-field field-wide">
          <label htmlFor="details">
            Requirement details <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="details"
            {...register("details")}
            required
            rows={5}
            maxLength={5000}
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? "details-error" : undefined}
            placeholder="Include the application, dimensions, drawing reference and any other relevant details."
          />
          {errors.details && (
            <p id="details-error" className="field-error" role="alert">
              {errors.details.message}
            </p>
          )}
        </div>
      </div>
      <div hidden aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          {...register("website")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="form-privacy">
        Continuing shares your enquiry details with WhatsApp to prepare a
        message to our team. Read our{" "}
        <Link href="/privacy">privacy policy</Link>. Drawings and specifications
        can be shared by <a href={`mailto:${company.email}`}>email</a>.
      </p>
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Preparing message" : "Continue to WhatsApp"}
        {isSubmitting ? (
          <LoaderCircle size={17} className="submitting-icon" />
        ) : (
          <MessageCircle size={17} aria-hidden="true" />
        )}
      </button>
      {whatsappDraft && (
        <div className="form-result" role="status" aria-live="polite">
          <p>WhatsApp message ready. Sending is completed in WhatsApp.</p>
          <a
            className="text-link"
            href={whatsappDraft}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Open WhatsApp
          </a>
        </div>
      )}
    </form>
  );
}
export function ContactForm({ products }: { products: ProductOption[] }) {
  return <QuoteForm contact products={products} />;
}
