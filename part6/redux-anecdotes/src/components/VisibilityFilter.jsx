import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const VisibilityFilter = () => {
    const dispatch = useDispatch()
    return(
        <div>
            filter
            <input type='text'
                name='filter'
                onChange={(event) => dispatch(filterChange(event.target.value))}
            />
        </div>
    )
}

export default VisibilityFilter