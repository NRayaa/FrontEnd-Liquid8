import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useUpdatedVehicleMutation } from '../../../../store/services/palletApi';

const DetailKendaraan = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updateVehicle, results] = useUpdatedVehicleMutation();

    const [input, setInput] = useState({
        vehicle_name: state?.vehicle_name,
        cargo_length: state?.cargo_length,
        cargo_height: state?.cargo_height,
        cargo_width: state?.cargo_width,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateBuyer = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { id } = params;
            const body = {
                vehicle_name: input.vehicle_name,
                cargo_length: input.cargo_length,
                cargo_height: input.cargo_height,
                cargo_width: input.cargo_width,
            };
            await updateVehicle({ id, body });
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/kendaraan');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Kendaraan" basePath="/storage/kendaraan/" sub="List Kendaraan" subPath="/storage/kendaraan/" current="Detail Kendaraan" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Kendaraan</h5>
                    <Link to="/storage/kendaraan/">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleUpdateBuyer}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="vehicle_name" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="vehicle_name" type="text" className="form-input w-[250px]" required name="vehicle_name" onChange={handleInputChange} value={input.vehicle_name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="cargo_length" className="text-[15px] font-semibold whitespace-nowrap">
                            Panjang :
                        </label>
                        <input id="cargo_length" type="text" className="form-input w-[250px]" required name="cargo_length" onChange={handleInputChange} value={input.cargo_length} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="cargo_height" className="text-[15px] font-semibold whitespace-nowrap">
                            Tinggi :
                        </label>
                        <input id="cargo_height" type="text" className="form-input w-[250px]" required name="cargo_height" onChange={handleInputChange} value={input.cargo_height} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="cargo_width" className="text-[15px] font-semibold whitespace-nowrap">
                            Lebar :
                        </label>
                        <input id="cargo_width" type="text" className="form-input w-[250px]" required name="cargo_width" onChange={handleInputChange} value={input.cargo_width} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default DetailKendaraan;
