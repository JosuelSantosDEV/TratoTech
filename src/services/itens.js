import instance from "common/config/api";

const itensService = {
    fetch: async () => {
        const response = await instance.get("itens");
        return response.data;
    },
    fetchByCategory: async (categoryName) => {
        const response = await instance.get(`itens?categoria=${categoryName}`);
        return response.data;
    }
}
export default itensService