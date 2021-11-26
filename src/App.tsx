import { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { requestJSON } from './action';
import './styles.css';
const App: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { jsonData, isLoading } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestJSON());
    }, [dispatch]);

    return <></>;
};

export default App;
