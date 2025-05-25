import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listService from './listService'


const extractErrorMessage = (error) => {
    return (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
}

const initialState = {
    lists: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const createList = createAsyncThunk('lists/create', async (listData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.createList(listData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})


export const getLists = createAsyncThunk('lists/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.getLists(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})


export const deleteList = createAsyncThunk('lists/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await listService.deleteList(id, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(createList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.lists.push(action.payload)
            })
            .addCase(createList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            
            .addCase(getLists.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLists.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.lists = action.payload
            })
            .addCase(getLists.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            
            .addCase(deleteList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                
                state.lists = state.lists.filter((list) => list._id !== action.payload.id && list._id !== action.payload._id)
            })
            .addCase(deleteList.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = listSlice.actions
export default listSlice.reducer
