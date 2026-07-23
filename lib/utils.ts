/**
 * Menggabungkan className secara kondisional.
 * Menyaring nilai falsy dan menggabungkan sisanya dengan spasi.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
