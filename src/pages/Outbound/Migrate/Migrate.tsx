import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddMigrateMutation, useDeleteMigrateMutation, useGetColorCountQuery, useGetDisplayMigrateQuery, useMigrateFinishMutation, useMigrateMutation } from '../../../store/services/migrateApi';
import toast from 'react-hot-toast';
import { DataTable } from 'mantine-datatable';
import Swal from 'sweetalert2';

const Migrate = () => {
    const navigate = useNavigate();
    const { data: getColorCount, refetch: refetchGetColorCount } = useGetColorCountQuery(undefined);
    const { data: getDisplayMigrate, refetch: refetchDisplayMigrate } = useGetDisplayMigrateQuery(undefined);
    const [colorOptions, setColorOptions] = useState<{ label: string; value: string }[]>([]);
    const [createMigrate, results] = useMigrateMutation();
    const [sendMigrate, resultSend] = useMigrateFinishMutation();
    const [deleteMigrate, resultDelete] = useDeleteMigrateMutation();

    const dataDisplayMigrate: any = useMemo(() => {
        return getDisplayMigrate?.data.resource.data.migrates;
    }, [getDisplayMigrate]);

    const showAlert = async ({ type, id }: any) => {
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
                    title: 'Yakin ingin menghapus item ini?',
                    text: 'Data tidak bisa di kembalikan setelah di hapus',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (resultsDeleteSale) => {
                    if (resultsDeleteSale.value) {
                        await deleteMigrate(id);
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                    } else if (resultsDeleteSale.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
        if (type === 12) {
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
                    title: 'Yakin ingin menambah item ini?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (resultsDeleteSale) => {
                    if (resultsDeleteSale.value) {
                        const body = {
                            destiny_document_migrate: input.destination,
                            product_color: input.color,
                            product_total: input.total,
                        };
                        await createMigrate(body);
                        setInput({
                            destination: '',
                            color: '',
                            total: 0,
                        });
                        swalWithBootstrapButtons.fire('Added!', 'Your file has been added.', 'success');
                    } else if (resultsDeleteSale.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', '', 'error');
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

    const handleSendMigrate = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                destiny_document_migrate: input.destination,
                product_color: input.color,
                product_total: input.total,
            };
            await sendMigrate(body);
        } catch (err) {}
    };

    const [input, setInput] = useState({
        destination: '',
        color: '',
        total: 0,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCreateMigrate = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        showAlert({ type: 12 });
    };

    useEffect(() => {
        if (resultSend.isSuccess) {
            toast.success(resultSend.data.data.message);
            navigate('/outbound/migrate/list_migrate');
        } else if (resultSend.isError) {
            toast.error(resultSend.data?.data?.message);
        }
    }, [resultSend]);

    const colorData = useMemo(() => {
        return getColorCount?.data?.resource ?? {};
    }, [getColorCount]);

    useEffect(() => {
        if (getDisplayMigrate?.data.resource.destionation === 'disable') {
            setInput((prev) => ({ ...prev, destination: getDisplayMigrate?.data.resource.data.destiny_document_migrate ?? '' }));
        }
        if (getDisplayMigrate?.data.resource.destionation === 'aktif') {
            setInput((prev) => ({ ...prev, destination: '' }));
        }
    }, [getDisplayMigrate]);

    useEffect(() => {
        if (colorData) {
            const options = Object.entries(colorData).map(([color, count]) => ({
                label: `${color} | ${count}`,
                value: color,
            }));
            setColorOptions(options);
        }
    }, [colorData]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetchDisplayMigrate();
            refetchGetColorCount();
            // navigate('/akun/akun/list_akun');
        } else if (results.isError) {
            toast.error(results.data?.data?.message);
        }
    }, [results]);
    useEffect(() => {
        if (resultDelete.isSuccess) {
            toast.success(resultDelete.data.data.message);
            refetchDisplayMigrate();
            refetchGetColorCount();
            // navigate('/akun/akun/list_akun');
        } else if (resultDelete.isError) {
            toast.error(resultDelete.data?.data?.message);
        }
    }, [resultDelete]);

    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Migrate</span>
                </li>
            </ul>
            <div className="panel mt-6 min-h-[450px] pr-12">
                <div className="mb-8 flex justify-between">
                    <div>
                        <h5 className="font-semibold text-lg dark:text-white-light mb-2">Migrate</h5>
                        <form className="w-[400px] mb-4" onSubmit={handleCreateMigrate}>
                            <div className="flex items-center justify-between ">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Destination :
                                </label>
                                <select
                                    id="destination"
                                    name="destination"
                                    className="mb-2 form-select w-[250px]"
                                    onChange={handleInputChange}
                                    value={input.destination}
                                    disabled={getDisplayMigrate?.data.resource.destionation === 'disable'}
                                >
                                    <option>Select</option>
                                    <option value="DKT">DKT</option>
                                    <option value="DKTO">DKTO</option>
                                </select>{' '}
                            </div>
                            <div className="flex items-center justify-between ">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Color :
                                </label>
                                <select id="color" name="color" className="mb-2 form-select w-[250px]" onChange={handleInputChange} value={input.color}>
                                    <option>Select</option>
                                    {colorOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>{' '}
                            </div>
                            <div className="flex items-center justify-between ">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Total :
                                </label>
                                <input id="total" name="total" type="number" className="mb-2 form-input w-[250px]" onChange={handleInputChange} value={input.total} />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button type="submit" className="btn-lg btn-primary uppercase px-6 rounded-md">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-primary uppercase px-6" onClick={handleSendMigrate}>
                            Send
                        </button>
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        records={dataDisplayMigrate}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item, index) => <span>{index + 1}</span>,
                            },
                            {
                                accessor: 'code_document_migrate',
                                title: 'Barcode',
                                render: (item: any) => <div className="w-[19px] h-[21px]">{item.code_document_migrate}</div>,
                            },
                            {
                                accessor: 'product_color',
                                title: 'Color',
                                render: (item: any) => <span>{item.product_color}</span>,
                            },
                            {
                                accessor: 'product_total',
                                title: 'Total',
                                render: (item: any) => <span>{item.product_total}</span>,
                            },
                            {
                                accessor: 'status_migrate',
                                title: 'Status',
                                render: (item: any) => <span className="bg-gray-200 capitalize rounded-sm px-2">{item.status_migrate}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            Delete
                                        </button>
                                    </div>
                                ),
                                textAlignment: 'center',
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default Migrate;
