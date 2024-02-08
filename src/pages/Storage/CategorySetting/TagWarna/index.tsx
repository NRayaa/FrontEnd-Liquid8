import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../../../components';
import { DataTable } from 'mantine-datatable';
import { useDeleteColorTagMutation, useGetAllColorTagQuery, useUpdateColorTagMutation } from '../../../../store/services/colorTagApi';
import { ColorTagItem } from '../../../../store/services/types';
import IconPlus from '../../../../components/Icon/IconPlus';
import { formatRupiah } from '../../../../helper/functions';

const TagWarna = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data, refetch } = useGetAllColorTagQuery({ page, q: search });
    const [deleteColorTag, deleteResults] = useDeleteColorTagMutation();
    // const [updateColorTag, updateResults] = useUpdateColorTagMutation();

    const dataColorTag = useMemo(() => {
        return data?.data.resource.data;
    }, [data]);

    const handleDeleteColorTag = async (id: number) => {
        try {
            await deleteColorTag(id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (deleteResults.isSuccess) {
            refetch();
        }
    }, [deleteResults]);

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/" current="Tag Warna" />
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Tag Warna</h5>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div>
                        <Link to="/storage/categorysetting/tag_warna/add">
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
                        records={dataColorTag}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item: ColorTagItem, index: number) => <span>{index + 1}</span>,
                            },
                            {
                                accessor: 'Tag Warna',
                                title: 'Tag Warna',
                                render: (item: ColorTagItem) => <div className="w-[19px] h-[21px]" style={{ backgroundColor: item.hexa_code_color }}></div>,
                            },
                            {
                                accessor: 'Min Price',
                                title: 'Min Price',
                                render: (item: ColorTagItem) => <span>{formatRupiah(item.min_price_color)}</span>,
                            },
                            {
                                accessor: 'Fixed Price',
                                title: 'Fixed Price',
                                render: (item: ColorTagItem) => <span>{formatRupiah(item.fixed_price_color)}</span>,
                            },
                            {
                                accessor: 'Max Price',
                                title: 'Max Price',
                                render: (item: ColorTagItem) => <span>{formatRupiah(item.max_price_color)}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: ColorTagItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link
                                            to={`/storage/categorysetting/tag_warna/${item.id}`}
                                            state={{
                                                hexa_code_color: item.hexa_code_color,
                                                name_color: item.name_color,
                                                min_price_color: item.min_price_color,
                                                max_price_color: item.max_price_color,
                                                fixed_price_color: item.fixed_price_color,
                                            }}
                                        >
                                            <button type="button" className="btn btn-outline-info">
                                                Edit
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteColorTag(item.id)}>
                                            Delete
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
        </>
    );
};

export default TagWarna;
