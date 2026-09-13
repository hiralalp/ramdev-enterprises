import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/forms/QuoteForm";
import { Container, PageIntro } from "@/components/ui/Primitives";
import { company, mapUrl } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { productOptions } from "@/lib/catalogue";

export const metadata = pageMetadata(
  "Contact Us",
  "Contact Ramdev Enterprises in Karanai, Chennai. Email your industrial material requirements or use our enquiry form.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT RAMDEV ENTERPRISES"
        title="Let us understand your requirement."
        description="Get in touch about a material enquiry, a project brief or the next step in your sourcing discussion."
      />
      <section className="section">
        <Container className="form-layout">
          <aside className="contact-info">
            <div>
              <MapPin size={24} strokeWidth={1.5} />
              <h2>Visit us in Chennai.</h2>
              <address>
                {company.name}
                <br />
                {company.addressLine1}
                <br />
                {company.locality}, {company.city} - {company.postalCode}
                <br />
                {company.district}, {company.state}
                <br />
                {company.country}
              </address>
              <a
                className="text-link"
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div>
              <Mail size={23} strokeWidth={1.5} />
              <h3>Email our team</h3>
              <a className="direct-email" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </div>
            <div>
              <p className="eyebrow">BUSINESS IDENTITY</p>
              <p className="muted">GSTIN: {company.gstin}</p>
            </div>
          </aside>
          <ContactForm products={productOptions} />
        </Container>
      </section>
    </>
  );
}
