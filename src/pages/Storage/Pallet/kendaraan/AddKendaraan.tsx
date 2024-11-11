import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useAddVehicleMutation } from '../../../../store/services/palletApi';

const AddKendaraan = () => {
    const navigate = useNavigate();
    const [createVehicle, results] = useAddVehicleMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [input, setInput] = useState({
        vehicle_name: '',
        cargo_length: '',
        cargo_height: '',
        cargo_width: '',
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
                vehicle_name: input.vehicle_name,
                cargo_length: input.cargo_length,
                cargo_height: input.cargo_height,
                cargo_width: input.cargo_width,
            };
            await createVehicle(body);
        } catch (err) {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/kendaraan');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
            setIsSubmitting(false);
        }
    }, [results, navigate]);

    return (
        <>
            <BreadCrumbs base="Kendaraan" basePath="/storage/kendaraan/" sub="List Kendaraan" subPath="/storage/kendaraan/" current="Add Kendaraan" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Add Kendaraan</h5>
                    <Link to="/storage/kendaraan/">
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
                        <input id="categoryName" type="text" className="form-input w-[250px]" name="vehicle_name" onChange={handleInputChange} value={input.vehicle_name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Panjang :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" name="cargo_height" onChange={handleInputChange} value={input.cargo_height} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="username" className="text-[15px] font-semibold whitespace-nowrap">
                            Tinggi :
                        </label>
                        <input id="username" type="text" className="form-input w-[250px]" name="cargo_length" onChange={handleInputChange} value={input.cargo_length} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="cargo_width" className="text-[15px] font-semibold whitespace-nowrap">
                            Lebar :
                        </label>
                        <input id="cargo_width" type="text" className="form-input w-[250px]" name="cargo_width" onChange={handleInputChange} value={input.cargo_width} />
                    </div>

                    <button type="submit" className="btn btn-primary mt-4 px-16" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddKendaraan;
