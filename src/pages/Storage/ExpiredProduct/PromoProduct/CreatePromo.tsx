import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../../store';
import IconPlus from '../../../../components/Icon/IconPlus';
import { useGetDisplayExpiredQuery, useGetExpiredProductsQuery } from '../../../../store/services/productNewApi';
import { ProductExpiredItem } from '../../../../store/services/types';
import { formatRupiah } from '../../../../helper/functions';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        category: 'Fashion',
        barcode: 'LQDF5H012',
        totalMasuk: '105.000',
        email: 'carolinejensen@zidant.com',
        status: 'Expired',
        QTY: '12',
        hargaLama: 'Rp. 12.000',
        hargaBaru: 'Rp. 14.000',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Otomotif',
        barcode: 'LQDF5H013',
        totalMasuk: '203.000',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        status: 'Expired',
        QTY: '34',
        hargaLama: 'Rp. 10.000',
        hargaBaru: 'Rp. 9.000',
    },
];

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
const CreatePromo = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess } = useGetDisplayExpiredQuery({ page, q: '' });

    const expiredProducts = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Expired Product</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create Promo</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Create Promo</h1>

                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={expiredProducts}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span> },
                            { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_barcode_product}</span> },
                            { accessor: 'firstName', title: 'Nama Data', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_name_product}</span> },
                            { accessor: 'category', title: 'Ketegori', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_category_product}</span> },
                            { accessor: 'totalMasuk', title: 'Total Masuk', sortable: true, render: (item: ProductExpiredItem) => <span>{formatRupiah(item.new_price_product)}</span> },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (item: ProductExpiredItem) => <span className="badge whitespace-nowrap bg-danger capitalize">{item.new_status_product}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item: ProductExpiredItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/expired_product/create_promo/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                Edit
                                            </button>
                                        </Link>
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

export default CreatePromo;
