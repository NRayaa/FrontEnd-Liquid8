import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useAddWarehouseMutation } from '../../../../store/services/palletApi';

const AddWarehouse = () => {
    const navigate = useNavigate();
    const [createWarehouse, results] = useAddWarehouseMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [input, setInput] = useState({
        nama: '',
        alamat: '',
        provinsi: '',
        kota: '',
        kabupaten: '',
        kecamatan: '',
        no_hp: '',
        latitude: '',
        longitude: '',
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
                nama: input.nama,
                alamat: input.alamat,
                provinsi: input.provinsi,
                kota: input.kota,
                kabupaten: input.kabupaten,
                kecamatan: input.kecamatan,
                no_hp: input.no_hp,
                latitude: input.latitude,
                longitude: input.longitude,
            };
            await createWarehouse(body);
        } catch (err) {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/storage/warehouse');
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
            setIsSubmitting(false);
        }
    }, [results, navigate]);

    return (
        <>
            <BreadCrumbs base="Warehouse" basePath="/warehouse/warehouse/list_warehouse" sub="List Warehouse" subPath="/warehouse/warehouse/list_warehouse" current="Add Warehouse" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Add Warehouse</h5>
                    <Link to="/storage/warehouse/">
                        <button type="button" className="px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleCreateBuyer}>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="nama" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="nama" type="text" className="form-input w-[250px]" name="nama" onChange={handleInputChange} value={input.nama} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="alamat" className="text-[15px] font-semibold whitespace-nowrap">
                            Alamat :
                        </label>
                        <input id="alamat" type="text" className="form-input w-[250px]" name="alamat" onChange={handleInputChange} value={input.alamat} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="provinsi" className="text-[15px] font-semibold whitespace-nowrap">
                            Provinsi :
                        </label>
                        <input id="provinsi" type="text" className="form-input w-[250px]" name="provinsi" onChange={handleInputChange} value={input.provinsi} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="kota" className="text-[15px] font-semibold whitespace-nowrap">
                            Kota :
                        </label>
                        <input id="kota" type="text" className="form-input w-[250px]" name="kota" onChange={handleInputChange} value={input.kota} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="kabupaten" className="text-[15px] font-semibold whitespace-nowrap">
                            Kabupaten :
                        </label>
                        <input id="kabupaten" type="text" className="form-input w-[250px]" name="kabupaten" onChange={handleInputChange} value={input.kabupaten} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="kecamatan" className="text-[15px] font-semibold whitespace-nowrap">
                            Kecamatan :
                        </label>
                        <input id="kecamatan" type="text" className="form-input w-[250px]" name="kecamatan" onChange={handleInputChange} value={input.kecamatan} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="no_hp" className="text-[15px] font-semibold whitespace-nowrap">
                            No HP :
                        </label>
                        <input id="no_hp" type="text" className="form-input w-[250px]" name="no_hp" onChange={handleInputChange} value={input.no_hp} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="latitude" className="text-[15px] font-semibold whitespace-nowrap">
                            Latitude :
                        </label>
                        <input id="latitude" type="text" className="form-input w-[250px]" name="latitude" onChange={handleInputChange} value={input.latitude} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="longitude" className="text-[15px] font-semibold whitespace-nowrap">
                            Langitude :
                        </label>
                        <input id="longitude" type="text" className="form-input w-[250px]" name="longitude" onChange={handleInputChange} value={input.longitude} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddWarehouse;
