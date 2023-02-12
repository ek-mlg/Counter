type MainActionType = CountType | MaxValueType | startValueType | errorType | settingsType

export type stateType = {
    count: number
    maxValue: number
    startValue: number
    error: string
    settings: boolean
}

const initialState: stateType = {
    count: 0,
    maxValue: 7,
    startValue: 0,
    error:  "",
    settings: false
}

export const countReducer = (state : stateType = initialState, action: MainActionType): stateType => {
    switch (action.type) {
        case 'COUNT': {
            return {
                ...state,
                count: action.count
            }
        }
        case 'MAX-VALUE': {
            return {
                ...state,
                maxValue: action.maxValue
            }
        }
        case 'START-VALUE': {
            return {
                ...state,
                startValue: action.startValue
            }
        }
        case 'ERROR': {
            return {
                ...state,
                error: action.error
            }
        }
        case 'SETTINGS': {
            return {
                ...state,
                settings: action.settings
            }
        }
        default:
            return state
    }
}

type CountType = ReturnType<typeof countAC>
export const countAC = (count: number) => {
    return {
        type: 'COUNT',
        count: count
    } as const
}

type MaxValueType = ReturnType<typeof maxValueAC>
export const maxValueAC = (maxValue: number) => {
    return {
        type: 'MAX-VALUE',
        maxValue: maxValue
    } as const
}

type startValueType = ReturnType<typeof startValueAC>
export const startValueAC = (startValue: number) => {
    return {
        type: 'START-VALUE',
        startValue: startValue
    } as const
}

type errorType = ReturnType<typeof errorAC>
export const errorAC = (error: string) => {
    return {
        type: 'ERROR',
        error: error
    } as const
}

type settingsType = ReturnType<typeof settingsAC>
export const settingsAC = (settings: boolean) => {
    return {
        type: 'SETTINGS',
        settings: settings
    } as const
}



