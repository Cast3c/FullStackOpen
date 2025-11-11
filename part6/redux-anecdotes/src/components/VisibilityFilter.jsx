import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const VisibilityFilter = () => {
    const dispatch = useDispatch()
    return(
        <div>
            filter
            <input type='text'
                name='filter'
                onChange={(event) => dispatch(setFilter(event.target.value))}
            />
        </div>
    )
}

export default VisibilityFilter