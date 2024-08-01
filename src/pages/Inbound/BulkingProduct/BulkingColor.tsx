import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import toast from 'react-hot-toast';
import { useAddBulkingColorMutation } from '../../../store/services/productOldsApi';

const BulkingColor = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [addBulkingProduct, { isLoading }] = useAddBulkingColorMutation();

    useEffect(() => {
        dispatch(setPageTitle('Data Input'));
    }, [dispatch]);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await addBulkingProduct(formData).unwrap();
            toast.success(response?.data?.message || 'File uploaded successfully');
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else {
                toast.error('File upload failed');
            }
        }
    };

    return (
        <div>
            {/* breadcrumbs */}
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Inbound
                    </Link>
                </li>
                <li>
                    <Link to="#" className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        Bulking Product
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Bulking Color</span>
                </li>
            </ul>
            {/* end breadcrumbs */}
            <div className="flex gap-4 mt-6">
                <div className="w-1/2">
                    <input
                        onChange={handleFileChange}
                        id="ctnFile"
                        type="file"
                        name="file"
                        accept=".xlsx, .xls"
                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                        required
                    />
                </div>
                <button type="button" onClick={handleSubmit} className="btn btn-primary px-16" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default BulkingColor;