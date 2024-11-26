import React, { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateAccountPanelMutation, useGetListAkunQuery } from '../../../store/services/listAkunApi';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const AddAkunPanel = () => {
    const [createAccountPanel, results] = useCreateAccountPanelMutation();

    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleCreateAccountBarcode = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                format: input,
            };
            await createAccountPanel(body);
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            navigate('/akun/akun/list_akun_panel');
        } else if (results.isError) {
            toast.error(results.data?.data?.message);
        }
    }, [results]);

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

                <form className="w-[400px]" onSubmit={handleCreateAccountBarcode}>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="format_barcode" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode :
                        </label>
                        <input id="format_barcode" type="text" className="form-input w-[250px]" required name="format_barcode" onChange={(e) => setInput(e.target.value)} value={input} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddAkunPanel;
