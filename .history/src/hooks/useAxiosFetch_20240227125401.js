import axios from 'axios';
import { useEffect, useState } from 'react'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null)
    const [isLanding, setIsLanding] = useState(false);

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async(url) =>{
            setIsLanding(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            }catch (err) {
                if(isMounted){
                    setData([])
                    setFetchError(err.message)
                }
            }finally {
                isMounted && setIsLanding(false)
            }
        }

        fetchData(dataUrl);

        const cleanUp = () =>{
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

  return { data, fetchError, isLanding };
}

export default useAxiosFetch