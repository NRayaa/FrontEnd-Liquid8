import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useCreateAccountMutation } from '../../../store/services/listAkunApi';
import { useGetListRoleQuery } from '../../../store/services/listRoleApi';
import { GetListRoleItem } from '../../../store/services/types';
import toast from 'react-hot-toast';

const AddBuyer = () => {
    const [createAccount, results] = useCreateAccountMutation();
    const { data } = useGetListRoleQuery(undefined);
    // const dataListRole: GetListRoleItem[] = useMemo(() => {
    //     return (data?.data?.resource || []) as GetListRoleItem[];
    // }, [data]);

    // const [input, setInput] = useState({
    //     name: '',
    //     username: '',
    //     email: '',
    //     password: '',
    //     role_id: 0,
    // });
    // const navigate = useNavigate();

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     setInput((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    // const handleCreateAccount = async (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     try {
    //         const body = {
    //             name: input.name,
    //             username: input.username,
    //             email: input.email,
    //             password: input.password,
    //             role_id: input.role_id,
    //         };
    //         await createAccount(body);
    //     } catch (err) {}
    // };

    // useEffect(() => {
    //     if (results.isSuccess) {
    //         toast.success(results.data.data.message);
    //         navigate('/akun/akun/list_akun');
    //     } else if (results.isError) {
    //         toast.error(results.data.data.message);
    //     }
    // }, [results]);

    return (
        <>
            <BreadCrumbs base="Buyer" basePath="/buyer/buyer/list_buyer" sub="List Buyer" subPath="/buyer/buyer/list_buyer" current="Add Buyer" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Add Akun</h5>
                <form className="w-[400px]">
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]"  />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="username" className="text-[15px] font-semibold whitespace-nowrap">
                            No. Hp :
                        </label>
                        <input id="username" type="text" className="form-input w-[250px]"/>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Alamat :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBuyer;
