import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUpdatedBuyerMutation } from '../../../../store/services/buyerApi';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';

const DetailKendaraan = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updateBuyer, results] = useUpdatedBuyerMutation();

    const [input, setInput] = useState({
        name_buyer: state?.name_buyer,
        phone_buyer: state?.phone_buyer,
        address_buyer: state?.address_buyer,
        amount_transaction_buyer: state?.amount_transaction_buyer,
        amount_purchase_buyer: state?.amount_purchase_buyer,
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
                name_buyer: input.name_buyer,
                phone_buyer: input.phone_buyer,
                address_buyer: input.address_buyer,
                amount_transaction_buyer: input.amount_transaction_buyer,
                amount_purchase_buyer: input.amount_purchase_buyer,
            };
            await updateBuyer({ id, body });
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            navigate('/buyer/buyer/list_buyer');
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
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="name_buyer" onChange={handleInputChange} value={input.name_buyer} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Panjang :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" required name="address_buyer" onChange={handleInputChange} value={input.address_buyer} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Tinggi :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" required name="address_buyer" onChange={handleInputChange} value={input.address_buyer} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Lebar :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" required name="address_buyer" onChange={handleInputChange} value={input.address_buyer} />
                    </div>
                    {/* <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button> */}
                </form>
            </div>
        </>
    );
};

export default DetailKendaraan;
