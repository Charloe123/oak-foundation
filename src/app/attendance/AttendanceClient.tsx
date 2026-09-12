'use client';

import AttendanceScreen from '@/components/attendance/AttendanceScreen';

export default function AttendanceClient({ expectedCount, checkedInCount }: { expectedCount: number; checkedInCount: number }) {
  return (
    <AttendanceScreen
      expectedCount={expectedCount}
      checkedInCount={checkedInCount}
    />
  );
}
