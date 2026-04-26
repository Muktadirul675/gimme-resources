const contributors = [
    {name:'Md. Muktadirul Islam Mahi'}
]

export default function Contributors(){
    return <div className="p-3">
        <h1 className="text-2xl">Contributors</h1>
        <ol>
            {contributors.map((m, index)=>{
                return <li key={index}>{m.name}</li>
            })}
        </ol>
        <hr className="my-5" />
        <h3 className="text-lg">If you want to contribute, please contact at muktadirul.05@gmail.com</h3>
    </div>
}