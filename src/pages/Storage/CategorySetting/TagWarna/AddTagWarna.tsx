import React, { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { BreadCrumbs } from '../../../../components';
import { useCreateColorTagMutation } from '../../../../store/services/colorTagApi';
import { useNavigate } from 'react-router-dom';

const AddTagWarna = () => {
    const [createColorTag, results] = useCreateColorTagMutation();
    const [input, setInput] = useState({
        hexa_code_color: '',
        name_color: '',
        min_price_color: '',
        max_price_color: '',
        fixed_price_color: '',
    });
    const navigate = useNavigate();

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateTagColor = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const body = {
                hexa_code_color: input.hexa_code_color,
                name_color: input.name_color,
                min_price_color: input.min_price_color,
                max_price_color: input.max_price_color,
                fixed_price_color: input.fixed_price_color,
            };

            await createColorTag(body);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            navigate('/storage/categorysetting/tag_warna');
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/storage/product" current="Add Tag Warna" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Tag Warna</h5>
                <form className="w-[400px]" onSubmit={handleCreateTagColor}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Tag Warna :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="hexa_code_color" value={input.hexa_code_color} onChange={handleChangeInput} />
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Warna :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="name_color" value={input.name_color} onChange={handleChangeInput} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Range Harga:
                        </label>
                        <div className="flex items-center ms-14">
                            <input id="categoryName" type="text" className="form-input w-[250px]" required name="min_price_color" value={input.min_price_color} onChange={handleChangeInput} />
                            <span className="px-6">-</span>
                            <input id="categoryName" type="text" className="form-input w-[250px]" required name="max_price_color" value={input.max_price_color} onChange={handleChangeInput} />
                        </div>
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Fixed Price :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required name="fixed_price_color" value={input.fixed_price_color} onChange={handleChangeInput} />
                    </div>
                    <span className="text-[10px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddTagWarna;
