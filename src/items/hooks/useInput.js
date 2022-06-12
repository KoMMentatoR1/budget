import { useEffect, useState } from "react";

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [isEmail, setIsEmail] = useState(false)
    const [minLength, setMinLength] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [isNumber, setIsNumber] = useState(false)

    useEffect(() => {
        for (const validation in validations){
            switch(validation){
                case "isEmpty": value ? setIsEmpty(false) : setIsEmpty(true); break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    !re.test(String(value).toLowerCase()) ? setIsEmail(true) : setIsEmail(false)
                    break;
                case 'minLength': value.length < validations[validation] ?  setMinLength(true) : setMinLength(false); break;
                case "isNumber": isNaN(value) ? setIsNumber(true) : setIsNumber(false)

            }
        }
    }, [value])

    useEffect(() => {
        if (isEmail || minLength || isEmpty || isNumber) {
            setIsValid(false)
        }
        else {
            setIsValid(true)
        }
    }, [isEmail, minLength, isEmpty, isNumber])

    return {
        isEmpty,
        isEmail,
        minLength,
        isValid,
        isNumber,
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }

}
 
export default useInput;