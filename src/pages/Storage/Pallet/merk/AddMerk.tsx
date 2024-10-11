import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useAddMerkMutation } from '../../../../store/services/palletApi';

const AddMerk = () => {
    const navigate = useNavigate();
    const [createMerk, results] = useAddMerkMutation();
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const [input, setInput] = useState({
        brand_name: '',
        brand_slug: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateMerk = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const body = {
                brand_name: input.brand_name,
                brand_slug: input.brand_slug,
            };
            await createMerk(body);
        } catch (err) {
            setIsSubmitting(false); 
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/merk');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
            setIsSubmitting(false); 
        }
    }, [results, navigate]);

    return (
        <>
            <BreadCrumbs base="Merk" basePath="/merk/merk/list_merk" sub="List Merk" subPath="/merk/merk/list_merk" current="Add Merk" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Add Merk</h5>
                    <Link to="/storage/merk/">
                        <button type="button" className="px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleCreateMerk}>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="brand_name" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="brand_name" type="text" className="form-input w-[250px]" name="brand_name" onChange={handleInputChange} value={input.brand_name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="brand_slug" className="text-[15px] font-semibold whitespace-nowrap">
                            Slug :
                        </label>
                        <input id="brand_slug" type="text" className="form-input w-[250px]" name="brand_slug" onChange={handleInputChange} value={input.brand_slug} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddMerk;
