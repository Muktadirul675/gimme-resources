const contributors = [
    {name:'Md. Muktadirul Islam Mahi', email: 'muktadirul.05@gmail.com', 'brief': 'Brac University'}
]

export default function Contributors(){
    return <div className="p-3">
        <h1 className="text-2xl">Contributors</h1>
        <div className="p-2">
            {contributors.map((c, index)=>{
                return <div key={index} className="border border-gray-300 p-3 rounded">
                    <h1 className="text-lg">{c.name}</h1>
                    <p>{c.email}</p>
                    <p>{c.brief}</p>
                </div>
            })}
        </div>
        <hr className="my-5" />
        <h3 className="text-lg">If you want to contribute, please contact at muktadirul.05@gmail.com</h3>
    </div>
}