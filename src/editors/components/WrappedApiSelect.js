import { WrappedSelect,  } from "./WrappedSelect"
import { useApi } from "../../contexts/ApiProvider"
import { useState, useEffect, useMemo } from "react"

const WrappedApiSelect = ({ control, name, id, layout, className, datamapper, apiFunction, label }) => {
    const api = useApi()
    const [data, setData] = useState(null)

    const options = useMemo(() => {
        if (data) {
            return data.map(datamapper)
        }
    }, [data, datamapper])

    useEffect(() => {
        const fetchData = async () => {
            api[apiFunction]()
                .then(data => {
                    const [resp, err] = data;
                    if (err) {
                        console.error(err)
                    } else {
                        setData(resp)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        }
        fetchData()
    }, [])

    return (
        <WrappedSelect control={control} name={name} id={id} layout={layout} className={className} label={label} values={options} />
    )
}

export { WrappedApiSelect  }