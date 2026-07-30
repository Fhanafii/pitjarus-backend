// import { AttendanceType } from "@prisma/client";

export interface AttendanceLocationDto {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface AttendancePhotoDto {
  file_name: string;
  mime_type: string;
  base64: string;
}

export type AttendanceTypeDto =
  | "check_in"
  | "check_out";

export interface CreateAttendanceDto {
  client_report_id: string;
  attendance_type: AttendanceTypeDto;
  timestamp: string;
  location: AttendanceLocationDto;
  photo: AttendancePhotoDto;
}