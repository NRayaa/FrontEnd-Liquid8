import React, { ChangeEvent, useEffect, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { useUpdateDestinationMutation } from '../../../store/services/migrateApi';

const EditDestination = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updateAccount, results] = useUpdateDestinationMutation();

    const [input, setInput] = useState({
        shop_name: state?.shop_name,
        phone_number: state?.phone_number,
        alamat: state?.alamat,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateAccount = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { id } = params;
            const body = {
                shop_name: input.shop_name,
                phone_number: input.phone_number,
                alamat: input.alamat,
            };
            await updateAccount({ id, body });
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/outbound/migrate/list_destination');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Destination" basePath="/outbound/migrate/list_destination" sub="List Destination" subPath="/outbound/migrate/list_destination" current="Edit Destination" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Edit Destination</h5>
                    <Link to="/outbound/migrate/list_destination">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleUpdateAccount}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="shop_name" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Toko :
                        </label>
                        <input id="shop_name" type="text" className="form-input w-[250px]" required name="shop_name" onChange={handleInputChange} value={input.shop_name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="phone_number" className="text-[15px] font-semibold whitespace-nowrap">
                            Phone Toko :
                        </label>
                        <input id="phone_number" type="text" className="form-input w-[250px]" required name="phone_number" onChange={handleInputChange} value={input.phone_number} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="alamat" className="text-[15px] font-semibold whitespace-nowrap">
                            Alamat Toko :
                        </label>
                        <input id="alamat" type="text" className="form-input w-[250px]" required name="alamat" onChange={handleInputChange} value={input.alamat} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditDestination;
