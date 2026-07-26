// Nantinya fungsi ini akan diganti dengan implementasi asli NextAuth / Supabase Auth
export async function getSession() {
  return {
    user: {
      id: "mock-user-id", // ID fiktif untuk tahap ini
      name: "Rizka Aflah" // Nama fiktif
    }
  };
}
