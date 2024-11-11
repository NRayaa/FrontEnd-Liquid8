import React, { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCreateAccountPanelMutation, useShowAccountPanelQuery } from '../../../store/services/listAkunApi';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const AddAkunPanel = () => {
    const params = useParams();
    const [updateAccountPanel, results] = useCreateAccountPanelMutation();
    const { data: detail, refetch } = useShowAccountPanelQuery(params.id);

    const dataDetailAccount: any = useMemo(() => {
        return detail?.data.resource;
    }, [detail]);

    const [input, setInput] = useState({
        name: '',
        user_id: '',
        format_barcode: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateAccountBarcode = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                user_id: input.user_id,
                format_barcode: input.format_barcode,
            };
            await updateAccountPanel(body);
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
            navigate('/akun/akun/list_akun_panel');
        } else if (results.isError) {
            toast.error(results.data?.data?.message);
        }
    }, [results]);

    useEffect(() => {
        if (dataDetailAccount) {
            setInput({
                name: dataDetailAccount.name,
                user_id: dataDetailAccount.user_id,
                format_barcode: dataDetailAccount.format_barcode,
            });
        }
    }, [dataDetailAccount]);

    return (
        <>
            <BreadCrumbs base="Home" basePath="/" sub="List Barcode Akun" subPath="/akun/akun/list_akun_panel" current="Add Akun" />
            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Add Barcode Akun</h5>
                    <Link to="/akun/akun/list_akun_panel">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleUpdateAccountBarcode}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="userId" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <button className="form-input w-[250px] justify-between flex items-center capitalize disabled:cursor-not-allowed" disabled type="button">
                            {input.name}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="format_barcode" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode :
                        </label>
                        <input id="format_barcode" type="text" className="form-input w-[250px]" required name="format_barcode" onChange={handleInputChange} value={input.format_barcode} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddAkunPanel;
