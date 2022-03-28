import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Samples = props => (
    <tr>
        <th>{props.sample._id}</th>
        <th>{props.sample.name}</th>
        <th>{props.sample.number}</th>
        <th>
            <button onClick={e => props.addMore(props.sample._id,props.sample)}> Add number </button>
            <button onClick={e => props.subMore(props.sample._id,props.sample)}> Subtract number </button>
        </th>
    </tr>
)

function ListSample() {
  
    const [samples,setSamples] = useState([])

    // const [sampleadd,setSampleAdd] = useState(0)


    useEffect(() => {

        axios.get('http://localhost:1212/practice1')
            .then(data => setSamples(data.data))
            .catch(err => console.log(err))

    },[])

    const addMore = (id,samples_) => {
        samples_.number += 1
        setSamples(prevState => {
            return prevState.map(xsample => {
                if (xsample._id === id) {
                    return {
                        ...xsample,
                        number: samples_.number
                    }
                } else {
                    return xsample
                }
            })
        })


        // axios.put('http://localhost:1212/practice1/update/'+id, { name: samples_.name, number: samples_.number} )
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err))
        axios.post('http://localhost:1212/practice1/update/'+id, { name: samples_.name, number: samples_.number} )
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }

    const subMore = (id,samples_) => {
        samples_.number -= 1
        // setSamples(samples_.number)

        setSamples(prevState => {
            return prevState.map(xsample => {
                if (xsample._id === id) {
                    return {
                        ...xsample,
                        number: samples_.number
                    }
                } else {
                    return xsample
                }
            })
        })

        // axios.put('http://localhost:1212/practice1/update/'+id, { name: samples_.name, number: samples_.number} )
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err))

        axios.post('http://localhost:1212/practice1/update/'+id, { name: samples_.name, number: samples_.number} )
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }

    const sampleDeclarations = () => {
        return samples.map(currentsample => {
            return <Samples 
                key={currentsample._id} 
                sample={currentsample}
                addMore={ e => addMore(e,currentsample)}
                subMore = { e=> subMore(e,currentsample)}
            ></Samples>
        })
    }

    return (
        <div>
            <h1> Sample List </h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sampleDeclarations()}
                </tbody>
            </table>


        </div>
    )
}

export default ListSample