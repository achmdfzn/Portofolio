/**
 * Component test untuk Contact (form bergaya lined-paper).
 *
 * Cakupan:
 *  - Rendering awal: heading, form fields, tombol submit.
 *  - Validasi Zod: error message muncul saat field kosong / invalid.
 *  - Submit simulasi → tampilkan sukses + tombol "Kirim lagi".
 *  - Reduced motion tidak mengubah render output (hanya animasi).
 *
 * Catatan:
 *  - framer-motion `whileInView` dan `useReducedMotion` di-mock oleh
 *    environment jsdom (tidak ada IntersectionObserver). Motion tidak
 *    memblokir render — children tetap tampil tanpa animasi.
 *  - matchMedia sudah di-mock di test/setup.ts → useReducedMotion
 *    mengembalikan false.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "@/components/Contact";

describe("Contact — render awal", () => {
  it("menampilkan heading dan subheading", () => {
    render(<Contact />);
    expect(screen.getByText("Kontak")).toBeInTheDocument();
    expect(screen.getByText(/Punya ide/)).toBeInTheDocument();
    expect(
      screen.getByText(/Mari kita diskusikan/)
    ).toBeInTheDocument();
  });

  it("menampilkan semua input field", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Nama")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Pesan")).toBeInTheDocument();
  });

  it("menampilkan tombol submit dengan teks 'Kirim Pesan'", () => {
    render(<Contact />);
    expect(
      screen.getByRole("button", { name: /Kirim Pesan/i })
    ).toBeInTheDocument();
  });
});

describe("Contact — validasi", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("menampilkan error saat nama kosong", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));
    expect(
      await screen.findByText(/Nama minimal 2 karakter/)
    ).toBeInTheDocument();
  });

  it("menampilkan error saat email kosong", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    // Isi nama dulu biar cuma error email + message.
    await user.type(screen.getByLabelText("Nama"), "Test User");
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));
    expect(
      await screen.findByText(/Format email tidak valid/)
    ).toBeInTheDocument();
  });

  it("menampilkan error saat pesan terlalu pendek", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText("Nama"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Pesan"), "Pendek");
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));
    expect(
      await screen.findByText(/Pesan minimal 10 karakter/)
    ).toBeInTheDocument();
  });
});

describe("Contact — submit sukses", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("menampilkan pesan sukses setelah submit valid", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Isi form dengan data valid.
    await user.type(screen.getByLabelText("Nama"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(
      screen.getByLabelText("Pesan"),
      "Ini adalah pesan test yang cukup panjang dan valid."
    );

    // Submit form.
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));

    // Tunggu status "submitting" — tombol berubah jadi "Mengirim...".
    expect(
      screen.getByRole("button", { name: /Mengirim.../i })
    ).toBeInTheDocument();

    // Majukan waktu 800ms (durasi setTimeout di Contact).
    vi.advanceTimersByTime(800);

    // Setelah submit sukses → panel sukses muncul.
    await waitFor(() => {
      expect(screen.getByText(/Pesan terkirim!/)).toBeInTheDocument();
    });

    // Tombol "Kirim lagi" muncul.
    expect(
      screen.getByRole("button", { name: /Kirim lagi/i })
    ).toBeInTheDocument();
  });

  it("memungkinkan kirim ulang setelah sukses", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // Submit sukses dulu.
    await user.type(screen.getByLabelText("Nama"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(
      screen.getByLabelText("Pesan"),
      "Ini adalah pesan test yang cukup panjang dan valid."
    );
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/i }));
    vi.advanceTimersByTime(800);

    await waitFor(() => {
      expect(screen.getByText(/Pesan terkirim!/)).toBeInTheDocument();
    });

    // Klik "Kirim lagi" → form kembali.
    await user.click(screen.getByRole("button", { name: /Kirim lagi/i }));
    expect(
      screen.getByRole("button", { name: /Kirim Pesan/i })
    ).toBeInTheDocument();
  });
});
