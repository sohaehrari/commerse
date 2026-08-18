import {  useState } from "react"
import { useForm,} from "react-hook-form"
import { loginSchema } from "../validations/registerSchema"
import { yupResolver } from "@hookform/resolvers/yup";



export default function loginForm(){
    const [showpassword,setShowPassword]=useState(false)
    const[success,setSuccess]=useState();


    const{register,handleSubmit,reset
formState: {isValid,errors, isSubmitting} }=useForm({
    resolver: yupResolver(loginSchema),
      mode: "onTouched"
})

function onSubmit(data){
    console.log("you logged",data)
    setSuccess("you logged in this site succesfully")
}

function handleReset(){
    reset();
    showPassword();
    setSuccess();
}




    return(
        <div className="form" onSubmit={handleSubmit(onSubmit)} onvalidate>
                  {success && <div className="success">{success}</div>}

<div className="field">
    <label htmlFor="login-email">Email</label>
    <input 
    type="email"
    id="login-email"
    name="email"
    placeholder="Write your email"
    { ...register ("email")}
    autoComplete="email"

    />
 {errors.email && <div className="error">{errors.email.message}</div>}

</div>

<div className="field">
    <label htmlFor="login-password">Password</label>
    <input 
    type="password"
    id="login-password"
    name="password"
    placeholder="Write your password"
    { ...register ("password")}
    autoComplete="password"

    />
 {errors.password && <div className="error">{errors.password.message}</div>}

<div className="help-row">
    <label htmlFor="row small">
    <input 
    type="checkbox"
    name="checkbox"
    id="checkbox"
    checked={showpassword}
    onChange={(e)=>setShowPassword(e.target.checked)}
     />
     Show password
          </label>
          <span className="small">Min 6 characters</span>
        </div>

        <div className="actions">
            <button className="ghost" type="button" disabled={isValid ||isSubmitting} >login</button>

            <button className="ghost" type="button" onClick={handleReset} >RESET</button>

        </div>
</div>

        </div>

    )
}