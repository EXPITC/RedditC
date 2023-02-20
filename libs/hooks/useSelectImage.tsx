import { useState } from 'react'


const useSelectImage = () => {
  const [imgUrl, setImgUrl] = useState('')

  const convertToDataUrlAndSaveToImgUrl = (file: Blob) => {
    const reader = new FileReader()

    // https://firebase.google.com/docs/storage/web/upload-files
    reader.readAsDataURL(file)
    reader.onload = e => {
      if (!e.target?.result) return
      setImgUrl(e.target.result as string)
    }
  }

  return {
    imgUrl,
    setImgUrl,
    convertToDataUrlAndSaveToImgUrl
  }
}


export default useSelectImage
