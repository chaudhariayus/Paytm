import { Link } from "react-router-dom"
export default function AccountCheck({title,label,to}){
    return (
        <div className="flex justify-center gap-1 text-sm py-2">
            <div>{label}</div>
            <Link className=" underline cursor-pointer " to={to}>
            {title}
            </Link>
        </div>
    )
}