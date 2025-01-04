import { createStandaloneToast } from "@chakra-ui/toast";

const {toast} = createStandaloneToast()

export default async function createTask({fork, dispatch, action, search, loadingText,
    sucessText,
    rejectedText
}) {
    

        toast({
            title: "Loanding",
            description: loadingText,
            status:"loading",
            duration: 2000,
            isClosable: true
         })
        
        const tasks = fork(async (api) => {
            return await search();
        });
    
    
        const response = await tasks.result;
        
        if(response.status === "ok"){
            dispatch(action(response.value));
            toast({
                title: "Sucess",
                description: sucessText,
                status:"success",
                duration: 2000,
                isClosable: true
            });
        }
        
        if(response.status === "rejected"){
            toast({
                title: "Error",
                description: rejectedText,
                status:"error",
                duration: 2000,
                isClosable: true
            });
        }
        
        return response;
}