import { useGetUsersQuery } from '../store/services/usersApi';

const Index = () => {
    const { data } = useGetUsersQuery('');

    return (
        <div>
            <h1 className="text-5xl font-bold mb-4">Test api</h1>
            <ul>{data?.length !== 0 && data?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
        </div>
    );
};

export default Index;
