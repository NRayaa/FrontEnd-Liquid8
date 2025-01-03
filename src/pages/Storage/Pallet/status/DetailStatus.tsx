import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUpdatedBuyerMutation } from '../../../../store/services/buyerApi';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useUpdatedStatusMutation } from '../../../../store/services/palletApi';

const DetailStatus = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updateStatus, results] = useUpdatedStatusMutation();

    const [input, setInput] = useState({
        status_name: state?.status_name,
        status_slug: state?.status_slug,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateStatus = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { id } = params;
            const body = {
                status_name: input.status_name,
                status_slug: input.status_slug,
            };
            await updateStatus({ id, body });
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/status');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Status" basePath="/storage/status/" sub="List Status" subPath="/storage/status/" current="Detail Status" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Status</h5>
                    <Link to="/storage/status/">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleUpdateStatus}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="status_name" onChange={handleInputChange} value={input.status_name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="status_slug" className="text-[15px] font-semibold whitespace-nowrap">
                            Slug :
                        </label>
                        <input id="status_slug" type="text" className="form-input w-[250px]" required name="status_slug" onChange={handleInputChange} value={input.status_slug} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default DetailStatus;
