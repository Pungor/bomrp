
import { useFirestore } from './useFirestore'



export const useLog = () => {
    const {addDocument} = useFirestore('logging')



    const logging = async(userId, logDate, logAction) => {

        await addDocument({
            logDate: logDate.toLocaleString(),
            userAction: logAction,
            userId:userId,
        })

    }
    return {logging}
}