const uploadAction =  async ({ params, request }) => {
  const formData = await request.formData()
  console.log('formData', formData)
  console.log('upload params', params)
  console.log('upload request', request)
},