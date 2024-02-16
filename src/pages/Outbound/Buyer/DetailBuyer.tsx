import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUpdateAccountMutation } from '../../../store/services/listAkunApi';
import { useGetListRoleQuery } from '../../../store/services/listRoleApi';
import { GetListRoleItem } from '../../../store/services/types';
import toast from 'react-hot-toast';

const DetailBuyer = () => {
    const { state } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [updateAccount, results] = useUpdateAccountMutation();
    const { data } = useGetListRoleQuery(undefined);
    const dataListRole: GetListRoleItem[] = useMemo(() => {
        return (data?.data?.resource || []) as GetListRoleItem[];
    }, [data]);

    const [input, setInput] = useState({
        name: state?.name,
        username: state?.username,
        email: state?.email,
        password: state?.password,
        role_id: state?.role_id,
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
                name: input.name,
                username: input.username,
                email: input.email,
                password: input.password,
                role_id: input.role_id,
            };
            await updateAccount({id, body});
            toast.success('Success update account');
        } catch (err) {}
    };


    useEffect(() => {
        if (results.isSuccess) {
            navigate('/buyer/buyer/list_buyer');
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Buyer" basePath="/buyer/buyer/list_buyer" sub="List Buyer" subPath="/buyer/buyer/list_buyer" current="Add Akun" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Buyer</h5>
                <form className="w-[400px]" onSubmit={handleUpdateAccount}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="name" onChange={handleInputChange} value={input.name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="username" className="text-[15px] font-semibold whitespace-nowrap">
                            No. Hp :
                        </label>
                        <input id="username" type="text" className="form-input w-[250px]" required name="username" onChange={handleInputChange} value={input.username} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Alamat :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" required name="email" onChange={handleInputChange} value={input.email} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default DetailBuyer;
