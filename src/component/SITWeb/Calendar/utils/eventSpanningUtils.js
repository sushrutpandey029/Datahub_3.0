// utils/eventSpanningUtils.js

// Find all multi-day meeting spans in the current view
export const getMultiDaySpans = (meetings, startDate, endDate) => {
  const allMeetings = [...meetings].sort((a, b) => new Date(a.start) - new Date(b.start));
  const spans = [];
  
  // Group by activity type and state first
  const meetingGroups = {};
  allMeetings.forEach(meeting => {
    const key = `${meeting.title}-${meeting.extendedProps.state}`;
    if (!meetingGroups[key]) {
      meetingGroups[key] = [];
    }
    meetingGroups[key].push(meeting);
  });
  
  // Create spans for each group
  Object.values(meetingGroups).forEach(group => {
    if (group.length > 1) {
      const sortedGroup = group.sort((a, b) => new Date(a.start) - new Date(b.start));
      let currentSpan = [sortedGroup[0]];
      
      for (let i = 1; i < sortedGroup.length; i++) {
        const current = sortedGroup[i];
        const previous = currentSpan[currentSpan.length - 1];
        
        const currentDate = new Date(current.start);
        const previousDate = new Date(previous.start);
        const nextDay = new Date(previousDate);
        nextDay.setDate(previousDate.getDate() + 1);
        
        // Check if consecutive and within view bounds
        const isConsecutive = currentDate.toDateString() === nextDay.toDateString();
        const isInView = isDateInRange(currentDate, startDate, endDate);
        
        if (isConsecutive && isInView) {
          currentSpan.push(current);
        } else {
          if (currentSpan.length > 1) {
            spans.push([...currentSpan]);
          }
          currentSpan = [current];
        }
      }
      
      if (currentSpan.length > 1) {
        spans.push([...currentSpan]);
      }
    }
  });
  
  return spans;
};

// Check if date is within range
const isDateInRange = (date, startDate, endDate) => {
  const checkDate = new Date(date);
  return checkDate >= startDate && checkDate <= endDate;
};

// Check if a date is part of a multi-day span
export const getSpanForDate = (date, spans) => {
  const checkDate = new Date(date);
  for (const span of spans) {
    const spanDates = span.map(meeting => new Date(meeting.start).toDateString());
    if (spanDates.includes(checkDate.toDateString())) {
      return span;
    }
  }
  return null;
};

// Get span position info for a specific date
export const getSpanPosition = (date, span) => {
  const spanDates = span.map(meeting => new Date(meeting.start));
  const sortedDates = spanDates.sort((a, b) => a - b);
  const currentDate = new Date(date);
  
  const isStart = currentDate.toDateString() === sortedDates[0].toDateString();
  const isEnd = currentDate.toDateString() === sortedDates[sortedDates.length - 1].toDateString();
  const spanLength = sortedDates.length;
  const spanIndex = sortedDates.findIndex(d => d.toDateString() === currentDate.toDateString());
  
  return { isStart, isEnd, spanLength, spanIndex };
};

// Get events that should be displayed (both single events and span starts)
export const getDisplayEventsForDate = (date, dayEvents, spans) => {
  const spanForDate = getSpanForDate(date, spans);
  
  if (!spanForDate) {
    return dayEvents; // Return all events if no span
  }
  
  const spanPosition = getSpanPosition(date, spanForDate);
  
  // If this is the start of a span, show the span event + other single events
  if (spanPosition.isStart) {
    // Filter out events that are part of this span (we'll show them as one span event)
    const otherEvents = dayEvents.filter(event => 
      !spanForDate.some(spanEvent => spanEvent.id === event.id)
    );
    
    // Create a synthetic event for the span
    const spanEvent = {
      ...spanForDate[0],
      isSpan: true,
      spanLength: spanPosition.spanLength,
      originalEvents: spanForDate
    };
    
    return [spanEvent, ...otherEvents];
  }
  
  // If this is middle/end of span, only show non-span events
  return dayEvents.filter(event => 
    !spanForDate.some(spanEvent => spanEvent.id === event.id)
  );
};