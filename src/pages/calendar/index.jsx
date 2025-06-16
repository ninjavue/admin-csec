import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Modal from '../../components/modal';

// Custom Select komponenti
const CustomSelect = ({ value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left border dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800 focus:outline-none"
      >
        <span className="text-gray-700 dark:text-gray-300">
          {selected || placeholder}
        </span>
        <i className={`ri-arrow-down-s-line absolute right-2 top-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                ${selected === option ? 'bg-gray-100 dark:bg-gray-700' : ''}
              `}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom DatePicker komponenti
const DatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const datePickerRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!startDate || (startDate && endDate)) {
      // Yangi tanlash boshlanishi
      setStartDate(selectedDate);
      setEndDate(null);
      onChange({ start: selectedDate.toISOString().split('T')[0], end: null });
    } else {
      // Ikkinchi sanani tanlash
      if (selectedDate < startDate) {
        setStartDate(selectedDate);
        setEndDate(startDate);
      } else {
        setEndDate(selectedDate);
      }
      onChange({
        start: startDate.toISOString().split('T')[0],
        end: selectedDate.toISOString().split('T')[0]
      });
      setIsOpen(false);
    }
  };

  const isDateInRange = (day) => {
    if (!startDate || !endDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date >= startDate && date <= endDate;
  };

  const isStartDate = (day) => {
    if (!startDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.getTime() === startDate.getTime();
  };

  const isEndDate = (day) => {
    if (!endDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.getTime() === endDate.getTime();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Previous month's days
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-center py-1 text-gray-400">
          {getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)) - firstDay + i + 1}
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isStartDate(day) || isEndDate(day);
      const isInRange = isDateInRange(day);
      const todayClass = isToday(day) ? 'border border-primary' : '';

      days.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`text-center py-1 cursor-pointer rounded-full
            ${isSelected ? 'bg-primary text-white' : ''}
            ${isInRange ? 'bg-primary/10' : ''}
            ${todayClass}
            hover:bg-gray-100 dark:hover:bg-gray-700
          `}
        >
          {day}
        </div>
      );
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} className="text-center py-1 text-gray-400">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="relative" ref={datePickerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800 cursor-pointer"
      >
        <span className="text-gray-700 dark:text-gray-300">
          {startDate ? (
            endDate ? 
              `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` :
              startDate.toLocaleDateString()
          ) : 'Select date range'}
        </span>
        <i className="ri-calendar-line text-gray-400"></i>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 overflow-hidden w-[300px]">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4 p-4 bg-primary text-white">
            <div className="flex items-center gap-2">
              <select
                value={currentMonth.getMonth()}
                onChange={(e) => setCurrentMonth(new Date(currentMonth.setMonth(e.target.value)))}
                className="bg-primary text-white border-0 outline-0 px-2 py-1 rounded"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              <select
                value={currentMonth.getFullYear()}
                onChange={(e) => setCurrentMonth(new Date(currentMonth.setFullYear(e.target.value)))}
                className="bg-primary text-white border-0 outline-0  px-2 py-1 rounded"
              >
                {Array.from({ length: 10 }, (_, i) => currentMonth.getFullYear() - 5 + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="p-1 rounded">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button onClick={nextMonth} className="p-1 rounded">
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 px-2 py-1">
            {weekDays.map(day => (
              <div key={day} className="text-center py-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 px-2">
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month'); // Year, Month, Week, Day, List
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDateRange, setEventDateRange] = useState({ start: '', end: '' });
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Meeting With Designer',
      startDate: '2025-03-04',
      endDate: '2025-03-04',
      time: '12:00 AM - 6:00 AM',
      location: 'Head Office, US',
      description: 'Tell how to boost website traffic',
      type: 'Primary',
      color: 'bg-blue-500'
    }
  ]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Oyning birinchi kunini olish
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Oydagi kunlar sonini olish
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Bugungi kunni tekshirish
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Kalendar kunlarini generatsiya qilish
  const generateCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const days = [];

    // Oldingi oyning kunlari uchun bo'sh kataklar
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square border dark:border-darkcontent rounded-lg p-2"></div>);
    }

    // Joriy oyning kunlari
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isCurrentDay = isToday(date);
      const dayEvents = getEventsForDate(date);

      days.push(
        <div 
          key={day}
          className={`
            aspect-square border dark:border-darkcontent p-2 
            cursor-pointer relative transition-colors duration-200
            ${isCurrentDay 
              ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20' 
              : 'hover:bg-gray-50 dark:hover:bg-darkcontent'
            }
          `}
        >
          <div className="flex justify-between items-start">
            <span className={`
              text-sm 
              ${isCurrentDay 
                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                : 'dark:text-gray-300'
              }
            `}>
              {day}
            </span>
            {isCurrentDay && (
              <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
            )}
          </div>

          {/* Events for this day */}
          <div className="absolute left-0 right-0 bottom-0 px-1">
            {dayEvents.map((event, idx) => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  openEventDetails(event);
                }}
                className={`
                  ${event.color} text-white text-xs p-1 mb-0.5 truncate
                  hover:opacity-90 transition-opacity cursor-pointer
                `}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  // Oldingi oyga o'tish
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  // Keyingi oyga o'tish
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  // Bugungi kunga o'tish
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Upcoming events ma'lumotlarini qo'shamiz
  const upcomingEvents = [
    {
      id: 1,
      startDate: '4 Mar 2025',
      endDate: '8 Mar 2025',
      title: 'Repeating Event',
      description: 'A recurring or repeating event is simply any event that you will...',
      type: 'Full day event',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      startDate: '9 Mar 2025',
      endDate: '10 Mar 2025',
      title: 'Weekly Strategy Planning',
      description: 'Strategies for Creating Your Weekly Schedule',
      type: 'Full day event',
      color: 'bg-red-500'
    },
    {
      id: 3,
      startDate: '22 Mar 2025',
      title: 'Product Review',
      time: '8:00 PM to 4:00 PM',
      color: 'bg-red-500'
    }
  ];

  const [eventsList, setEventsList] = useState([
    { id: 1, title: 'New Event Planning', color: 'bg-emerald-100 text-emerald-600' },
    { id: 2, title: 'Meeting', color: 'bg-blue-100 text-blue-600' },
    { id: 3, title: 'Generating Reports', color: 'bg-orange-100 text-orange-600' },
    { id: 4, title: 'Create New theme', color: 'bg-red-100 text-red-600' },
  ]);

  // Drag yakunlanganda chaqiriladigan funksiya
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(eventsList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEventsList(items);
  };

  // Event qo'shish funksiyasi
  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: eventName,
      startDate: eventDateRange.start,
      endDate: eventDateRange.end || eventDateRange.start,
      location: eventLocation,
      description: eventDescription,
      type: eventType,
      color: getEventColor(eventType)
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
    
    setIsModalOpen(false);
    setEventType('');
    setEventName('');
    setEventDateRange({ start: '', end: '' });
    setEventLocation('');
    setEventDescription('');
  };

  // Event turi bo'yicha rang berish
  const getEventColor = (type) => {
    const colors = {
      'Primary': 'bg-blue-500',
      'Secondary': 'bg-gray-500',
      'Success': 'bg-green-500',
      'Danger': 'bg-red-500',
      'Warning': 'bg-yellow-500',
      'Info': 'bg-indigo-500'
    };
    return colors[type] || 'bg-blue-500';
  };

  // Kunning eventlarini olish
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return date >= eventStart && date <= eventEnd;
    });
  };

  // Event modalini ochish
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  // Event o'chirish
  const handleDeleteEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    setIsEventDetailsOpen(false);
  };

  // Event Details Modal
  const EventDetailsModal = () => {
    if (!selectedEvent) return null;

    return (
      <Modal isOpen={isEventDetailsOpen} onClose={() => setIsEventDetailsOpen(false)}>
        <div className="modal">
          <div className="modal-head bg-sitemap p-5 flex justify-between items-center dark:bg-gray-800">
            <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300">{selectedEvent.title}</h1>
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-700" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                <i className="ri-delete-bin-line text-xl"></i>
              </button>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsEventDetailsOpen(false)}>
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          </div>
          <div className="modal-body p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <i className="ri-calendar-line text-gray-400"></i>
                <span className="text-gray-600 dark:text-gray-300">
                  {new Date(selectedEvent.startDate).toLocaleDateString()}
                  {selectedEvent.endDate !== selectedEvent.startDate && 
                    ` - ${new Date(selectedEvent.endDate).toLocaleDateString()}`
                  }
                </span>
              </div>
              {selectedEvent.time && (
                <div className="flex items-center gap-2">
                  <i className="ri-time-line text-gray-400"></i>
                  <span className="text-gray-600 dark:text-gray-300">{selectedEvent.time}</span>
                </div>
              )}
              {selectedEvent.location && (
                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-line text-gray-400"></i>
                  <span className="text-gray-600 dark:text-gray-300">{selectedEvent.location}</span>
                </div>
              )}
              {selectedEvent.description && (
                <div className="mt-4 flex  gap-2 text-gray-600 dark:text-gray-300">
                  <i class="ri-message-2-line"></i>
                  <p >{selectedEvent.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  // Upcoming Events komponentini yangilaymiz
  const UpcomingEvents = () => {
    const sortedEvents = [...events].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    return (
      <div className="mt-8">
        <h3 className="font-semibold mb-2 dark:text-white">All Events</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">List of all events</p>
        
        <div className="mt-4 space-y-4 h-[400px] overflow-y-scroll calendar-box">
          {sortedEvents.map(event => (
            <div 
              key={event.id}
              onClick={() => openEventDetails(event)}
              className="bg-white dark:bg-cheader rounded-lg p-4 border dark:border-darkcontent cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 ${event.color} rounded-full mt-2`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(event.startDate).toLocaleDateString()}
                      {event.endDate !== event.startDate && 
                        ` to ${new Date(event.endDate).toLocaleDateString()}`
                      }
                    </span>
                    {event.type && (
                      <span className="text-xs bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                        {event.type}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-medium mb-1 dark:text-white">
                    {event.title}
                  </h4>
                  {event.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {event.description}
                    </p>
                  )}
                  {event.time && (
                    <span className="text-xs bg-gray-100 dark:bg-darkcontent text-gray-600 dark:text-gray-300 px-2 py-1 rounded mt-2 inline-block">
                      {event.time}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex bg-gray-50 dark:bg-darkcontent">
      {/* Event Details Modal */}
      <EventDetailsModal />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal">
          <div className="modal-head bg-sitemap p-5 flex justify-between dark:bg-gray-800">
            <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300">Add Event</h1>
            <button className="w-7 h-7" onClick={() => setIsModalOpen(false)}>
              <i className="ri-close-large-line text-xl text-gray-500 dark:text-gray-200"></i>
            </button>
          </div>
          <div className="modal-body p-5">
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Type</label>
              <CustomSelect
                value={eventType}
                options={['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info']}
                onChange={setEventType}
                placeholder="Select type"
              />
            </div>
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Event Name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter event name"
                className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
              />
            </div>
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Event Date Range</label>
              <DatePicker
                value={eventDateRange}
                onChange={setEventDateRange}
              />
            </div>
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Location</label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="Enter location"
                className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
              />
            </div>
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Description</label>
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Enter a description"
                className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0 resize-none h-24"
              />
            </div>
          </div>
          <div className="modal-foot flex justify-end gap-3 p-5">
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-400 rounded-md dark:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>
        </div>
      </Modal>

      {/* Left Sidebar */}
      <div className="w-72 bg-white dark:bg-cheader p-6 border-r dark:border-darkcontent">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-6"
        >
          + Create New Event
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Drag and drop your event or click in the calendar
        </p>

        {/* Event Types with Drag-Drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="events">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {eventsList.map((event, index) => (
                  <Draggable 
                    key={event.id.toString()} 
                    draggableId={event.id.toString()} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'none',
                        }}
                        className={`
                          ${event.color} 
                          dark:bg-opacity-20 
                          p-3 
                          rounded-md 
                          cursor-move 
                          transition-all 
                          duration-200
                          ${snapshot.isDragging ? 'shadow-lg scale-105 z-50' : ''}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <i className="ri-drag-move-fill text-gray-400"></i>
                          <span>{event.title}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Upcoming Events */}
        <UpcomingEvents />
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="flex rounded-md overflow-hidden">
              <button 
                onClick={prevMonth}
                className="py-1 px-2 text-2xl hover:bg-blue-200 dark:bg-blue-500/10 text-blue-600 bg-blue-100 border-r-2 border-blue-300"
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button 
                onClick={nextMonth}
                className="py-1 px-2 hover:bg-blue-200 dark:bg-blue-500/10 text-blue-600  bg-blue-100 text-2xl"
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
            <button 
              onClick={goToToday}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md"
            >
              Today
            </button>
            <h2 className="text-xl font-semibold dark:text-white">
              {currentDate.getFullYear()}
            </h2>
          </div>

          <div className="flex rounded-md overflow-hidden">
            {['Year', 'Month', 'Week', 'Day', 'List'].map((viewType) => (
              <button 
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-4 py-2 transition-colors duration-200  font-medium ${
                  view === viewType 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-blue-600 text-blue-700 hover:text-white dark:hover:bg-darkcontent bg-blue-100 dark:bg-blue-500/10'
                }`}
              >
                {viewType}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white dark:bg-cheader rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-white">
              {months[currentDate.getMonth()]}
            </h3>
            
            {/* Week days header */}
            <div className="grid grid-cols-7 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center font-medium text-gray-600 dark:text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {/* Empty cells */}
              {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="aspect-square border dark:border-darkcontent p-2"
                />
              ))}
              
              {/* Days */}
              {Array.from({ length: getDaysInMonth(currentDate) }).map((_, index) => {
                const day = index + 1;
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const isCurrentDay = isToday(date);
                const dayEvents = getEventsForDate(date);

                return (
                  <div 
                    key={day}
                    className={`
                      aspect-square border dark:border-darkcontent p-2 
                      cursor-pointer relative transition-colors duration-200
                      ${isCurrentDay 
                        ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20' 
                        : 'hover:bg-gray-50 dark:hover:bg-darkcontent'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`
                        text-sm 
                        ${isCurrentDay 
                          ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                          : 'dark:text-gray-300'
                        }
                      `}>
                        {day}
                      </span>
                      {isCurrentDay && (
                        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      )}
                    </div>

                    {/* Events for this day */}
                    <div className="absolute left-0 right-0 bottom-0 px-1">
                      {dayEvents.map((event, idx) => (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEventDetails(event);
                          }}
                          className={`
                            ${event.color} text-white text-xs p-1 mb-0.5 truncate
                            hover:opacity-90 transition-opacity cursor-pointer
                          `}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;