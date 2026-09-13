"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle, Mail } from "lucide-react";
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
  const [result, setResult] = useState<{
    message: string;
    sent: boolean;
  } | null>(null);
  const [draft, setDraft] = useState("");
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
  async function submit(values: Enquiry) {
    setResult(null);
    const body = Object.entries(values)
      .filter(([key]) => key !== "website")
      .map(([key, value]) => `${key}: ${value || "Not provided"}`)
      .join("\n");
    setDraft(
      `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${values.requirement}`)}&body=${encodeURIComponent(body)}`,
    );
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setResult({
        message:
          data.message ||
          "The enquiry could not be sent. Please contact us by email.",
        sent: response.ok && data.sent === true,
      });
    } catch {
      setResult({
        message:
          "We could not confirm delivery. Your details are still here. Please contact our team by email.",
        sent: false,
      });
    }
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
    <form className="enquiry-form" onSubmit={handleSubmit(submit)} noValidate>
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
        Your details will be used to respond to your enquiry. Read our{" "}
        <Link href="/privacy">privacy policy</Link>. Drawings and specifications
        can be shared by <a href={`mailto:${company.email}`}>email</a>.
      </p>
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Submitting enquiry"
          : contact
            ? "Send your message"
            : "Send your requirement"}
        {isSubmitting ? (
          <LoaderCircle size={17} className="submitting-icon" />
        ) : (
          <ArrowUpRight size={17} />
        )}
      </button>
      {result && (
        <div
          className={`form-result ${result.sent ? "result-sent" : "result-unavailable"}`}
          role="status"
          aria-live="polite"
        >
          <p>{result.message}</p>
          {!result.sent && (
            <a className="text-link" href={draft}>
              <Mail size={16} />
              Open enquiry in email
            </a>
          )}
        </div>
      )}
    </form>
  );
}
export function ContactForm({ products }: { products: ProductOption[] }) {
  return <QuoteForm contact products={products} />;
}
