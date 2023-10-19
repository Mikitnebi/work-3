import { useState } from "react"
import { FirstStep } from "../firstStep"
import { LastStep } from "../lastStep"
import "./steps.css"


export const Steps = function () {
    const [step,setStep] = useState(false);

    return (
        <>

        <div>
            steps
        </div>
        {
            !step ? <FirstStep chooseStep={setStep}/> : <LastStep chooseStep={setStep}/>
        }
        </>

    )
}