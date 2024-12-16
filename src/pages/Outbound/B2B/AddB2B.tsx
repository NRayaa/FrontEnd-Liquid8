import React, { ChangeEvent, useEffect, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { useAddB2BMutation } from '../../../store/services/b2bApi';

const AddB2B = () => {
    const navigate = useNavigate();
    const [createB2B, results] = useAddB2BMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [input, setInput] = useState({
        name_buyer: '',
        phone_buyer: '',
        address_buyer: '',
        upload_file: null as File | null,
        discount: '',
        afterprice: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            // Check for null and length
            setInput((prevState) => ({
                ...prevState,
                upload_file: files[0],
            }));
        }
    };

    const handleCreateB2B = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('file_import', input.upload_file as File);
            formData.append('discount_bulky', input.discount);
            formData.append('after_price_bulky', input.afterprice);

            await createB2B(formData);
        } catch (err) {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/b2b/b2b/list_b2b');
        } else if (results.isError) {
            if ('status' in results.error) {
                const errorData = (results.error as { data?: { data?: { message: string } } }).data; 
                toast.error(errorData?.data?.message || 'An error occurred');
            } else {
                toast.error('An unexpected error occurred');
            }
            setIsSubmitting(false);
        }
    }, [results, navigate]);
    console.log('result', results);

    return (
        <>
            <BreadCrumbs base="B2B" basePath="/b2b/b2b/list_b2b" sub="List B2B" subPath="/b2b/b2b/list_b2b" current="Add B2B" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Add B2B</h5>
                    <Link to="/b2b/b2b/list_b2b">
                        <button type="button" className="px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleCreateB2B}>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="upload_file" className="text-[15px] font-semibold whitespace-nowrap">
                            Upload File :
                        </label>
                        <input
                            onChange={handleFileChange}
                            id="ctnFile"
                            type="file"
                            name="file"
                            accept=".xlsx, .xls"
                            className="w-[250px] form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="discount" className="text-[15px] font-semibold whitespace-nowrap">
                            Discount :
                        </label>
                        <input id="discount" type="text" className="form-input w-[250px]" name="discount" onChange={handleInputChange} value={input.discount} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="afterprice" className="text-[15px] font-semibold whitespace-nowrap">
                            Afterprice :
                        </label>
                        <input id="afterprice" type="text" className="form-input w-[250px]" name="afterprice" onChange={handleInputChange} value={input.afterprice} />
                    </div>

                    <button type="submit" className="btn btn-primary mt-4 px-16" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddB2B;
