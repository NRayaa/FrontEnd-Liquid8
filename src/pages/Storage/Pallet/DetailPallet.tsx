import { DataTable } from 'mantine-datatable';
import { Link, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, Fragment, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
    useAddDetailPalletProductMutation,
    useDeleteDetailPalletProductMutation,
    useDisplayPalletListsQuery,
    useExportToExcelDetailPalletMutation,
    useShowPalletQuery,
    useUpdateDetailPalletMutation,
    useUploadPalleteMutation,
} from '../../../store/services/palletApi';
import { formatRupiah, useDebounce } from '../../../helper/functions';
import BarcodePalet from './BarcodePalet';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { PaletListItem, ProdcutItem, SubPaletItem } from '../../../store/services/types';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';
import { useDropzone } from 'react-dropzone';
import { baseUrl } from '../../../store/services/prepareHeader';

const MAX_FILES = 8;
const MAX_FILE_SIZE_MB = 2;
const TOAST_DELAY_MS = 500; // Delay antar toast dalam milidetik

const PalletDetail = () => {
    const { id }: any = useParams();
    const { data, isSuccess, refetch } = useShowPalletQuery(id);
    const [deletePallete] = useDeleteDetailPalletProductMutation();
    const [uploadFile] = useUploadPalleteMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [searchProductBundle, setSearchProductBundle] = useState('');
    const [pageProduct, setPageProduct] = useState<number>(1);
    const debounceValueProductBundle = useDebounce(searchProductBundle);
    const { data: listProduct, isSuccess: isSuccessProduct } = useDisplayPalletListsQuery({ page: pageProduct, q: debounceValueProductBundle });
    const [addDetailPalletProduct] = useAddDetailPalletProductMutation();
    const [updateDetailPallet] = useUpdateDetailPalletMutation();
    const [exportToExcel] = useExportToExcelDetailPalletMutation();

    const productNewData = useMemo(() => {
        if (isSuccessProduct) {
            return listProduct?.data.resource.data;
        }
    }, [listProduct]);


    const detailDataPallet = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);

    const [editFormData, setEditFormData] = useState({
        nama_palet: '',
        total_price_palet: '',
    });

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

    const handleUpload = async (e: FormEvent) => {
        e.preventDefault();
        const images = new FormData();
        if (second.length > 0) {
            for (let i = 0; i < second.length; i++) {
                images.append('images[]', second[i]);
            }
        }
        images.append('palet_id', (detailDataPallet?.id ?? 0).toString());
        try {
            await uploadFile(images)
                .unwrap()
                .then((res: any) => {
                    setSecond([]);
                    setIsUploadOpen(false);
                })
                .catch((err: any) => console.log('success:', err));
        } catch (error: any) {
            console.log('error upload:', error);
            toast.error('something went wrong.');
        }
    };

    useEffect(() => {
        if (isSuccess && data) {
            const resource = data.data.resource;
            setEditFormData({
                nama_palet: resource.name_palet,
                total_price_palet: resource.total_price_palet,
            });
        }
    }, [data, isSuccess]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleSaveEdit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                nama_palet: editFormData.nama_palet,
                total_price_palet: editFormData.total_price_palet,
            };
            await updateDetailPallet({ id, body });
            toast.success('Data Pallet berhasil diperbarui.');
            refetch();
        } catch (error) {
            toast.error('Gagal memperbarui data Pallet.');
            console.error('Error updating Pallet:', error);
        }
    };

    const handleExportData = async () => {
        try {
            const response = await exportToExcel({ id }).unwrap();
            const url = response.data.resource;
            const fileName = url.substring(url.lastIndexOf('/') + 1);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success(response.data.message || 'Data Pallet berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data Pallet.');
            console.error('Error exporting Pallet to Excel:', err);
        }
    };

    const handleSearchButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSearchProductBundle('');
    };
    const handleCloseUpload = () => {
        setIsUploadOpen(false);
    };

    const handleAddDetailProduct = async (e: MouseEvent<HTMLButtonElement>, selectedProductId: string) => {
        e.preventDefault();
        try {
            await addDetailPalletProduct({ productId: id, palletId: selectedProductId });
            toast.success('Produk berhasil ditambahkan ke bundle.');
            setIsModalOpen(false);
            setSearchProductBundle('');
            refetch();
        } catch (error) {
            toast.error('Gagal menambahkan produk ke bundle.');
            console.error('Error adding product to bundle:', error);
        }
    };

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
                .then(async (result) => {
                    if (result.value) {
                        await deletePallete(id);
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                        refetch();
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

    return (
        <div>
            <div>
                <Transition appear show={isUploadOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        open={isUploadOpen}
                        onClose={() => {
                            setIsUploadOpen(false);
                            setSearchProductBundle('');
                        }}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <form onSubmit={handleUpload} className="flex items-center justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel relative border-0 p-5 rounded-lg overflow-hidden my-8 w-full max-w-5xl text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between">
                                            <div className="text-lg font-bold">Upload Image</div>
                                            {second.length > 0 && <button className="btn btn-outline-danger">Clear All</button>}
                                        </div>
                                        {second.length === 0 && (
                                            <div
                                                {...getRootProps()}
                                                className={`w-full h-[70vh] flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm ${isDragActive ? 'opacity-100' : 'opacity-100'}`}
                                            >
                                                <div className="w-full h-full flex items-center justify-center border-[3px] border-sky-500 rounded-lg border-dashed flex-col">
                                                    <input {...getInputProps()} />
                                                    {isDragActive ? (
                                                        <p className="text-2xl text-sky-700 font-bold">Drop image here!</p>
                                                    ) : (
                                                        <>
                                                            <button type="button" onClick={open} className="px-5 py-2 z-10 mt-5 mb-2 bg-sky-600 rounded-full font-bold text-white cursor-pointer">
                                                                Upload Image
                                                            </button>
                                                            <p>or drop a file here!</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {(detailDataPallet?.palet_images.length ?? 0) + second.length < 8 && (detailDataPallet?.palet_images.length ?? 0) + second.length !== 0 && (
                                            <div className="w-full h-full flex items-center my-4 p-6 justify-center border-[3px] border-sky-500 rounded-lg border-dashed flex-col">
                                                <button type="button" onClick={open} className="px-5 py-2 mt-5 z-20 mb-2 bg-sky-600 rounded-full font-bold text-white cursor-pointer">
                                                    Upload Image
                                                </button>
                                                <p>or drop a file here!</p>
                                            </div>
                                        )}
                                        {(detailDataPallet?.palet_images.length ?? 0) + second.length < 8 && (detailDataPallet?.palet_images.length ?? 0) + second.length !== 0 && (
                                            <div
                                                {...getRootProps()}
                                                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm ${
                                                    isDragActive ? 'opacity-100 z-30' : 'opacity-0 z-10'
                                                }`}
                                            >
                                                <div className="w-full h-full flex items-center justify-center border-[3px] border-sky-500 rounded-lg border-dashed flex-col">
                                                    <input {...getInputProps()} />
                                                    <p className="text-2xl text-sky-700 font-bold">Drop image here!</p>
                                                </div>
                                            </div>
                                        )}
                                        {second.length > 0 && (
                                            <div className="grid grid-cols-4 gap-4 my-4">
                                                {second.map((file, index) => (
                                                    <div key={index} className="relative">
                                                        <img src={URL.createObjectURL(file)} alt={`uploaded-${index}`} className="w-full shadow z-0 aspect-square object-cover rounded" />
                                                        <button
                                                            onClick={() => handleRemoveFile(index)}
                                                            className="absolute top-1 right-1 z-20 text-white bg-red-600 shadow-sm rounded-full w-6 h-6 flex items-center justify-center"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex justify-end items-center">
                                            <button type="submit" className="btn btn-outline-info z-20" disabled={second.length === 0}>
                                                Upload
                                            </button>
                                            <button type="button" className="btn btn-outline-danger z-20" onClick={handleCloseUpload}>
                                                Kembali
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </form>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <div>
                <Transition appear show={isModalOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        open={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSearchProductBundle('');
                        }}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
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
                                            <div className="text-lg font-bold">Pilih Product</div>
                                        </div>
                                        <div className="w-1/2 mt-5">
                                            <input
                                                className="form-input"
                                                placeholder="Search..."
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchProductBundle(e.target.value)}
                                                value={searchProductBundle}
                                                autoFocus
                                            />
                                        </div>
                                        <div className="max-h-[290px] overflow-y-scroll rounded-md mt-5">
                                            <DataTable
                                                records={productNewData}
                                                columns={[
                                                    {
                                                        accessor: 'No',
                                                        title: 'No',
                                                        render: (item: ProdcutItem, index: number) => <span>{index + 1}</span>,
                                                    },
                                                    {
                                                        accessor: 'id product',
                                                        title: 'Id Produk',
                                                        render: (item: ProdcutItem) => <span className="font-semibold">{item.id}</span>,
                                                    },
                                                    {
                                                        accessor: 'barcode',
                                                        title: 'Barcode',
                                                        render: (item: ProdcutItem) => <span className="font-semibold">{item.old_barcode_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'name',
                                                        title: 'Nama',
                                                        render: (item: ProdcutItem) => <span className="font-semibold">{item.new_name_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'category',
                                                        title: 'Kategori',
                                                        render: (item: ProdcutItem) => <span className="font-semibold">{item.new_category_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Opsi',
                                                        titleClassName: '!text-center',
                                                        render: (item: ProdcutItem) => (
                                                            <div className="flex items-center w-max mx-auto gap-6">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-info"
                                                                    onClick={(e) => {
                                                                        handleAddDetailProduct(e, item.id.toString());
                                                                    }}
                                                                >
                                                                    <IconSquareCheck className="ltr:mr-2 rtl:ml-2 " />
                                                                </button>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                minHeight={200}
                                                totalRecords={listProduct?.data.resource.total ?? 0}
                                                recordsPerPage={listProduct?.data.resource.per_page ?? 10}
                                                page={pageProduct}
                                                onPageChange={(prevPage) => setPageProduct(prevPage)}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={handleCloseModal}>
                                                Kembali
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/pallet">
                        <span>Pallet</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Pallet</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Pallet</h1>
            </div>
            <div>
                <div className="flex gap-4 items-start mb-4">
                    {/* Kolom informasi dan form barcode */}
                    <form className="w-1/3" onSubmit={handleSaveEdit}>
                        {/* Informasi Pallet */}
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode Pallet :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataPallet?.palet_barcode} className="form-input w-[250px]" required />
                        </div>
                        <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Pallet :
                            </label>
                            <input id="categoryName" type="text" className="form-input w-[250px]" onChange={handleInputChange} name="nama_palet" value={editFormData.nama_palet} required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Kategori Pallet :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataPallet?.category_palet} className="form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga Lama :
                            </label>
                            <input id="categoryName" disabled type="text" value={formatRupiah(detailDataPallet?.total_harga_lama ?? '0')} className="form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga Baru:
                            </label>
                            <input
                                id="categoryName"
                                type="text"
                                name="total_price_palet"
                                onChange={handleInputChange}
                                value={editFormData.total_price_palet}
                                className="form-input w-[250px]"
                                required
                            />
                        </div>
                        <div className="flex gap-3">
                            <button type="submit" className="btn btn-primary mt-4 px-16">
                                Update
                            </button>
                            <button type="button" disabled={detailDataPallet?.palet_images.length === 8} onClick={() => setIsUploadOpen(true)} className="btn btn-primary mt-4">
                                Add Image
                            </button>
                        </div>
                    </form>

                    <div className="w-1/3">
                        {(!detailDataPallet?.palet_images || detailDataPallet.palet_images.length <= 0) && (
                            <div className="w-full h-20 flex items-center justify-center border-2 border-gray-500 border-dashed rounded-md font-semibold">Image not yet.</div>
                        )}
                        {detailDataPallet?.palet_images && detailDataPallet.palet_images.length > 0 && (
                            <div className="grid grid-cols-4 gap-4 my-4 w-full">
                                {detailDataPallet?.palet_images.map((file, index) => (
                                    <div key={index} className="relative w-full col-span-1 aspect-square">
                                        <img src={`${baseUrl}/${file.file_path}`} alt={`uploaded-${index}`} className="w-full shadow z-0 h-full object-cover rounded" />
                                        <button
                                            onClick={() => handleRemoveFile(index)}
                                            className="absolute top-1 right-1 z-20 text-white bg-red-600 shadow-sm rounded-full w-6 h-6 flex items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bagian kanan: Barcode dan Upload Foto di sebelah kanan barcode */}
                    <div className="flex gap-4 w-1/3 items-start">
                        {/* Barcode */}
                        <div className="flex flex-col">
                            <BarcodePalet
                                barcode={detailDataPallet?.palet_barcode ?? ''}
                                category={detailDataPallet?.category_palet ?? ''}
                                newPrice={formatRupiah(detailDataPallet?.total_price_palet ?? '0')}
                                oldPrice={formatRupiah(detailDataPallet?.total_harga_lama ?? '0')}
                                namePalet={detailDataPallet?.name_palet ?? ''}
                            />
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/storage/pallet">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <div className="flex items-center justify-between mb-4">
                            <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto mr-4" onClick={handleSearchButtonClick}>
                                Add
                            </button>
                            <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={handleExportData}>
                                Export data
                            </button>
                        </div>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            records={detailDataPallet?.palet_products}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item: SubPaletItem, index: number) => <span>{index + 1}</span> },
                                { accessor: 'code_document', title: 'Code Document', sortable: true, render: (item: SubPaletItem) => <span>{item.code_document}</span> },
                                { accessor: 'new_barcode_product', title: 'Barcode', sortable: true, render: (item: SubPaletItem) => <span>{item.new_barcode_product}</span> },
                                { accessor: 'new_category_product', title: 'Kategori', sortable: true, render: (item: SubPaletItem) => <span>{item.new_category_product}</span> },
                                { accessor: 'new_name_product', title: 'Nama', sortable: true, render: (item: SubPaletItem) => <span>{item.new_name_product}</span> },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true, render: (item: SubPaletItem) => <span>{formatRupiah(item.new_price_product ?? '0')}</span> },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: (item: SubPaletItem) => <span className="badge whitespace-nowrap bg-primary">{item.new_status_product}</span>,
                                },
                                {
                                    accessor: 'Aksi',
                                    title: 'Aksi',
                                    render: (item: SubPaletItem) => (
                                        <div className="flex items-center w-max mx-auto gap-6">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                                Remove
                                            </button>
                                        </div>
                                    ),
                                    textAlignment: 'center',
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PalletDetail;
