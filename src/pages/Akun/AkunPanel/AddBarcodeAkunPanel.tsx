import React, { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateAccountBarcodePanelMutation, useCreateAccountPanelMutation, useGetListAccountPanelQuery, useGetListAkunQuery } from '../../../store/services/listAkunApi';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { useDebounce } from '../../../helper/functions';
import { Dialog, Transition } from '@headlessui/react';
import { DataTable } from 'mantine-datatable';

const AddBarcodeAkunPanel = () => {
    const [createAccountPanel, results] = useCreateAccountBarcodePanelMutation();
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
    const [searchAccount, setSearchAccount] = useState('');
    const debounceValueAccount = useDebounce(searchAccount);
    const [pageAccount, setPageAccount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const debounceValue = useDebounce(search);
    const { data } = useGetListAkunQuery({ page: pageAccount, q: debounceValueAccount });
    const { data: listAkunPanelData, refetch, isError } = useGetListAccountPanelQuery({ page, q: debounceValue });

    const dataListAccount: any = useMemo(() => {
        return data?.data.resource.data;
    }, [data]);

    const listAkunPanel: any = useMemo(() => {
        return listAkunPanelData?.data.resource.data;
    }, [listAkunPanelData]);

    const [input, setInput] = useState({
        user_id: '',
        format_barcode: '',
    });
    const navigate = useNavigate();
    console.log(input);

    const handleCreateAccountBarcode = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                user_id: input.user_id,
                format_barcode_id: input.format_barcode,
            };
            await createAccountPanel(body);
        } catch (err) {}
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            navigate('/akun/akun/list_akun_panel');
        } else if (results.isError) {
            toast.error(results.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Home" basePath="/" sub="List Barcode Akun" subPath="/akun/akun/list_akun_panel" current="Add Akun" />
            <Transition appear show={isBarcodeOpen} as={Fragment}>
                <Dialog
                    as="div"
                    open={isBarcodeOpen}
                    onClose={() => {
                        setIsBarcodeOpen(false);
                    }}
                >
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden my-8 w-full max-w-5xl text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between">
                                        <div className="text-lg font-bold">Pilih Barcode</div>
                                    </div>
                                    <div className="mb-4 flex justify-between">
                                        <div className="relative w-[220px]">
                                            <input
                                                className="form-input mr-2"
                                                placeholder="Search..."
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                                value={search}
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div className="datatables">
                                        <DataTable
                                            className="whitespace-nowrap table-hover"
                                            records={listAkunPanel}
                                            columns={[
                                                {
                                                    accessor: 'No',
                                                    title: 'No',
                                                    render: (item: any, index: number) => <span>{(pageAccount - 1) * dataListAccount?.length + (index + 1)}</span>,
                                                },
                                                {
                                                    accessor: 'name',
                                                    title: 'Barcode',
                                                    render: (item: any) => <span className="font-semibold">{item.format}</span>,
                                                },
                                                {
                                                    accessor: 'Aksi',
                                                    title: 'Aksi',
                                                    render: (item: any) => (
                                                        <div className="flex items-center w-max mx-auto gap-6">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-info"
                                                                onClick={() => {
                                                                    setInput((prev) => ({ ...prev, format_barcode: item.id }));
                                                                    setIsBarcodeOpen(false);
                                                                }}
                                                            >
                                                                Select
                                                            </button>
                                                        </div>
                                                    ),
                                                    textAlignment: 'center',
                                                },
                                            ]}
                                            totalRecords={listAkunPanelData?.data.resource.total ?? 0}
                                            recordsPerPage={listAkunPanelData?.data.resource.per_page ?? 10}
                                            page={page}
                                            onPageChange={(prevPage) => setPage(prevPage)}
                                        />
                                    </div>
                                    <div className="flex justify-end items-center mt-8">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setIsBarcodeOpen(false)}>
                                            Kembali
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={isAccountOpen} as={Fragment}>
                <Dialog
                    as="div"
                    open={isAccountOpen}
                    onClose={() => {
                        setIsAccountOpen(false);
                    }}
                >
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden my-8 w-full max-w-5xl text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between">
                                        <div className="text-lg font-bold">Pilih Buyer</div>
                                    </div>
                                    <div className="mb-4 flex justify-between">
                                        <div className="relative w-[220px]">
                                            <input
                                                className="form-input mr-2"
                                                placeholder="Search..."
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchAccount(e.target.value)}
                                                value={searchAccount}
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div className="datatables">
                                        <DataTable
                                            className="whitespace-nowrap table-hover"
                                            records={dataListAccount}
                                            columns={[
                                                {
                                                    accessor: 'No',
                                                    title: 'No',
                                                    render: (item: any, index: number) => <span>{(pageAccount - 1) * dataListAccount?.length + (index + 1)}</span>,
                                                },
                                                {
                                                    accessor: 'name',
                                                    title: 'Nama',
                                                    render: (item: any) => <span className="font-semibold">{item.name}</span>,
                                                },
                                                {
                                                    accessor: 'Aksi',
                                                    title: 'Aksi',
                                                    render: (item: any) => (
                                                        <div className="flex items-center w-max mx-auto gap-6">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-info"
                                                                onClick={() => {
                                                                    setInput((prev) => ({ ...prev, user_id: item.id }));
                                                                    setIsAccountOpen(false);
                                                                }}
                                                            >
                                                                Select
                                                            </button>
                                                        </div>
                                                    ),
                                                    textAlignment: 'center',
                                                },
                                            ]}
                                            totalRecords={data?.data.resource.total ?? 0}
                                            recordsPerPage={data?.data.resource.per_page ?? 10}
                                            page={pageAccount}
                                            onPageChange={(prevPage) => setPageAccount(prevPage)}
                                        />
                                    </div>
                                    <div className="flex justify-end items-center mt-8">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setIsAccountOpen(false)}>
                                            Kembali
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className="panel mt-10 w-full min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-lg dark:text-white-light">Add Barcode Akun</h5>
                    <Link to="/akun/akun/list_akun_panel">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <form className="w-[400px]" onSubmit={handleCreateAccountBarcode}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="userId" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama :
                        </label>
                        <button className="form-input w-[250px] justify-between flex items-center capitalize" onClick={() => setIsAccountOpen(true)} type="button">
                            {dataListAccount?.find((item: any) => item.id === input.user_id)?.name ?? 'Pilih User'}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="userId" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode :
                        </label>
                        <button className="form-input w-[250px] justify-between flex items-center capitalize" onClick={() => setIsBarcodeOpen(true)} type="button">
                            {listAkunPanel?.find((item: any) => item.id === input.format_barcode)?.format ?? 'Pilih Barcode'}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16">
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBarcodeAkunPanel;
