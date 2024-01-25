import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import IconNotesEdit from '../../../components/Icon/IconNotesEdit';
import IconSend from '../../../components/Icon/IconSend';
import Swal from 'sweetalert2';
const showAlert = async (type: number) => {
    if (type === 11) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                popup: 'sweet-alerts',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
                padding: '2em',
            })
            .then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                }
            });
    }
    if (type === 15) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Berhasil Ditambah',
            padding: '10px 20px',
        });
    }
    if (type == 20) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Data Berhasil Ditambah',
            padding: '10px 20px',
        });
    }
};
const Kasir = () => {
    const navigate = useNavigate();
    return (
        <>
            <BreadCrumbs base="Outbound" basePath="outbound/sales" sub="Sales" subPath="/" current="Cashier" />
            <div className="panel mt-6 min-h-[450px] pr-12">
                <div className="mb-8">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-2">Sale Cashier</h5>
                    {/* <div className="mb-4 flex justify-between">
                        <button type="button" className="btn-lg btn-primary uppercase px-6 rounded-md">
                            MIGRATE
                        </button>
                    </div> */}
                    
                </div>
                <div className="relative w-[220px]">
                    {/* <input
                        type="text"
                        className="mb-4 form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                        placeholder="Search..."
                    /> */}
                </div>
                <div className="grid grid-cols-3 space-x-6 items-end">
                <form className="w-[400px] cols-span-1 mb-4 ">
                        {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                BARCODE:
                            </label>
                            <input id="categoryName" type="text" value="LQDF5H012" className="mb-2 form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                TOTAL :
                            </label>
                            <input id="categoryName" type="text" value="Jakarta" placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                    </form>
                    <div className="datatables col-span-2">
                        <table className="panel text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        NO
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        BARCODE
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        NAME
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        QTY
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        PRICE
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        OPSI
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">1</td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        PLTFSH0001
                                    </th>
                                    <td className="px-6 py-4">Baju Fashion</td>
                                    <td className='px-6 py-4'>1</td>
                                    <td className="px-6 py-4">Rp 5.000.000,-</td>
                                    <td className="px-6 py-4 flex items-center space-x-2">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert(11)}>
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Kasir;
