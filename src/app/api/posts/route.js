import { getStoredFiles } from "../../../../lib/posts";



export async function GET(){
    const allpostData = await getStoredFiles();
    return new Response(JSON.stringify(allpostData), {status:200});
}


