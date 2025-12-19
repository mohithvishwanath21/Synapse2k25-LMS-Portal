export const fileUpload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_CODE);
  data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  data.append("resource_type", "raw"); // Important for PDFs/docs

  const res = await fetch(import.meta.env.VITE_CLOUDINARY_BASE_API_FILE_URL, {
    method: "POST",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const uploadedFileData = await res.json();

  // Always use secure_url for browser preview
  return {
    secure_url: uploadedFileData.secure_url,
    public_id: uploadedFileData.public_id,
  };
};

export const generateFileUrl = (publicId) => {
  return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload/fl_attachment/${publicId}`;
};

