import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUpdatedBuyerMutation } from '../../../../store/services/buyerApi';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useUpdatedKondisiMutation } from '../../../../store/services/palletApi';

const DetailKondisi = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updateKondisi, results] = useUpdatedKondisiMutation();

    const [input, setInput] = useState({
        condition_name: state?.condition_name,
        condition_slug: state?.condition_slug,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateKondisi = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { id } = params;
            const body = {
                condition_name: input.condition_name,
                condition_slug: input.condition_slug,
            };
            await updateKondisi({ id, body });
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/kondisi');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Kondisi" basePath="/storage/kondisi/" sub="List Kondisi" subPath="/storage/kondisi/" current="Detail Kondisi" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Kondisi</h5>
                    <Link to="/storage/kondisi/">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleUpdateKondisi}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="condition_name" onChange={handleInputChange} value={input.condition_name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="condition_slug" className="text-[15px] font-semibold whitespace-nowrap">
                            Slug :
                        </label>
                        <input id="condition_slug" type="text" className="form-input w-[250px]" required name="condition_slug" onChange={handleInputChange} value={input.condition_slug} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default DetailKondisi;
