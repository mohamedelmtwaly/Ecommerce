

export default function FormInput({label ,type,name , value,size ,handleChange,handleBlur }) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium text-gray-700">{label}</span>
      </label>
      <input 
        onChange={handleChange} 
        onBlur={handleBlur} 
        value={value} 
        name={name} 
        type={type} 
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`input input-bordered bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${size}`} 
      />
    </div>
  )
}