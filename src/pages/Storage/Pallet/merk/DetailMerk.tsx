import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUpdatedBuyerMutation } from '../../../../store/services/buyerApi';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useUpdatedMerkMutation } from '../../../../store/services/palletApi';

const DetailMerk = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updateMerk, results] = useUpdatedMerkMutation();

    const [input, setInput] = useState({
        brand_name: state?.brand_name,
        brand_slug: state?.brand_slug,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateMerk = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { id } = params;
            const body = {
                brand_name: input.brand_name,
                brand_slug: input.brand_slug,
            };
            await updateMerk({ id, body });
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/merk');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Merk" basePath="/storage/merk/" sub="List Merk" subPath="/storage/merk/" current="Detail Merk" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Merk</h5>
                    <Link to="/storage/merk/">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleUpdateMerk}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="brand_name" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="brand_name" type="text" className="form-input w-[250px]" required name="brand_name" onChange={handleInputChange} value={input.brand_name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="brand_slug" className="text-[15px] font-semibold whitespace-nowrap">
                            Slug :
                        </label>
                        <input id="brand_slug" type="text" className="form-input w-[250px]" required name="brand_slug" onChange={handleInputChange} value={input.brand_slug} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default DetailMerk;
