import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useCreateAccountMutation } from '../../../store/services/listAkunApi';
import { useGetListRoleQuery } from '../../../store/services/listRoleApi';
import { GetListRoleItem } from '../../../store/services/types';

const AddAkun = () => {
    const [createAccount, results] = useCreateAccountMutation();
    const { data } = useGetListRoleQuery(undefined);
    const dataListRole: GetListRoleItem[] = useMemo(() => {
        return (data?.data?.resource || []) as GetListRoleItem[];
    }, [data]);

    const [input, setInput] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role_id: 0,
    });
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateAccount = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                name: input.name,
                username: input.username,
                email: input.email,
                password: input.password,
                role_id: input.role_id,
            };
            await createAccount(body);
        } catch (err) {}
    };


    useEffect(() => {
        if (results.isSuccess) {
            navigate('/akun/akun/list_akun');
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Akun" basePath="akun/list_akun" sub="List Akun" subPath="akun/list_akun" current="Add Akun" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Add Akun</h5>
                <form className="w-[400px]" onSubmit={handleCreateAccount}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="name" onChange={handleInputChange} value={input.name} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="roleSelect" className="text-[15px] font-semibold whitespace-nowrap">
                            Role :
                        </label>
                        <select id="roleSelect" className="form-select w-[250px]" required name="role_id" onChange={handleInputChange} value={input.role_id}>
                            <option value="">
                                Pilih Role
                            </option>
                            {dataListRole.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.role_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="username" className="text-[15px] font-semibold whitespace-nowrap">
                            Username :
                        </label>
                        <input id="username" type="text" className="form-input w-[250px]" required name="username" onChange={handleInputChange} value={input.username} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                            Email :
                        </label>
                        <input id="email" type="text" className="form-input w-[250px]" required name="email" onChange={handleInputChange} value={input.email} />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-[15px] font-semibold whitespace-nowrap">
                            Password :
                        </label>
                        <input id="password" type="text" className="form-input w-[250px]" required name="password" onChange={handleInputChange} value={input.password} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddAkun;
