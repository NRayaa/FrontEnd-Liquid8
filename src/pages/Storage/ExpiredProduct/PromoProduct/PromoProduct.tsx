import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import IconPlus from '../../../../components/Icon/IconPlus';
import { useDeletePromoMutation, useGetPromotListsQuery } from '../../../../store/services/promoApi';
import { formatRupiah } from '../../../../helper/functions';
import { PromoListItem } from '../../../../store/services/types';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';

const PromoProduct = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data, isSuccess, refetch, isError } = useGetPromotListsQuery({ page, q: search });
    const [deletePromo, results] = useDeletePromoMutation();

    const promoLists: any = useMemo(() => {
        if (isSuccess) {
            return data.data.resource.data;
        }
    }, [data]);

    const showAlert = async ({ type, id, idProduct }: { type: number; id: number; idProduct: number }) => {
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
                        await deletePromo({ idPromo: id, idProduct });
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

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Slow Moving</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Promo Product</span>
                </li>
            </ul>
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Promo Product</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div>
                        <Link to="/storage/expired_product/create_promo">
                            <button className="btn btn-outline-info">
                                <IconPlus />
                                Create
                            </button>
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={promoLists}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item: PromoListItem, index: number) => <span>{(page - 1) * promoLists?.length + (index + 1)}</span> },
                            { accessor: 'Promo Name', title: 'Nama Promo', sortable: true, render: (item: PromoListItem) => <span>{item.name_promo}</span> },
                            { accessor: 'barcode', title: 'Barcode', sortable: true, render: (item: PromoListItem) => <span>{item.new_product.new_barcode_product}</span> },
                            { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: PromoListItem) => <span>{item.new_product.new_name_product}</span> },
                            { accessor: 'category', title: 'Kategori', sortable: true, render: (item: PromoListItem) => <span>{item.new_product.new_category_product}</span> },
                            { accessor: 'QTY', title: 'QTY', sortable: true, render: (item: PromoListItem) => <span>{item.new_product.new_quantity_product}</span> },
                            { accessor: 'hargaBaru', title: 'Harga Baru', sortable: true, render: (item: PromoListItem) => <span>{formatRupiah(item.new_product.new_price_product)}</span> },
                            { accessor: 'hargaLama', title: 'Harga Lama', sortable: true, render: (item: PromoListItem) => <span>{formatRupiah(item.price_promo)}</span> },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (item: PromoListItem) => <span className="badge whitespace-nowrap bg-primary">{item.new_product.new_status_product}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item: PromoListItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/expired_product/detail_promo/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                DETAIL
                                            </button>
                                        </Link>
                                        {/* <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id, idProduct: item.new_product.id })}>
                                            UNBUNDLE
                                        </button> */}
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

export default PromoProduct;
