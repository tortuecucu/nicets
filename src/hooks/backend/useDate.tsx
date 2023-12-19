import dayjs from "dayjs"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const useDate = () => {
    const parse = (date: string): dayjs.Dayjs => {
        return dayjs(date)
    }

    const sequelize = (date: dayjs.Dayjs): string => {
        return date.toISOString()
    }

    const isPast = (date: string | number | dayjs.Dayjs | Date | null | undefined): boolean => {
        if (date === null || date === undefined) {
            return true
        }

        date = dayjs(date)

        return date.isBefore(dayjs())
    }

    const format = (date: string | number | dayjs.Dayjs | Date, format: string): string => (
        dayjs(date).format(format)
    )

    const ago = (date: string | number | dayjs.Dayjs | Date): string => {
        return dayjs(date).fromNow()
    }

    const isActive = (start: string | number | dayjs.Dayjs | Date, end: string | number | dayjs.Dayjs | Date | undefined | null): boolean => {
        start = dayjs(start)

        //not started
        if (start.isAfter(now)) {
            return false
        }

        //never ends
        if (end === null || end === undefined) {
            return true
        }

        //if end is set, ensure end was not reached
        return !isPast(end)
    }

    const now: dayjs.Dayjs = dayjs()

    return { parse, sequelize, now, isPast, format, ago, isActive}

}

export default useDate