import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import IconPlus from '../../../components/Icon/IconPlus';
import { BklItem } from '../../../store/services/types';
import { formatRupiah } from '../../../helper/functions';
import { useDeleteProductBklMutation, useGetBklListQuery } from '../../../store/services/bklApi';

const ListBkl = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data, isSuccess, refetch } = useGetBklListQuery({ page, q: search });
    const [deleteBklProduct, results] = useDeleteProductBklMutation();

    const dataBklProduct: any = useMemo(() => {
        if (isSuccess) {
            return data.data.resource.data;
        }
    }, [data]);

    const totalBkl = isSuccess ? data.data.resource.total : 0;

    const showAlert = async ({ type, id }: { type: number; id: number | undefined }) => {
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
                .then(async (result) => {
                    if (result.value) {
                        await deleteBklProduct(id);
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
                title: 'Berhasil Dikirim',
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

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            const statusRes = 'status' in results.error ? results.error.status : 0;
            if (statusRes === 403) {
                toast.error('Your role is forbidden to access');
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [results]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Slow Moving Product</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>BKL</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">BKL</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5 w-full">
                    <div className="flex flex-col w-full">
                        <label className="font-bold">Total BKL</label>
                        <input
                            type="text"
                            className="form-input w-full mt-2"
                            placeholder="Total BKL"
                            value={totalBkl} 
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col w-full ltr:ml-auto rtl:mr-auto mx-6">
                        <label className="font-bold">Total Price BKL</label>
                        <input type="text" className="form-input w-full mt-2" placeholder="Total Price" />
                    </div>
                </div>

                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div>
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <Link to="/storage/expired_product/add_bkl">
                            <button className="btn btn-outline-info">
                                <IconPlus />
                                Add BKL
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        records={dataBklProduct}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item: BklItem, index: number) => <span>{(page - 1) * dataBklProduct?.length + (index + 1)}</span> },
                            { accessor: 'barcode', title: 'Old Barcode', sortable: true, render: (item: BklItem) => <span>{item?.old_barcode_product}</span> },
                            { accessor: 'barcode', title: 'New Barcode', sortable: true, render: (item: BklItem) => <span>{item?.new_barcode_product}</span> },
                            { accessor: 'firstName', title: 'Name', sortable: true, render: (item: BklItem) => <span>{item?.new_name_product}</span> },
                            { accessor: 'NewPrice', title: 'New Price', sortable: true, render: (item: BklItem) => <span>{formatRupiah(item?.new_price_product)}</span> },
                            { accessor: 'OldPrice', title: 'Old Price', sortable: true, render: (item: BklItem) => <span>{formatRupiah(item?.old_price_product)}</span> },
                            { accessor: 'Lama Barang', title: 'Lama Barang', sortable: true, render: (item: BklItem) => <span>{item?.days_since_created}</span> },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item: BklItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/expired_product/detail/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                DETAIL
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            DELETE
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={data?.data.resource.total ?? 0}
                        recordsPerPage={data?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListBkl;
