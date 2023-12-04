import { Controller } from "react-hook-form"
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";
import {registerLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";
import { Wrapper } from "./Wrapper";
registerLocale('fr', fr)


const DateTime = ({ control, name, placeholder, id, className }) => {
  const dateToString = (date) => {
    try {
      return dayjs(date).toISOString()
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
  const stringToDate = (string) => {
    try {
      return (string!==null) ? dayjs(string).toDate() : null
    } catch (error) {
      console.error(error)
      return null
    }
  }
  return (
    <Controller render={({ field: { onChange, value } }) => {
      const dateVal = stringToDate(value)
      const props = {}
      if (dateVal!==null) {
        props.selected=dateVal
        props.startDate={dateVal}
      }
      return (
        <ReactDatePicker
          id={id}
          className={className}
          showTimeInput
          dateFormat="MM/dd/yyyy HH:mm"
          timeFormat="fr"
          locale='fr'
          placeholderText={placeholder}
          onChange={(date) => {
            onChange(dateToString(date))
          }} 
          {...props}
          />
      );
    }}
      name={name}
      control={control}
    />
  )
}

const WrappedDatetime = ({control, name, placeholder, id, className, label, text, layout}) => {
  return(
    <Wrapper id={id} label={label} text={text} layout={layout} className={className}>
      <DateTime id={id} control={control} name={name} className='form-control' placeholder={placeholder}/>
    </Wrapper>
  )
}

export { DateTime, WrappedDatetime }
