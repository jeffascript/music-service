import axios, { AxiosResponse, AxiosError } from 'axios';

class FetchRequest {
    static async withUrl(url: string): Promise<any> {
        const fetchJson = await axios
            .get(url)
            .then((response: AxiosResponse) => response.data)
            .catch((error: AxiosError) => {
                if (error.response) {
                    throw error.response;
                }
            });

        return fetchJson;
    }
}

export default FetchRequest;
