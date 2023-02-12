import './Count.module.css';
import React, {ChangeEvent, useEffect} from 'react';
import {Paper} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./Redux/store";
import {countAC, errorAC, maxValueAC, settingsAC, startValueAC} from "./Redux/countReducer";
import s from "./Count.module.css"
import Button from "./Components/Button";
import {Input} from "./Components/Input";


const Count = () => {

    const zero = 0

    const dispatch = useDispatch()
    // Стартовое значение
    const startValue = useAppSelector(state => state.countReducer.startValue)
    // Максимальное значение
    const maxValue = useAppSelector(state => state.countReducer.maxValue)
    // Вывод счетчик
    const count = useAppSelector(state => state.countReducer.count)
    // Вывод текста ошибкиÏ
    const error = useAppSelector(state => state.countReducer.error)
    // Условный рендер
    const settings = useAppSelector(state => state.countReducer.settings)

    useEffect(() => {
        const numberAsString = localStorage.getItem('counterValue')
        console.log(numberAsString)
        if (numberAsString) {
            const newNumber = JSON.parse(numberAsString)
            dispatch(countAC(newNumber))
        }
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(count))
    }, [count])

    useEffect(() => {
        const numberAsStringStart = localStorage.getItem('counterValueStart')
        if (numberAsStringStart) {
            const newNumberStart = JSON.parse(numberAsStringStart)
            dispatch(startValueAC(newNumberStart))
        }
    }, [dispatch])

    useEffect(() => {
        if (startValue > zero && startValue < maxValue) {
            localStorage.setItem('counterValueStart', JSON.stringify(startValue))
        }
    }, [maxValue, startValue])

    useEffect(() => {
        const numberAsStringMax = localStorage.getItem('counterValueMax')
        if (numberAsStringMax) {
            const newNumberMax = JSON.parse(numberAsStringMax)
            dispatch(maxValueAC(newNumberMax))
        }
    }, [dispatch])

    useEffect(() => {
        if (maxValue > 1 && maxValue > startValue) {
            localStorage.setItem('counterValueMax', JSON.stringify(maxValue))
        }
    }, [maxValue, startValue])

    const errorMessageStart = 'Error. The start value cannot be less than zero or greater than or equal to the maximum value.'
    const errorMessageMax = 'Error. The maximum value cannot be less than zero or less than or equal to the initial value.'

    // Если в поле инпут Start вводим правильное значение убираем надпись ошибки | передаем значение в максимальное
    const onChangeStartInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let targetStartInput = e.currentTarget.valueAsNumber
        // Вывод текста ошибки по условию + удаление ошибки
        targetStartInput >= maxValue || targetStartInput < zero ? dispatch(errorAC(errorMessageStart)) : dispatch(errorAC(""))
        // Передаем стартовое значение в переменную
        dispatch(startValueAC(targetStartInput))
    }

    // Если в поле инпут Max вводим правильное значение убираем надпись ошибки | передаем значение в максимальное
    const onChangeMaxInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let targetMaxInput = e.currentTarget.valueAsNumber
        // Вывод текста ошибки по условию + удаление ошибки
        targetMaxInput <= startValue || targetMaxInput < zero ? dispatch(errorAC(errorMessageMax)) : dispatch(errorAC(""))
        // Передаем максимальное значение в переменную
        dispatch(maxValueAC(targetMaxInput))
    }

    // Кнопка Set
    const addValueButton = () => {
        dispatch(startValueAC(startValue))
        dispatch(maxValueAC(maxValue))
        dispatch(countAC(startValue))
        dispatch(settingsAC(!settings))
    }

    // По клику на кнопку add прибавить 1
    const onClickAddHandler = () => {
        if (count < maxValue) {
            dispatch(countAC(count + 1))
        }

    }
    // По клику на кнопку reset вывести 0
    const onClickResetHandler = () => {
        dispatch(countAC(startValue))
    }

    // Дизейбл кнопки add по условию
    const checkedDisabledAdd = count === maxValue || startValue < zero || maxValue < zero ? 'disabledBlue' : 'blue'
    // Дизейбл кнопки reset по условию
    const checkedDisabledReset = count === startValue ? 'disabledBlue' : 'blue'
    // Дизейбл кнопки set по условию
    const checkedDisabledSet = startValue >= maxValue || startValue < zero || maxValue < zero || maxValue <= startValue ? 'disabledPurple' : 'purple'
    // Подсвечивание инпута красным по условию для стартового значения
    const checkedErrorStart = startValue >= maxValue ? 'error' : '' || startValue < zero ? 'error' : ''
    // Подсвечивание инпута красным по условию для стартового значения
    const checkedErrorMax = maxValue <= startValue ? 'error' : '' || maxValue < zero ? 'error' : ''

    return (
        <Paper style={{
            borderRadius: '25px',
            minWidth: '40%',
            minHeight: '35%',
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px"
        }} elevation={3}>
            {settings
                ?
                <div className={s.Container}>
                    <div className={s.Description}>please enter correct Value</div>
                    <div className={s.Inputs}>
                        <div className={s.ValueSetting}>
                            start:
                            <Input color={checkedErrorStart} onChange={onChangeStartInputHandler} value={startValue}/>
                        </div>
                        <div className={s.ValueSetting}>
                            max:
                            <Input color={checkedErrorMax} onChange={onChangeMaxInputHandler} value={maxValue}/>
                        </div>
                    </div>
                    <div className={s.ErrorMessage}>{error}</div>
                    <div className={s.ButtonsContainer}>
                        <Button onClick={addValueButton} color={checkedDisabledSet} children={'set'}/>
                    </div>
                </div>
                :
                <>
                    <div className={s.Description}>first Counter</div>
                    <div className={s.Value}>value:</div>
                    <div className={s.Count}>{count}</div>
                    <div className={s.ButtonsContainer}>
                        <Button onClick={onClickAddHandler} color={checkedDisabledAdd} children={'add'}/>
                        <Button onClick={onClickResetHandler} color={checkedDisabledReset} children={'reset'}/>
                        <Button onClick={addValueButton} color={checkedDisabledSet} children={'set'}/>
                    </div>
                </>}
        </Paper>
    );
};

export default Count;