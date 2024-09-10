import supabasePromise from "./supabase";

export async function signup({ fullName, email, password }) {
  const supabase = await supabasePromise;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error("Error signup user", {
      cause: error.message,
    });
  }

  return data;
}
