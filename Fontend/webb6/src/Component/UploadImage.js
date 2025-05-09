import React, { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState(null);

  // ฟังก์ชันจัดการเมื่อผู้ใช้เลือกไฟล์
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // ดึงไฟล์ที่เลือก
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // แปลงไฟล์เป็น base64 แล้วเก็บใน state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg bg-white">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 p-2 border rounded cursor-pointer"
      />
      {image && <img src={image} alt="Uploaded" className="w-64 h-auto rounded-lg shadow-md" />}
    </div>
  );
};

export default UploadImage;
