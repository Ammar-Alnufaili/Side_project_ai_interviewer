"use client";
import React, { createContext, useContext, useReducer } from "react";
import { interviewReducer, initialState } from "./interviewReducer";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
    const [state, dispatch] = useReducer(interviewReducer, initialState);
    return (
        <InterviewContext.Provider value={{ state, dispatch }}>
            {children}
        </InterviewContext.Provider>
    );
}

export const useInterviewContext = () => useContext(InterviewContext);
