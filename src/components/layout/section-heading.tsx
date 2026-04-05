type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : ""

  return (
    <div className={`space-y-3 ${alignment}`}>
      <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}