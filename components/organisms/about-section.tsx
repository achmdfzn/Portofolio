export default function AboutSection() {
  return (
    <section
      className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center"
      id="about"
    >
      <h2
        className="mb-3 text-xs font-semibold uppercase tracking-[0.15em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        About
      </h2>
      <h3
        className="mb-8 text-2xl font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Who I Am
      </h3>

      <div className="flex flex-col gap-4 text-left" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
        <p>
          I am an Informatics Engineering student with a deep passion for modern software
          engineering and artificial intelligence. I focus on building products that are not
          only functional but also have high engineering quality — clean, scalable, and
          user-oriented.
        </p>
        <p>
          My work combines full-stack web development with active exploration in Machine
          Learning to create smart, impactful solutions. I believe in writing code that
          stands the test of time — well-architected, well-tested, and well-documented.
        </p>
        <p>
          Currently diving deep into deep learning with TensorFlow and PyTorch while
          refining my craft in Next.js, TypeScript, and modern web architecture.
        </p>
      </div>
    </section>
  );
}
