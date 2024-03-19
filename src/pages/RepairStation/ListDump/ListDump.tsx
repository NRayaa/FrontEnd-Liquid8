import { DataTable } from 'mantine-datatable';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetExportQuery, useGetListDumpQuery, useUpdateListDumpMutation } from '../../../store/services/listDumpApi';
import { GetListDumpItem } from '../../../store/services/types';
import { Alert } from '../../../commons';
import { Dialog, Transition } from '@headlessui/react';
import { formatRupiah } from '../../../helper/functions';
import toast from 'react-hot-toast';

const ListDump = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [isModal, setIsModal] = useState<boolean>(false);
    const [qcdPrice, setQcdPrice] = useState<string | undefined>('0');
    const [selectedQcd, setSelectedQcd] = useState<number | undefined>();

    const [updateListDump, results] = useUpdateListDumpMutation();
    const exportData = useGetExportQuery(undefined);

    const onClick = async () => {
        window.open(await exportData.data.data.resource);
    };

    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const { data, isError, refetch } = useGetListDumpQuery({ page, q: search });
    const dataListDump: any = useMemo(() => {
        return data?.data?.resource?.data;
    }, [data]);

    const handleUpdatePrice = async () => {
        const body = {
            new_price_product: qcdPrice,
        };
        await updateListDump({ id: selectedQcd, body });
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success('Berhasil update harga');
            setIsModal(false);
            refetch();
        }
    }, [results]);

    if (isError && !data?.data?.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <Transition appear show={isModal} as={Fragment}>
                <Dialog as="div" open={isModal} onClose={() => setIsModal(false)}>
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
                                <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden my-8 w-full max-w-sm text-black dark:text-white-dark">
                                    <div className="bg-[#fbfbfb] dark:bg-[#121c2c] ">
                                        <div className="mb-4">
                                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                                Harga :
                                            </label>
                                            <input id="categoryName" type="text" className=" form-input w-[250px]" value={qcdPrice} required onChange={(e) => setQcdPrice(e.target.value)} />
                                        </div>
                                        <button type="button" className="btn btn-primary uppercase px-6" onClick={handleUpdatePrice}>
                                            Update Harga
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Repair Station</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>QCD</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">QCD</h5>
                <div className="flex justify-between items-center w-full mb-4">
                    <div className="relative w-[220px]">
                        <input
                            type="text"
                            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                            <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <button className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={onClick}>
                        Export Data
                    </button>
                </div>
                <div className="datatables">
                    <DataTable
                        records={dataListDump}
                        columns={[
                            { accessor: 'id', title: 'No', render: (item: GetListDumpItem, index: number) => <span>{(page - 1) * dataListDump?.length + (index + 1)}</span> },
                            { accessor: 'barcode', title: 'NEW BARCODE', render: (item: GetListDumpItem) => <span className="font-semibold">{item.new_barcode_product}</span> },
                            { accessor: 'firstName', title: 'PRODUCT', render: (item: GetListDumpItem) => <span className="font-semibold"> {item.new_name_product}</span> },
                            { accessor: 'New Price', title: 'NEW PRICE', render: (item: GetListDumpItem) => <span className="font-semibold">{formatRupiah(item.new_price_product ?? '0')} </span> },
                            { accessor: 'Old Price', title: 'OLD PRICE', render: (item: GetListDumpItem) => <span className="font-semibold">{formatRupiah(item.old_price_product ?? '0')} </span> },
                            {
                                accessor: 'BUANG',
                                title: 'BUANG',
                                render: (item: GetListDumpItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => {
                                                setIsModal(true);
                                                setQcdPrice(item.new_price_product);
                                                setSelectedQcd(item.id);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                ),
                                textAlignment: 'center',
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

export default ListDump;
