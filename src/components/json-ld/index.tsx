interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

const JsonLd = ({ data }: JsonLdProps) => {
  const json = JSON.stringify(
    Array.isArray(data) ? data : { "@context": "https://schema.org", ...data },
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

export default JsonLd;
