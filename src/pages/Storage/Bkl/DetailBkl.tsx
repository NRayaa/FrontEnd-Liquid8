import React, { useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useParams } from 'react-router-dom';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { useGetDetailBklQuery } from '../../../store/services/bklApi';
import { formatRupiah } from '../../../helper/functions';

const DetailBkl = () => {
    const { id } = useParams();
    const { data, isSuccess, isError } = useGetDetailBklQuery(id);

    const dataBklProduct: any = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);

    const [bklDetails, setBklDetails] = useState({
        old_barcode_product: '',
        new_barcode_product: '',
        new_name_product: '',
        new_price_product: '',
        old_price_product: '',
        days_since_created:''
    });

    useEffect(() => {
        if (isSuccess && data) {
            setBklDetails({
                old_barcode_product: dataBklProduct.old_barcode_product || '',
                new_barcode_product: dataBklProduct.new_barcode_product || '',
                new_name_product: dataBklProduct.new_name_product || '',
                new_price_product: dataBklProduct.new_price_product || '',
                old_price_product: dataBklProduct.old_price_product || '',
                days_since_created: dataBklProduct.days_since_created || ''
            });
        }
    }, [isSuccess, data]);

    if (isError) {
        return <div>Error loading BKL details</div>;
    }

    return (
        <>
            <BreadCrumbs base="Home" basePath="/" sub="List BKL" subPath="/storage/expired_product/list_bkl" current="Detail BKL" />
            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Detail BKL</h5>
                    <Link to="/storage/expired_product/list_bkl">
                        <button type="button" className="px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]">
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="old_barcode_product" className="text-[15px] font-semibold whitespace-nowrap">
                            Old Barcode :
                        </label>
                        <input 
                            id="old_barcode_product" 
                            type="text" 
                            className="form-input w-[250px]" 
                            required 
                            name="old_barcode_product" 
                            value={bklDetails.old_barcode_product} 
                            onChange={(e) => setBklDetails({ ...bklDetails, old_barcode_product: e.target.value })} 
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="new_barcode_product" className="text-[15px] font-semibold whitespace-nowrap">
                            New Barcode :
                        </label>
                        <input 
                            id="new_barcode_product" 
                            type="text" 
                            className="form-input w-[250px]" 
                            required 
                            name="new_barcode_product" 
                            value={bklDetails.new_barcode_product} 
                            onChange={(e) => setBklDetails({ ...bklDetails, new_barcode_product: e.target.value })} 
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="new_name_product" className="text-[15px] font-semibold whitespace-nowrap">
                            Name BKL :
                        </label>
                        <input 
                            id="new_name_product" 
                            type="text" 
                            className="form-input w-[250px]" 
                            required 
                            name="new_name_product" 
                            value={bklDetails.new_name_product} 
                            onChange={(e) => setBklDetails({ ...bklDetails, new_name_product: e.target.value })} 
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="old_price_product" className="text-[15px] font-semibold whitespace-nowrap">
                            Old Price :
                        </label>
                        <input 
                            id="old_price_product" 
                            type="text" 
                            className="form-input w-[250px]" 
                            required 
                            name="old_price_product" 
                            value={formatRupiah(bklDetails.old_price_product)} 
                            onChange={(e) => setBklDetails({ ...bklDetails, old_price_product: e.target.value })} 
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="new_price_product" className="text-[15px] font-semibold whitespace-nowrap">
                            New Price :
                        </label>
                        <input 
                            id="new_price_product" 
                            type="text" 
                            className="form-input w-[250px]" 
                            required 
                            name="new_price_product" 
                            value={formatRupiah(bklDetails.new_price_product)} 
                            onChange={(e) => setBklDetails({ ...bklDetails, new_price_product: e.target.value })} 
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="days_since_created" className="text-[15px] font-semibold whitespace-nowrap">
                            Lama Barang :
                        </label>
                        <input 
                            id="days_since_created" 
                            type="text" 
                            className="form-input w-[250px]" 
                            required 
                            name="days_since_created" 
                            value={bklDetails.days_since_created} 
                            onChange={(e) => setBklDetails({ ...bklDetails, days_since_created: e.target.value })} 
                        />
                    </div>
                </form>
            </div>
        </>
   

    );
};

export default DetailBkl;
