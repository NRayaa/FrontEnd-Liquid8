import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
// import CodeHighlight from '../../../components/Highlight';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconCode from '../../../components/Icon/IconCode';
import IconHome from '../../../components/Icon/IconHome';
import IconUser from '../../../components/Icon/IconUser';
import IconThumbUp from '../../../components/Icon/IconThumbUp';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import IconPlus from '../../../components/Icon/IconPlus';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';

const tableData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@yahoo.com',
        date: '10/08/2020',
        sale: 120,
        status: 'Complete',
        register: '5 min ago',
        progress: '40%',
        position: 'Developer',
        office: 'London',
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
};

const DataInput = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Data Input'));
    });
    const [codeArr, setCodeArr] = useState<string[]>([]);

    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    const [addData, setAddData] = useState(false);
    const [activeTab3, setActiveTab3] = useState<any>(1);
    return (
        <div>
            <Transition appear show={addData} as={Fragment}>
                <Dialog as="div" open={addData} onClose={() => setAddData(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex justify-center">
                                        <h1 className="text-lg font-bold flex items-center">Masukan Data Baru</h1>
                                    </div>
                                    <div className="p-5">
                                        <input className="form-input" />
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setAddData(false)}>
                                                Discard
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setAddData(false)}>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Inbound
                    </Link>
                </li>
                <li>
                    <Link to="#" className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        Data Process
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Data Input</span>
                </li>
            </ul>
            <div className="pt-5 space-y-8">
                <div className="mb-5">
                    <div className="inline-block w-full">
                        <div className="relative z-[1]">
                            <div
                                className={`${activeTab3 === 1 ? 'w-[15%]' : activeTab3 === 2 ? 'w-[48%]' : activeTab3 === 3 ? 'w-[81%]' : ''}
                                            bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]`}
                            ></div>
                            <ul className="mb-5 grid grid-cols-3">
                                <li className="mx-auto">
                                    <button
                                        type="button"
                                        className={`${activeTab3 === 1 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                        onClick={() => setActiveTab3(1)}
                                    >
                                        <IconHome />
                                    </button>
                                </li>
                                <li className="mx-auto">
                                    <button
                                        type="button"
                                        className={`${activeTab3 === 2 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                        onClick={() => setActiveTab3(2)}
                                    >
                                        <IconUser className="w-5 h-5" />
                                    </button>
                                </li>
                                <li className="mx-auto">
                                    <button
                                        type="button"
                                        className={`${activeTab3 === 3 ? '!border-primary !bg-primary text-white' : ''}
                                            bg-white dark:bg-[#253b5c] border-[3px] border-[#f3f2ee] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                        onClick={() => setActiveTab3(3)}
                                    >
                                        <IconThumbUp className="w-5 h-5" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <button type="button" className={`btn btn-primary ${activeTab3 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab3(activeTab3 === 3 ? 2 : 1)}>
                                    Back
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary ltr:ml-auto rtl:mr-auto"
                                    onClick={() => {
                                        if (activeTab3 === 1) {
                                            setActiveTab3(2);
                                        } else if (activeTab3 === 3) {
                                            setActiveTab3(1);
                                        } else {
                                            setActiveTab3(3);
                                        }
                                    }}
                                >
                                    {activeTab3 === 3 ? (
                                        <div>
                                            <button>Done</button>
                                        </div>
                                    ) : (
                                        'Next'
                                    )}
                                </button>
                            </div>
                            <p className="mb-5">
                                {activeTab3 === 1 && (
                                    <div className="flex gap-4 mt-6">
                                        <div className="w-1/5">
                                            <input
                                                id="ctnFile"
                                                type="file"
                                                className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
                                                required
                                            />
                                        </div>
                                        <div className="table-responsive mb-5 w-full">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama Data</th>
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableData.map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>
                                                                    <div className="whitespace-nowrap">{data.id}</div>
                                                                </td>
                                                                <td>{data.name}</td>
                                                                <td className="text-center">
                                                                    <button onClick={() => showAlert(11)} type="button" className="btn btn-outline-danger">
                                                                        Hapus
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </p>
                            <p className="mb-5">
                                {activeTab3 === 2 && (
                                    <div>
                                        <h1 className="text-lg font-semibold mb-4">PICK HEADER</h1>
                                        <div className="table-responsive mb-5">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama Data</th>
                                                        <th>Nomor Resi</th>
                                                        <th>Nama Produk</th>
                                                        <th>QTY</th>
                                                        <th>Harga</th>
                                                        {/* <th className="text-center">Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableData.map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>
                                                                    <div className="whitespace-nowrap">{data.id}</div>
                                                                </td>
                                                                <td>{data.name}</td>
                                                                <td className="text-center">
                                                                    <div>
                                                                        {/* <label htmlFor="gridState">State</label> */}
                                                                        <select id="gridState" className="form-select text-white-dark">
                                                                            <option>Choose...</option>
                                                                            <option>...</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                    <div>
                                                                        {/* <label htmlFor="gridState">State</label> */}
                                                                        <select id="gridState" className="form-select text-white-dark">
                                                                            <option>Choose...</option>
                                                                            <option>...</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                    <div>
                                                                        {/* <label htmlFor="gridState">State</label> */}
                                                                        <select id="gridState" className="form-select text-white-dark">
                                                                            <option>Choose...</option>
                                                                            <option>...</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                    <div>
                                                                        {/* <label htmlFor="gridState">State</label> */}
                                                                        <select id="gridState" className="form-select text-white-dark">
                                                                            <option>Choose...</option>
                                                                            <option>...</option>
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </p>

                            <p className="mb-5">
                                {activeTab3 === 3 && (
                                    <div>
                                        {/* <div className='flex justify-end'>
                              <button type="button" className="btn btn-outline-info mb-6">
                                    Merge
                                </button>
                              </div> */}
                                        <h1 className="text-lg font-semibold mb-4">DATA MERGED : DOCUMENT 002/2023</h1>
                                        <div className="table-responsive mb-5">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama Data</th>
                                                        <th>Nomor Resi</th>
                                                        <th>Nama Produk</th>
                                                        <th>QTY</th>
                                                        <th>Harga</th>
                                                        {/* <th className="text-center">Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableData.map((data) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                <td>
                                                                    <div className="whitespace-nowrap">{data.id}</div>
                                                                </td>
                                                                <td>{data.name}</td>
                                                                <td>{data.date}</td>
                                                                <td>{data.email}</td>
                                                                <td>{data.sale}</td>
                                                                <td>{data.sale}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </p>
                        </div>
                        {/* <div className="flex justify-between mt-12">
                            <button type="button" className={`btn btn-primary ${activeTab3 === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab3(activeTab3 === 3 ? 2 : 1)}>
                                Back
                            </button>
                            <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab3(activeTab3 === 1 ? 2 : 3)}>
                                {activeTab3 === 3 ? 'Finish' : 'Next'}
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataInput;
