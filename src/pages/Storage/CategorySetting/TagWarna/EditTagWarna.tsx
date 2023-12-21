import React from 'react';
import { BreadCrumbs } from '../../../../components';

const EditTagWarna = () => {
    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/storage/product" current="Edit Tag Warna" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail Tag Warna</h5>
                <form className="w-[400px]">
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Tag Warna :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Warna :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Range Harga:
                        </label>
                        <div className="flex items-center ms-14">
                            <input id="categoryName" type="text" className="form-input w-[250px]" required />
                            <span className="px-6">-</span>
                            <input id="categoryName" type="text" className="form-input w-[250px]" required />
                        </div>
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Fixed Price :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Edit
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditTagWarna;
