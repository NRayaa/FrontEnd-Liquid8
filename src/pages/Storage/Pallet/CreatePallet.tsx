import { useNavigate } from 'react-router-dom';

const CreatePallet = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Pallet</h5>
                <div className="flex items-center space-x-4">
                    <button type="button" className="btn btn-primary-dark uppercase px-6" onClick={() => navigate('/storage/pallet/create_pallet/generate')}>
                        generate
                    </button>
                    <span className="font-medium">OR</span>
                    <button type="button" className="btn btn-primary-dark uppercase px-6" onClick={() => navigate('/storage/pallet/create_pallet/manual')}>
                        manual
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePallet;
