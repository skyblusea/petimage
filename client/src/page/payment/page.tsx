const loader = (queryClient: QueryClient, authClient: AxiosInstance) =>
  async () => {
    console.log('loader작동')
    const collectionQuery = await collectionQuery(authClient)
    const paymentHistoryQuery = await paymentHistoryQuery(authClient)
    const data = {}
    console.log('data', data)
    return null
  }