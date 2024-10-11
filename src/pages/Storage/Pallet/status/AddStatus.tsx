import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useAddStatusMutation } from '../../../../store/services/palletApi';

const AddStatus = () => {
    const navigate = useNavigate();
    const [createBuyer, results] = useAddStatusMutation();
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const [input, setInput] = useState({
        status_name: '',
        status_slug: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateBuyer = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const body = {
                status_name: input.status_name,
                status_slug: input.status_slug,
            };
            await createBuyer(body);
        } catch (err) {
            setIsSubmitting(false); 
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/status');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
            setIsSubmitting(false); 
        }
    }, [results, navigate]);

    return (
        <>
            <BreadCrumbs base="Status" basePath="/storage/status" sub="List Status" subPath="/storage/status" current="Add Status" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Add Status</h5>
                    <Link to="/storage/status/">
                        <button type="button" className="px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleCreateBuyer}>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" name="status_name" onChange={handleInputChange} value={input.status_name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="slug" className="text-[15px] font-semibold whitespace-nowrap">
                            Slug :
                        </label>
                        <input id="slug" type="text" className="form-input w-[250px]" name="status_slug" onChange={handleInputChange} value={input.status_slug} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddStatus;
