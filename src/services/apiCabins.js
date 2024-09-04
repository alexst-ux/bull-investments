import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("error function getCabins()", error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl) ?? false;

  const imageName = hasImagePath
    ? ""
    : `${Math.random() * 1000}-${newCabin.image.name.replaceAll("/", "")}`;

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // 1) Create a cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error("error function createEditCabin ", error);
    throw new Error("Cabin could not be created");
  }

  if (!hasImagePath) {
    //2) upload an image
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error("error Cabin image could not be uploaded ", storageError);
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error("Cabin image could not be uploaded");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("error function deleteCabin()", error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
