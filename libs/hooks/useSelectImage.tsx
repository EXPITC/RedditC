import { useState } from 'react'

const useSelectImage = () => {
  const [imgUrl, setImgUrl] = useState('')
  const [err, setErr] = useState('')

  const convertToDataUrlAndSaveToImgUrl = (file: Blob) => {
    const reader = new FileReader()
    if (err) setErr('')

    // https://firebase.google.com/docs/storage/web/upload-files
    reader.readAsDataURL(file)
    reader.onload = e => {
      if (!e.target?.result) return
      const result = e.target.result as string

      if (e.target.error) return setErr(e.target.error as any)
      if (result.search(/svg/) === 11)
        return setErr(
          "Fail to upload for security reason we don't accept svg file."
        )

      setImgUrl(e.target.result as string)
    }
  }

  return {
    imgUrl,
    setImgUrl,
    convertToDataUrlAndSaveToImgUrl,
    err
  }
}

export default useSelectImage
