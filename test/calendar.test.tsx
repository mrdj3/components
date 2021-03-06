import FullCalendar from '@fullcalendar/react'
import { TimeGridView } from '@fullcalendar/timegrid'
import { mount, shallow } from 'enzyme'
import moment from 'moment'
import React from 'react'
import { act } from 'react-dom/test-utils'

import { Calendar } from '../src'

describe('Calendar', () => {
  it('should render a full calendar component with the proper default props', () => {
    const wrapper = shallow(<Calendar />)

    const fullCalendar = wrapper.find(FullCalendar)
    expect(fullCalendar).toHaveLength(1)
    expect(fullCalendar.prop('defaultView')).toEqual('timeGridWeek')
    expect((fullCalendar.prop('header') as any).right).toEqual(
      'timeGridDay,timeGridWeek,dayGridMonth',
    )
    expect(fullCalendar.prop('selectable')).toBeTruthy()
  })

  it('should render a disabled calendar', () => {
    const wrapper = shallow(<Calendar disabled />)

    const fullCalendar = wrapper.find(FullCalendar)
    expect(fullCalendar.prop('selectable')).toBeFalsy()
  })

  it('should render the correct default view', () => {
    const wrapper = shallow(<Calendar view="day" />)

    const fullCalendar = wrapper.find(FullCalendar)
    expect(fullCalendar.prop('defaultView')).toEqual('timeGridDay')
  })

  it('should render the correct correct available views', () => {
    const wrapper = shallow(<Calendar views={['day']} />)

    const fullCalendar = wrapper.find(FullCalendar)
    expect((fullCalendar.prop('header') as any).right).toEqual('timeGridDay')
  })

  it('should pass events to full calendar', () => {
    const start = moment()
    const end = start.add(1, 'hours').toDate()
    const events = [
      {
        id: 'id123',
        start: start.toDate(),
        end,
        allDay: true,
        title: 'Title',
      },
    ]
    const wrapper = shallow(<Calendar events={events} />)

    const fullCalendar = wrapper.find(FullCalendar)
    expect(fullCalendar.prop('events')).toEqual(events)
  })

  it('should call the onDateClick callback when a date is selected', () => {
    const onDateClickSpy = jest.fn()
    const wrapper = mount(<Calendar onDateClick={onDateClickSpy} />)

    const fullCalendar = wrapper.find(FullCalendar)

    const date = new Date()
    const allDay = true

    act(() => {
      const onClick = fullCalendar.prop('dateClick') as any
      onClick({
        date,
        allDay,
        dateStr: new Date().toISOString(),
        resource: expect.anything(),
        dayEl: expect.any(HTMLElement),
        jsEvent: expect.any(MouseEvent),
        view: expect.any(TimeGridView),
      })
    })

    expect(onDateClickSpy).toHaveBeenCalledTimes(1)
    expect(onDateClickSpy).toHaveBeenCalledWith(date, allDay)
  })

  it('should call the onDateRangeSelected callback when a date range is selected', () => {
    const onDateRangeSelectedSpy = jest.fn()
    const wrapper = mount(<Calendar onDateRangeSelected={onDateRangeSelectedSpy} />)

    const fullCalendar = wrapper.find(FullCalendar)

    const start = new Date()
    const end = new Date()
    const allDay = true
    act(() => {
      const onSelect = fullCalendar.prop('select') as any
      onSelect({
        start,
        end,
        allDay,
        startStr: new Date().toISOString(),
        endStr: new Date().toISOString(),
        jsEvent: expect.any(MouseEvent),
        view: expect.any(TimeGridView),
      })
    })

    expect(onDateRangeSelectedSpy).toHaveBeenCalledTimes(1)
    expect(onDateRangeSelectedSpy).toHaveBeenCalledWith(start, end, allDay)
  })

  it('should call the onEventClick callback when an event is selected', () => {
    const onEventClickSpy = jest.fn()
    const wrapper = mount(<Calendar onEventClick={onEventClickSpy} />)

    const fullCalendar = wrapper.find(FullCalendar)

    const event = {
      start: new Date(),
      end: new Date(),
      allDay: true,
      title: 'Some Title',
      id: 'someid',
    }
    act(() => {
      const onClick = fullCalendar.prop('eventClick') as any
      onClick({
        event,
        el: expect.any(HTMLElement),
        jsEvent: expect.any(MouseEvent),
        view: expect.any(TimeGridView),
      })
    })

    expect(onEventClickSpy).toHaveBeenCalledTimes(1)
    expect(onEventClickSpy).toHaveBeenCalledWith(event)
  })

  it('should render the custom previous, next, and today buttons', () => {
    const wrapper = shallow(<Calendar />)
    const fullCalendar = wrapper.find(FullCalendar)
    const customButtons = fullCalendar.prop('customButtons') as any

    expect(customButtons.customPrev.text).toEqual('previous')
    expect(customButtons.customNext.text).toEqual('next')
    expect(customButtons.customToday.text).toEqual('today')
  })

  it('should call the onPrevClick callback when the custom previous button is clicked', () => {
    const onPrevClickSpy = jest.fn()
    const wrapper = mount(<Calendar onPrevClick={onPrevClickSpy} />)
    const fullCalendar = wrapper.find(FullCalendar)
    const customButtons = fullCalendar.prop('customButtons') as any
    const prevButton = customButtons.customPrev

    act(() => {
      const onClick = prevButton.click as any
      onClick({ el: expect.any(HTMLElement) })
    })

    expect(onPrevClickSpy).toHaveBeenCalledTimes(1)
  })

  it('should call the onNextClick callback when the custom next button is clicked', () => {
    const onNextClickSpy = jest.fn()
    const wrapper = mount(<Calendar onNextClick={onNextClickSpy} />)
    const fullCalendar = wrapper.find(FullCalendar)
    const customButtons = fullCalendar.prop('customButtons') as any
    const nextButton = customButtons.customNext

    act(() => {
      const onClick = nextButton.click as any
      onClick({ el: expect.any(HTMLElement) })
    })

    expect(onNextClickSpy).toHaveBeenCalledTimes(1)
  })

  it('should call the onTodayClick callback when the custom today button is clicked', () => {
    const onTodayClickSpy = jest.fn()
    const wrapper = mount(<Calendar onTodayClick={onTodayClickSpy} />)
    const fullCalendar = wrapper.find(FullCalendar)
    const customButtons = fullCalendar.prop('customButtons') as any
    const todayButton = customButtons.customToday

    act(() => {
      const onClick = todayButton.click as any
      onClick({ el: expect.any(HTMLElement) })
    })

    expect(onTodayClickSpy).toHaveBeenCalledTimes(1)
  })
})
