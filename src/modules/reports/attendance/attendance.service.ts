import { AttendanceReport, AttendanceType,} from "@prisma/client";

import { AppError } from "../../../exceptions/AppError";

import { uploadService } from "../../../storage/upload.service";

import { attendanceRepository } from "./attendance.repository";
import { CreateAttendanceDto } from "./attendance.type";

export class AttendanceService {

  /**
   * Create Attendance Report
   */
  async create(
    userId: number,
    dto: CreateAttendanceDto
  ): Promise<AttendanceReport> {

    /**
     * Cek duplicate client_report_id
     */
    const existing =
      await attendanceRepository.findByClientReportId(
        dto.client_report_id
      );

    /**
     * Idempotent API
     *
     * Jika client mengirim ulang request yang sama
     * karena koneksi buruk / offline sync,
     * maka cukup kembalikan data lama.
     */
    if (existing) {
      return existing;
    }

    /**
     * Upload Photo
     */
    const photoPath =
      await uploadService.saveAttendancePhoto(
        dto.photo.file_name,
        dto.photo.mime_type,
        dto.photo.base64
      );

    /**
     * Simpan Attendance
     */
    const attendanceType =
        dto.attendance_type === "check_in"
            ? AttendanceType.CHECK_IN
            : AttendanceType.CHECK_OUT;

    const attendance =
      await attendanceRepository.create({

        clientReportId: dto.client_report_id,

        attendanceType,

        latitude: dto.location.latitude,

        longitude: dto.location.longitude,

        accuracy: dto.location.accuracy,

        photoPath,

        reportedAt: new Date(dto.timestamp),

        user: {
          connect: {
            id: userId,
          },
        },

      });

    return attendance;
  }

}

export const attendanceService =
  new AttendanceService();