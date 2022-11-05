
import { useFirestore } from './useFirestore'

export const useLog = () => {
    const {addDocument} = useFirestore('logging')


    const logging = async(userId, logDate, logAction) => {

        await addDocument({
            logDate: logDate,
            userAction: logAction,
            userId:userId,
        })

    }
    return {logging}
}