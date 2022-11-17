
import { useFirestore } from './useFirestore'



export const useLog = () => {

    const {addDocument} = useFirestore('logging')

    const logging = async(userId, logDate, logAction, logId) => {

        await addDocument({
            logDate: logDate.toLocaleString(),
            userAction: logAction,
            userId:userId,
            logId:logId+1,
         
        })

    }
    return {logging}
}