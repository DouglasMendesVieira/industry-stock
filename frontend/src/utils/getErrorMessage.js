export function getErrorMessage(err){

    if(err?.response?.data){

        if(typeof err.response.data === "string"){
            return err.response.data;
        }

        return err.response.data.message || "Unexpected error";
    }

    if(err?.request){
        return "Server not responding";
    }

    return err?.message || "Unexpected error";
}
