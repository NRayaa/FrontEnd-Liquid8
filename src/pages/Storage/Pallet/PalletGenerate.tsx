import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { DataTable } from 'mantine-datatable';
import {
    useCreatePalleteMutation,
    useDeleteFilterProductMutation,
    useDisplayPalletListsQuery,
    useFilterPalletMutation,
    useFilterProductListsQuery,
    usePalletListsQuery,
    useUploadPalleteMutation,
} from '../../../store/services/palletApi';
import { ProdcutItem } from '../../../store/services/types';
import { formatRupiah, generateRandomString } from '../../../helper/functions';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { useDropzone } from 'react-dropzone';

const MAX_FILES = 8;
const MAX_FILE_SIZE_MB = 2;
const TOAST_DELAY_MS = 500; // Delay antar toast dalam milidetik

const PalletGenerate = () => {
    const [pageLeftTable, setPageLeftTable] = useState<number>(1);
    const [pageRightTable, setPageRightTable] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const displayLists = useDisplayPalletListsQuery({ page: pageLeftTable, q: searchLeftTable });
    const filterLists = useFilterProductListsQuery(pageRightTable);
    const [filterPallet, results] = useFilterPalletMutation();
    const [deleteFilterProduct, deleteResults] = useDeleteFilterProductMutation();
    const [createPallete, createResults] = useCreatePalleteMutation();
    const [uploadImage] = useUploadPalleteMutation();
    const [input, setInput] = useState({
        name: '',
        category: '',
        totalProduct: '',
        barcode: '',
    });
    const navigate = useNavigate();
    const palletLists = usePalletListsQuery({ page: 1, q: '' });

    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const [second, setSecond] = useState<File[]>([]);

    // Fungsi validasi dan handle file drop
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            toast.dismiss(); // Menutup semua toast yang aktif

            // Total file yang akan ada setelah menambahkan file baru
            const totalFiles = second.length + acceptedFiles.length;
            const remainingFileSlots = MAX_FILES - second.length;

            // Menyimpan error baru
            const newErrors: string[] = [];

            // Cek batas jumlah file
            if (second.length >= MAX_FILES) {
                newErrors.push(`You can only upload up to ${MAX_FILES} files.`);
            } else if (totalFiles > MAX_FILES) {
                newErrors.push(`You can only upload ${remainingFileSlots} more file(s).`);
            }

            // Cek batas ukuran file dan hanya tambahkan file yang valid
            const validFiles: File[] = [];
            acceptedFiles.slice(0, remainingFileSlots).forEach((file) => {
                const fileSizeMB = file.size / (1024 * 1024); // Mengonversi byte ke MB
                if (fileSizeMB > MAX_FILE_SIZE_MB) {
                    newErrors.push(`File ${file.name} is larger than ${MAX_FILE_SIZE_MB} MB.`);
                } else {
                    validFiles.push(file);
                }
            });

            // Menampilkan toast dengan delay untuk setiap error
            newErrors.forEach((error, index) => {
                setTimeout(() => {
                    toast.error(error); // Menampilkan toast error
                }, index * TOAST_DELAY_MS); // Delay berdasarkan urutan error
            });

            // Jika tidak ada error, tambahkan file yang valid
            if (validFiles.length > 0) {
                setSecond((prevFiles) => [...prevFiles, ...validFiles]); // Tambahkan file yang valid
            }
        },
        [second]
    );

    // Menangani file yang ditolak
    const onDropRejected = useCallback((rejectedFiles: any[]) => {
        toast.dismiss(); // Menutup semua toast yang aktif

        rejectedFiles.forEach((rejectedFile, index) => {
            const { file, errors } = rejectedFile;
            errors.forEach((error: any, errorIndex: number) => {
                setTimeout(() => {
                    if (error.code === 'file-too-large') {
                        toast.error(`File ${file.name} is larger than ${MAX_FILE_SIZE_MB} MB.`);
                    }
                }, (index + errorIndex) * TOAST_DELAY_MS); // Delay berdasarkan urutan error
            });
        });
        if (rejectedFiles[0].errors[0].code === 'too-many-files') {
            toast.error(`You can only upload up to ${MAX_FILES} files.`);
        }
    }, []);

    // Menghapus file berdasarkan index
    const handleRemoveFile = (index: number) => {
        setSecond((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    // Menggunakan react-dropzone untuk menangani drag-and-drop
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { 'image/*': [] }, // Hanya mengizinkan gambar
        noClick: true, // Tidak memicu file picker saat halaman diklik, kecuali tombol kecil
        noKeyboard: true, // Mencegah file picker terbuka dengan keyboard
        maxFiles: MAX_FILES,
        maxSize: MAX_FILE_SIZE_MB * 1024 * 1024, // Konversi dari MB ke byte
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const displayData = useMemo(() => {
        if (displayLists.isSuccess) {
            return displayLists.data.data.resource.data;
        }
    }, [displayLists.data]);
    const filterData = useMemo(() => {
        if (displayLists.isSuccess) {
            return filterLists.data?.data.resource;
        }
    }, [filterLists.data?.data.resource.data]);

    const handleAddDisplay = async (item: ProdcutItem) => {
        try {
            await filterPallet(item.id);
            setInput((prevState: any) => ({
                ...prevState,
                category: item.new_category_product,
            }));
        } catch (err) {
            console.log(err);
        }
    };
    const handleDeleteFilter = async (id: number) => {
        try {
            await deleteFilterProduct(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmitPalet = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = new FormData();
            if (second.length > 0) {
                for (const element of second) {
                    body.append('images[]', element);
                }
            }
            body.append('name_palet', input.name);
            body.append('category_palet', input.name);
            body.append('total_price_palet', filterData?.total_new_price.toString() ?? '0');
            body.append('total_product_palet', filterData?.data?.total.toString() ?? '0');
            body.append('palet_barcode', input.barcode);
            await createPallete(body);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            displayLists.refetch();
            filterLists.refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results]);
    useEffect(() => {
        if (deleteResults.isSuccess) {
            toast.success(deleteResults.data.data.message);
            displayLists.refetch();
            filterLists.refetch();
        } else if (deleteResults.isError) {
            toast.error(deleteResults?.data?.data?.message ?? 'Error');
        }
    }, [deleteResults]);
    useEffect(() => {
        if (createResults.isSuccess) {
            toast.success(createResults.data.data.message);
            navigate('/storage/pallet');
            palletLists.refetch();
        } else if (createResults.isError) {
            toast.error(createResults?.data?.data?.message ?? 'Error');
        }
    }, [createResults]);
    useEffect(() => {
        setInput((prev) => ({ ...prev, barcode: generateRandomString(10) }));
    }, []);

    if (createResults.isError && !createResults.data?.data.status) {
        return <Alert message={createResults.data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div className="relative">
            {second.length < 8 && (
                <div
                    {...getRootProps()}
                    className={`absolute top-0 left-0 w-[calc(100%+48px)] -m-6 h-[calc(100vh-56px)] flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm ${
                        isDragActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    <div className="w-full h-full flex items-center justify-center border-[8px] border-sky-500 rounded-lg border-dashed">
                        <input {...getInputProps()} />
                        <p className="text-5xl text-sky-500 font-bold uppercase">Drop image anywhere</p>
                    </div>
                </div>
            )}
            <BreadCrumbs base="Home" basePath="/" sub="Pallet" subPath="/storage/pallet" current="Add Pallet" />
            {/* Flex container untuk form pallet dan form upload */}
            <div className="flex justify-between gap-8 mt-10">
                {/* Form Pallet Generate */}
                <div className="panel w-[50%] min-h-[400px]">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Pallet Generate</h5>
                    <form className="w-[400px]" onSubmit={handleSubmitPalet}>
                        <div className="flex items-center  justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Pallet :
                            </label>
                            <input onChange={handleInputChange} name="name" value={input.name} id="categoryName" type="text" className="form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Kategori :
                            </label>
                            <input onChange={handleInputChange} name="category" value={input.category} id="categoryName" type="text" className="form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center  justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga:
                            </label>
                            <input
                                disabled
                                name="totalPrice"
                                value={formatRupiah(filterData?.total_new_price.toString() ?? '0')}
                                id="categoryName"
                                type="text"
                                className="form-input w-[250px]"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Produk:
                            </label>
                            <input
                                disabled
                                onChange={handleInputChange}
                                name="totalProduct"
                                value={filterData?.data.data.length}
                                id="categoryName"
                                type="text"
                                className="form-input w-[250px]"
                                required
                            />
                        </div>
                        <div className="flex items-center  justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode Pallet :
                            </label>
                            <input disabled onChange={handleInputChange} name="barcode" value={input.barcode} id="categoryName" type="text" className="form-input w-[250px]" required />
                        </div>

                        <button type="submit" className="btn btn-primary mt-4 px-16 uppercase">
                            Create Palet
                        </button>
                    </form>
                </div>

                {/* Form Upload Foto */}
                <div className=" w-[50%]">
                    <div className="w-full panel p-4 bg-white shadow-lg rounded-lg">
                        <div className="w-full flex items-center py-5 flex-col">
                            <button type="button" onClick={open} className="px-5 py-2 mt-3 bg-sky-600 rounded-full font-bold text-white cursor-pointer">
                                Upload Image
                            </button>
                            <p>or drop a file</p>
                        </div>
                        {/* Render pratinjau gambar */}
                        {second.length > 0 && (
                            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-500">
                                {second.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img src={URL.createObjectURL(file)} alt={`uploaded-${index}`} className="w-full h-32 object-cover rounded" />
                                        <button onClick={() => handleRemoveFile(index)} className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center">
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="datatables mt-8">
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative w-[260px]">
                            <input
                                type="text"
                                className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                placeholder="Search..."
                                value={searchLeftTable}
                                onChange={(e) => setSearchLeftTable(e.target.value)}
                            />
                        </div>
                        <Link to="/storage/pallet">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={displayData}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProdcutItem, index: number) => <span>{index + 1}</span> },
                                    { accessor: 'barcode', title: 'New Barcode', sortable: true, render: (item: ProdcutItem) => <span>{item?.new_barcode_product}</span> },
                                    { accessor: 'nama produk', title: 'Nama Produk', sortable: true, width: 220, render: (item: ProdcutItem) => <p className="truncate">{item?.new_name_product}</p> },
                                    { accessor: 'harga', title: 'Harga', sortable: true, render: (item: ProdcutItem) => <span>{formatRupiah(item?.new_price_product ?? '0')}</span> },
                                    { accessor: 'category', title: 'Kategori', sortable: true, render: (item: ProdcutItem) => <span>{item.new_category_product}</span> },
                                    {
                                        accessor: 'status',
                                        title: 'Status',
                                        sortable: true,
                                        render: (item: ProdcutItem) => <span className="badge whitespace-nowrap bg-primary capitalize">{item.new_status_product}</span>,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: ProdcutItem) => (
                                            <div className="flex items-center w-max mx-auto gap-6" onClick={() => handleAddDisplay(item)}>
                                                <button type="button" className="btn btn-outline-info">
                                                    Add
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={displayLists.data?.data.resource.total ?? 0}
                                recordsPerPage={displayLists.data?.data.resource.per_page ?? 10}
                                page={pageLeftTable}
                                onPageChange={(prevPage) => setPageLeftTable(prevPage)}
                            />
                        </div>
                        <div className="datatables xl:col-span-2">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={filterData?.data.data}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProdcutItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: ProdcutItem) => <span className="text-ellipsis overflow-hidden">{item.new_barcode_product}</span>,
                                    },
                                    {
                                        accessor: 'nama',
                                        title: 'Nama Produk',
                                        sortable: true,
                                        render: (item: ProdcutItem) => <span className="text-ellipsis overflow-hidden">{item.new_name_product}</span>,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Aksi',
                                        titleClassName: '!text-center',
                                        render: (item: ProdcutItem) => (
                                            <div className="flex items-center space-x-2">
                                                <button type="button" className="btn btn-outline-danger uppercase" onClick={() => handleDeleteFilter(item.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={filterLists.data?.data.resource.data.total ?? 0}
                                recordsPerPage={filterLists.data?.data.resource.data.per_page ?? 10}
                                page={pageRightTable}
                                onPageChange={(prevPage) => setPageRightTable(prevPage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PalletGenerate;
