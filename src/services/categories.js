import instance from "common/config/api";

const categoriesService = {
    fetch: async () => {
        const response = await instance.get('/categorias');

        return response.data;
    },
    fetchOne: async (categoryName) => {
        const response = await instance.get(`/categorias/${categoryName}`)
        return response.data;
    }
}

export default categoriesService;