import { client } from "../client"


export const getUserByEmail = async (email: string) => {
    try {
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        })

        return user;
    } catch (error) {
        return null;
    }
}

export const getUserByID = async (id: string) => {
    try {
        const user = await client.user.findUnique({
            where: {
                id: id
            }
        })

        return user;
    } catch (error) {
        return null;
    }
}