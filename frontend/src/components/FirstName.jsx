
export function FirstName({title,holdername,onChange}){
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">{title}</div>
            <input placeholder={holdername} onChange={onChange} type="text" className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
    )
}