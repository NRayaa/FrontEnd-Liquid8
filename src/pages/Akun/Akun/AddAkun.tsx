import React, { ChangeEvent, useEffect, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { useCreateCategoryMutation } from '../../../store/services/categoriesApi';
import { useNavigate } from 'react-router-dom';

const AddAkun = () => {
    // const [createCategory, results] = useCreateCategoryMutation();
    // const [input, setInput] = useState({
    //     name_category: '',
    //     discount_category: '',
    //     max_price_category: '',
    // });
    const navigate = useNavigate();

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setInput((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    // const handleCreateCategory = async (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     try {
    //         const body = {
    //             name_category: input.name_category,
    //             discount_category: input.discount_category,
    //             max_price_category: input.max_price_category,
    //         };
    //         await createCategory(body);
    //     } catch (err) {}
    // };

    // useEffect(() => {
    //     if (results.isSuccess) {
    //         navigate('/storage/categorysetting/sub_kategori');
    //     }
    // }, [results]);
    return (
        <>
            <BreadCrumbs base="Akun" basePath="akun/list_akun" sub="List Akun" subPath="akun/list_akun" current="Add Akun" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Add Akun</h5>
                <form className="w-[400px]">
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="name_category" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="roleSelect" className="text-[15px] font-semibold whitespace-nowrap">
                            Role :
                        </label>
                        <select id="roleSelect" className="form-select w-[250px]" required name="user_role">
                            <option value="" disabled selected>
                                Pilih Role
                            </option>
                            <option value="role1">Role 1</option>
                            <option value="role2">Role 2</option>
                            <option value="role3">Role 3</option>
                            <option value="role4">Role 4</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Username :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="max_price_category" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Email :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="max_price_category" />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Password :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="max_price_category" />
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
