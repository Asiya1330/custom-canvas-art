import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { uploadImage } from '../firebase/uploadImage';

const UploadComponent: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const { user } = useUser();
    console.log(`Uploadin`, user?.id);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file && user) {
            const url = await uploadImage(file, user?.id);
            console.log('File uploaded successfully. URL:', url);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default UploadComponent;
