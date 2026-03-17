
'use client'

import { useState, useEffect } from 'react'

let globalCache = {}
let pendingRequests = {}
let errorCache = {}  // New: cache failed attempts temporarily

const ERROR_CACHE_DURATION = 10000 // 10 seconds

const useApiCache = (key, apiCall) => {
    const serializedKey = typeof key === 'string' ? key : JSON.stringify(key)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            setLoading(true)

            try {
                // 1. Use from success cache if available
                if (globalCache[serializedKey]) {
                    if (isMounted) {
                        setData(globalCache[serializedKey].data)
                        setLoading(false)
                    }
                    return
                }

                // 2. Prevent retry if recent error exists
                if (
                    errorCache[serializedKey] &&
                    Date.now() - errorCache[serializedKey] < ERROR_CACHE_DURATION
                ) {
                    if (isMounted) {
                        setError('Previous request failed. Try again later.')
                        setLoading(false)
                    }
                    return
                }

                // 3. Wait for pending if already in progress
                if (pendingRequests[serializedKey]) {
                    const result = await pendingRequests[serializedKey]
                    if (isMounted) {
                        setData(result.data)
                        setLoading(false)
                    }
                    return
                }

                // 4. Make request and store result
                pendingRequests[serializedKey] = apiCall()
                const response = await pendingRequests[serializedKey]

                globalCache[serializedKey] = {
                    data: response,
                    timestamp: Date.now()
                }

                if (isMounted) {
                    setData(response)
                    setError(null)
                }
            } catch (err) {
                errorCache[serializedKey] = Date.now() // store failed time
                if (isMounted) {
                    setError(err || 'An error occurred')
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
                delete pendingRequests[serializedKey]
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }

    }, [serializedKey, apiCall])

    return { data, loading, error }
}

export default useApiCache


// // src/hooks/useApiCache.js
// 'use client'

// import { useState, useEffect } from 'react'

// let globalCache = {}
// let pendingRequests = {}

// const useApiCache = (key, apiCall) => {

//     const serializedKey = typeof key === 'string' ? key : JSON.stringify(key)


//     const [data, setData] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)


//     useEffect(() => {
//         let isMounted = true

//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 if (globalCache[serializedKey]) {
//                     if (isMounted) {
//                         setData(globalCache[serializedKey].data)
//                         setLoading(false)
//                     }
//                     return
//                 }

//                 if (pendingRequests[serializedKey]) {
//                     const result = await pendingRequests[serializedKey]
//                     if (isMounted) {
//                         setData(result.data)
//                         setLoading(false)
//                     }
//                     return
//                 }

//                 pendingRequests[serializedKey] = apiCall()
//                 const response = await pendingRequests[serializedKey]

//                 globalCache[serializedKey] = {
//                     data: response,
//                     timestamp: Date.now()
//                 }

//                 if (isMounted) {
//                     setData(response)
//                     setError(null)
//                 }
//             } catch (err) {
//                 if (isMounted) {
//                     return setError(err || 'An error occurred')
//                 }
//             } finally {
//                 if (isMounted) {
//                     setLoading(false)
//                 }
//                 delete pendingRequests[serializedKey]
//             }
//         }

//         fetchData()

//         return () => {
//             isMounted = false
//         }

//     }, [serializedKey, apiCall])

//     return { data, loading, error }
// }

// export default useApiCache