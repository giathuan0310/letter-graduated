// Calendar event generator for Google Calendar and Apple / Outlook (.ics)

export const createGoogleCalendarUrl = (event, graduate, location) => {
  const startTime = "20261024T003000Z"; // 07:30 VN time is 00:30 UTC
  const endTime = "20261024T050000Z";   // 12:00 VN time is 05:00 UTC
  const title = encodeURIComponent(`Lễ Tốt Nghiệp - ${graduate.fullName}`);
  const details = encodeURIComponent(
    `Thư mời tham dự Lễ tốt nghiệp của ${graduate.title} ${graduate.fullName} - Ngành ${graduate.major}.\n\nĐịa điểm: ${location.venueName}, ${location.address}.\n\nLiên hệ: ${graduate.phone}`
  );
  const loc = encodeURIComponent(`${location.venueName}, ${location.address}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${loc}`;
};

export const downloadIcsFile = (event, graduate, location) => {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Graduation Invitation//VN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Lễ Tốt Nghiệp - ${graduate.fullName}
DESCRIPTION:Thư mời tham dự Lễ tốt nghiệp của ${graduate.title} ${graduate.fullName} - ${graduate.major}\\nĐịa điểm: ${location.venueName}\\nSĐT: ${graduate.phone}
LOCATION:${location.venueName}, ${location.address}
DTSTART:20261024T003000Z
DTEND:20261024T050000Z
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT2H
ACTION:DISPLAY
DESCRIPTION:Nhắc nhở: Lễ Tốt Nghiệp ${graduate.fullName} sẽ diễn ra sau 2 giờ!
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Le-Tot-Nghiep-${graduate.fullName.replace(/\s+/g, '-')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
