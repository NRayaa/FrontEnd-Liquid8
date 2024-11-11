import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useUpdatedWarehouseMutation } from '../../../../store/services/palletApi';

const DetailWarehouse = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updatedWarehouse, results] = useUpdatedWarehouseMutation();

    const [input, setInput] = useState({
        nama: state?.nama,
        alamat: state?.alamat,
        provinsi: state?.provinsi,
        kota: state?.kota,
        kabupaten: state?.kabupaten,
        kecamatan: state?.kecamatan,
        no_hp: state?.no_hp,
        latitude: state?.latitude,
        longitude: state?.kota,
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
                nama: input.nama,
                alamat: input.alamat,
                provinsi: input.provinsi,
                kota: input.kota,
                kabupaten: input.kabupaten,
                kecamatan: input?.kecamatan,
                no_hp: input?.no_hp,
                latitude: input?.latitude,
                longitude: input?.kota,
            };
            await updatedWarehouse({ id, body });
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/warehouse');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Warehouse" basePath="/storage/warehouse/" sub="List Warehouse" subPath="/storage/warehouse/" current="Detail Warehouse" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Warehouse</h5>
                    <Link to="/storage/warehouse/">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleUpdateBuyer}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="nama" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="nama" type="text" className="form-input w-[250px]" required name="nama" onChange={handleInputChange} value={input.nama} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="alamat" className="text-[15px] font-semibold whitespace-nowrap">
                            Alamat :
                        </label>
                        <input id="alamat" type="text" className="form-input w-[250px]" required name="alamat" onChange={handleInputChange} value={input.alamat} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="provinsi" className="text-[15px] font-semibold whitespace-nowrap">
                            Provinsi :
                        </label>
                        <input id="provinsi" type="text" className="form-input w-[250px]" required name="provinsi" onChange={handleInputChange} value={input.provinsi} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="kota" className="text-[15px] font-semibold whitespace-nowrap">
                            Kota :
                        </label>
                        <input id="kota" type="text" className="form-input w-[250px]" required name="kota" onChange={handleInputChange} value={input.kota} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="kabupaten" className="text-[15px] font-semibold whitespace-nowrap">
                            Kabupaten :
                        </label>
                        <input id="kabupaten" type="text" className="form-input w-[250px]" required name="kabupaten" onChange={handleInputChange} value={input.kabupaten} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="kecamatan" className="text-[15px] font-semibold whitespace-nowrap">
                            Kecamatan :
                        </label>
                        <input id="kecamatan" type="text" className="form-input w-[250px]" required name="kecamatan" onChange={handleInputChange} value={input.kecamatan} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="no_hp" className="text-[15px] font-semibold whitespace-nowrap">
                            No HP :
                        </label>
                        <input id="no_hp" type="text" className="form-input w-[250px]" required name="no_hp" onChange={handleInputChange} value={input.no_hp} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="latitude" className="text-[15px] font-semibold whitespace-nowrap">
                            Latitude :
                        </label>
                        <input id="latitude" type="text" className="form-input w-[250px]" required name="latitude" onChange={handleInputChange} value={input.latitude} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="longitude" className="text-[15px] font-semibold whitespace-nowrap">
                            Longitude :
                        </label>
                        <input id="longitude" type="text" className="form-input w-[250px]" required name="longitude" onChange={handleInputChange} value={input.longitude} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default DetailWarehouse;
