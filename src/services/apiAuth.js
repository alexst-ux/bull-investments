import supabasePromise from "./supabase";

export async function login({ email, password }) {
  const supabase = await supabasePromise;
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("Error login check", {
      cause: error.message,
    });
  }

  return data?.user;
}

export async function getCurrentUser() {
  const supabase = await supabasePromise;
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error && error.message !== "Auth session missing!") {
    throw new Error("Error get currect user", {
      cause: error.message,
    });
  }

  return data?.user;
}

export async function logout() {
  const supabase = await supabasePromise;
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Error logout", {
      cause: error.message,
    });
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. update pswd or fullname
  let updateData;
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }

  const supabase = await supabasePromise;
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error("Error updateCurrentUser", {
      cause: error.message,
    });
  }

  if (!avatar) return data;

  // 2. upload avatar img
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error("Error upload the avatar", {
      cause: storageError.message,
    });
  }

  // 3. update the avatar in the user
  const { data: updatedUser, error: errorUpd } = await supabase.auth.updateUser(
    {
      data: {
        avatar: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/avatars/${fileName}`,
      },
    }
  );

  if (errorUpd)
    throw new Error("Error update user avatar", {
      cause: errorUpd.message,
    });

  return updatedUser;
}
