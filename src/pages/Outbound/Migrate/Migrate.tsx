import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddMigrateMutation, useGetColorCountQuery, useMigrateFinishMutation } from '../../../store/services/migrateApi';
import toast from 'react-hot-toast';

const Migrate = () => {
    const navigate = useNavigate();
    const { data: getColorCount } = useGetColorCountQuery(undefined);
    const [colorOptions, setColorOptions] = useState<{ label: string; value: string }[]>([]);
    const [createMigrate, results] = useAddMigrateMutation();

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
        try {
            const body = {
                destination: input.destination,
                color: input.color,
                total: input.total,
            };
            await createMigrate(body);
        } catch (err) {}
    };

    const colorData = useMemo(() => {
        return getColorCount?.data?.resource ?? {};
    }, [getColorCount]);

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
            // navigate('/akun/akun/list_akun');
        } else if (results.isError) {
            toast.error(results.data?.data?.message);
        }
    }, [results]);

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
                <div className="mb-8">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-2">Migrate</h5>
                    <form className="w-[400px] mb-4" onSubmit={handleCreateMigrate}>
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Destination :
                            </label>
                            <select id="destination" name="destination" className="mb-2 form-select w-[250px]" onChange={handleInputChange} value={input.destination}>
                                <option disabled>Select</option>
                                <option value="DKT">DKT</option>
                                <option value="DKTO">DKTO</option>
                            </select>{' '}
                        </div>
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Color :
                            </label>
                            <select id="color" name="color" className="mb-2 form-select w-[250px]" onChange={handleInputChange} value={input.color}>
                                <option disabled>Select</option>
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
            </div>
        </>
    );
};

export default Migrate;
