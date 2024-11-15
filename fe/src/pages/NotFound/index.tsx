import ErrorImage from "../../assets/error.png"
const index = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <img src={ErrorImage} alt="error-img" className="h-60 w-60"/>
      <h1 className="text-2xl font-semibold text-blue-500">Page not found..!</h1>
    </div>
  )
}

export default index