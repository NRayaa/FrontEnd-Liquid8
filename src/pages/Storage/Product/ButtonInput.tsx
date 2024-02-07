// import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
// import { GeneratesData } from '../../../helper/types';

// interface ButtonInput {
//     showAlert: (type: number) => void;
//     getGeneratesData: (data: GeneratesData) => void;
//     dataGenerates: GeneratesData | undefined;
// }

// const HomeItemTab: React.FC<HomeItemTab> = ({ showAlert, getGeneratesData, dataGenerates }) => {
//     const [file, setFile] = useState<File | null>(null);

//     const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = e.target.files?.[0];

//         if (selectedFile) {
//             setFile(selectedFile);
//         }
//     };

//     const fetchData = async () => {
//         if (file) {
//             const formdata = new FormData();
//             formdata.append('file', file, '[PROXY]');

//             const requestOptions = {
//                 method: 'POST',
//                 body: formdata,
//                 redirect: 'follow' as RequestRedirect,
//             };

//             fetch('https://apiliquid8.digitalindustryagency.com/api/generate', requestOptions)
//                 .then((response) => response.json())
//                 .then((result) => getGeneratesData(result))
//                 .catch((error) => console.log('error', error));
//         }
//     };

//     useEffect(() => {
//         if (file) {
//             fetchData();
//         }
//     }, [file]);

//     const documentCode = useMemo(() => {
//         if (dataGenerates) {
//             return dataGenerates?.data?.resource?.code_document;
//         }
//     }, [dataGenerates]);

//     return (
//         <div className="flex gap-4 mt-6">
//             <div className="w-1/2">
//                 <input
//                     onChange={handleFileChange}
//                     id="ctnFile"
//                     type="file"
//                     accept=".xlsx, .xls"
//                     className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 file:text-white file:hover:bg-primary"
//                     required
//                 />
//             </div>
//             <div className="table-responsive mb-5 w-full">
//                 {dataGenerates && (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>No</th>
//                                 <th>Nama Data</th>
//                                 <th className="text-center">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>
//                                     <div className="whitespace-nowrap">1</div>
//                                 </td>
//                                 <td>{documentCode}</td>
//                                 <td className="text-center">
//                                     <button onClick={() => showAlert(11)} type="button" className="btn btn-outline-danger">
//                                         Hapus
//                                     </button>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ButtonInput;
