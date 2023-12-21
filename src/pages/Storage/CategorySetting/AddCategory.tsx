import React from 'react';
import { BreadCrumbs } from '../../../components';

const AddCategory = () => {
    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/storage/product" current="Add Category" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Sub Category</h5>
                <form className="w-[400px]">
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Kategori :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Discount :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Max Price :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddCategory;
