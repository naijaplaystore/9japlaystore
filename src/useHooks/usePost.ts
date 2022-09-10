import axios from "axios"
function usePost()
{
    const fetch = async () =>
    {
        try
        {
            const post = axios({
                method: 'post',
                url: '/user/12345',
                data: {
                    firstName: 'Fred',
                    lastName: 'Flintstone'
                }
            });
            return post;
        } catch (err)
        {
            console.log(err)
        }
    }
    return { fetch }

}
export default usePost;