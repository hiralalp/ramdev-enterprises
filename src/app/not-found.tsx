import { Button, Container } from "@/components/ui/Primitives";
export default function NotFound() {
  return (
    <section className="section not-found">
      <Container>
        <p className="eyebrow">
          <span />
          404 / PAGE NOT FOUND
        </p>
        <h1>
          The page you&apos;re looking for may have moved or no longer exists.
        </h1>
        <div className="button-row">
          <Button href="/">Back to home</Button>
          <Button href="/products" secondary>
            View products
          </Button>
        </div>
      </Container>
    </section>
  );
}
