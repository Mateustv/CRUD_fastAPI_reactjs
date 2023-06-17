import { axiosClient } from "@/services/axiosClient"

const getData = async () => {
    const res = await axiosClient.get('/users')
    console.log(res.data)
}
export default async function Page() {
    const respose = await getData()
    return (
        <h1>
            hello worlds
        </h1>
    )
}