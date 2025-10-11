export const initialState = {
    title: "",
    description: "",
    rubric: [],
    questions: [],
    candidates: [],
};

export function interviewReducer(state, action) {
    switch (action.type) {
        case "UPDATE_FIELD":
            return { ...state, ...action.payload };
        case "RESET":
            return { ...initialState };
        default:
            return state;
    }
}
