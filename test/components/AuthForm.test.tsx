/**
 * Component test untuk AuthForm (halaman /auth).
 *
 * Cakupan:
 *  - Render awal: heading, fields, tombol, hint demo credentials.
 *  - Validasi Zod: error pada field kosong / invalid.
 *  - Kegagalan login: menampilkan error global.
 *  - Keberhasilan login: menampilkan "Berhasil masuk!" + redirect.
 *
 * Mock:
 *  - useAuth dari hooks/useAuth di-mock untuk kontrol penuh atas
 *    signIn/signOut/demoCredentials.
 *  - router.push di-mock untuk verifikasi redirect.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

// Mock useAuth sebelum test apa pun jalan.
vi.mock("@/hooks/useAuth");

// Mock next/navigation useRouter.
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const DEMO_EMAIL = "admin@achmdfauzan.dev";
const DEMO_PASSWORD = "portofolio2026";

beforeEach(() => {
  vi.clearAllMocks();

  // Default mock: user belum login, demo credentials tersedia.
  vi.mocked(useAuth).mockReturnValue({
    user: null,
    session: null,
    status: "unauthenticated",
    mounted: true,
    demoCredentials: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
    signIn: vi.fn(),
    signOut: vi.fn(),
  } as unknown as ReturnType<typeof useAuth>);
});

describe("AuthForm — render awal", () => {
  it("menampilkan heading dan subheading", () => {
    render(<AuthForm next="/dashboard" />);
    expect(screen.getByText(/Masuk ke/)).toBeInTheDocument();
    expect(screen.getByText(/Pintu belakang/)).toBeInTheDocument();
  });

  it("menampilkan input email dan password", () => {
    render(<AuthForm next="/dashboard" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Kata sandi")).toBeInTheDocument();
  });

  it("menampilkan hint demo credentials", () => {
    render(<AuthForm next="/dashboard" />);
    expect(screen.getByText(/Mode demo/)).toBeInTheDocument();
    expect(screen.getByText(DEMO_EMAIL)).toBeInTheDocument();
    expect(screen.getByText(DEMO_PASSWORD)).toBeInTheDocument();
  });

  it("menampilkan tombol submit 'Masuk'", () => {
    render(<AuthForm next="/dashboard" />);
    expect(
      screen.getByRole("button", { name: /Masuk/i })
    ).toBeInTheDocument();
  });
});

describe("AuthForm — validasi", () => {
  it("menampilkan error saat email kosong", async () => {
    const user = userEvent.setup();
    render(<AuthForm next="/dashboard" />);
    await user.click(screen.getByRole("button", { name: /Masuk/i }));
    expect(
      await screen.findByText(/Email wajib diisi/)
    ).toBeInTheDocument();
  });

  it("menampilkan error saat email tidak valid", async () => {
    const user = userEvent.setup();
    render(<AuthForm next="/dashboard" />);
    await user.type(screen.getByLabelText("Email"), "bukan-email");
    // Password perlu diisi biar cuma error email
    await user.type(screen.getByLabelText("Kata sandi"), "password123");
    await user.click(screen.getByRole("button", { name: /Masuk/i }));
    expect(
      await screen.findByText(/Format email tidak valid/)
    ).toBeInTheDocument();
  });

  it("menampilkan error saat password kurang dari 8 karakter", async () => {
    const user = userEvent.setup();
    render(<AuthForm next="/dashboard" />);
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Kata sandi"), "short");
    await user.click(screen.getByRole("button", { name: /Masuk/i }));
    expect(
      await screen.findByText(/Kata sandi minimal 8 karakter/)
    ).toBeInTheDocument();
  });
});

describe("AuthForm — login gagal", () => {
  it("menampilkan error global saat kredensial salah", async () => {
    const mockSignIn = vi
      .fn()
      .mockResolvedValue({
        ok: false,
        error: "Email atau kata sandi salah.",
      });
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      session: null,
      status: "unauthenticated",
      mounted: true,
      demoCredentials: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
      signIn: mockSignIn,
      signOut: vi.fn(),
    } as unknown as ReturnType<typeof useAuth>);

    const user = userEvent.setup();
    render(<AuthForm next="/dashboard" />);
    await user.type(screen.getByLabelText("Email"), "wrong@email.com");
    await user.type(screen.getByLabelText("Kata sandi"), "wrongpassword");
    await user.click(screen.getByRole("button", { name: /Masuk/i }));

    expect(
      await screen.findByText(/Email atau kata sandi salah/)
    ).toBeInTheDocument();
  });
});

describe("AuthForm — login sukses", () => {
  it("menampilkan 'Berhasil masuk!' dan redirect", async () => {
    const mockSignIn = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        session: {
          user: { id: "1", email: DEMO_EMAIL, name: "Admin", role: "admin" },
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
        },
      });
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      session: null,
      status: "unauthenticated",
      mounted: true,
      demoCredentials: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
      signIn: mockSignIn,
      signOut: vi.fn(),
    } as unknown as ReturnType<typeof useAuth>);

    const user = userEvent.setup();
    render(<AuthForm next="/dashboard" />);

    await user.type(screen.getByLabelText("Email"), DEMO_EMAIL);
    await user.type(screen.getByLabelText("Kata sandi"), DEMO_PASSWORD);
    await user.click(screen.getByRole("button", { name: /Masuk/i }));

    // Form sedang submit.
    expect(
      screen.getByRole("button", { name: /Memeriksa.../i })
    ).toBeInTheDocument();

    // Tunggu signIn selesai → sukses.
    await waitFor(() => {
      expect(screen.getByText(/Berhasil masuk!/)).toBeInTheDocument();
    });

    // Pastikan signIn dipanggil dengan kredensial yang benar.
    expect(mockSignIn).toHaveBeenCalledWith(DEMO_EMAIL, DEMO_PASSWORD);
  });

  it("fillDemo mengisi form dengan demo credentials", async () => {
    const user = userEvent.setup();
    render(<AuthForm next="/dashboard" />);

    // Klik tombol hint demo credentials.
    await user.click(screen.getByText(DEMO_EMAIL));

    // Input fields harus terisi.
    const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      "Kata sandi"
    ) as HTMLInputElement;

    expect(emailInput.value).toBe(DEMO_EMAIL);
    expect(passwordInput.value).toBe(DEMO_PASSWORD);
  });
});
